import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initialStudents, Student } from "../constants/students";
import { StudentsAction, StudentsState, studentsReducer } from "./students-reducer";

const STORAGE_KEY = "@student_directory_students";

type StudentsContextValue = {
  students: Student[];
  addStudent: (student: Student) => void;
  removeStudent: (id: string) => void;
  resetStudents: () => void;
  isLoading: boolean;
};

const StudentsContext = createContext<StudentsContextValue | undefined>(undefined);

export function StudentsProvider({ children }: PropsWithChildren) {
  const [students, dispatch] = useReducer<React.Reducer<StudentsState, StudentsAction>>(
    studentsReducer,
    initialStudents
  );
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load saved students once when the app starts.
  useEffect(() => {
    let mounted = true;

    const loadStudents = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);

        if (saved) {
          const parsed: unknown = JSON.parse(saved);

          if (Array.isArray(parsed)) {
            dispatch({ type: "LOAD", payload: parsed as Student[] });
          }
        }
      } catch (error) {
        console.error("Failed to load students from AsyncStorage:", error);
      } finally {
        if (mounted) {
          setHasLoaded(true);
          setIsLoading(false);
        }
      }
    };

    loadStudents();

    return () => {
      mounted = false;
    };
  }, []);

  // Save the current list whenever it changes, but only after the initial load.
  useEffect(() => {
    if (!hasLoaded) return;

    const saveStudents = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(students));
      } catch (error) {
        console.error("Failed to save students to AsyncStorage:", error);
      }
    };

    saveStudents();
  }, [students, hasLoaded]);

  const addStudent = useCallback((student: Student) => {
    dispatch({ type: "ADD_STUDENT", payload: student });
  }, []);

  const removeStudent = useCallback((id: string) => {
    dispatch({ type: "REMOVE_STUDENT", payload: id });
  }, []);

  const resetStudents = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const value = useMemo(
    () => ({
      students,
      addStudent,
      removeStudent,
      resetStudents,
      isLoading,
    }),
    [students, addStudent, removeStudent, resetStudents, isLoading]
  );

  return <StudentsContext.Provider value={value}>{children}</StudentsContext.Provider>;
}

export function useStudents() {
  const context = useContext(StudentsContext);

  if (!context) {
    throw new Error("useStudents must be used inside StudentsProvider");
  }

  return context;
}

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

const STORAGE_KEY = "@student_directory";

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

  // LOAD: read the saved student list once when the app starts.
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) {
          const saved = JSON.parse(raw) as StudentsState;
          dispatch({ type: "LOAD", payload: saved });
        }
      })
      .catch((error) => console.error("AsyncStorage load error:", error))
      .finally(() => setIsLoading(false));
  }, []);

  // SAVE: write the student list whenever it changes.
  useEffect(() => {
    if (isLoading) return;

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(students)).catch((error) =>
      console.error("AsyncStorage save error:", error)
    );
  }, [students]);

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

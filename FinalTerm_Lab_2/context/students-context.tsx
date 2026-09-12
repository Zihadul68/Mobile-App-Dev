import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { api } from "../services/api";
import { Student } from "../constants/students";
import { StudentsAction, StudentsState, studentsReducer } from "./students-reducer";

type StudentsContextValue = {
  students: StudentsState;
  dispatch: React.Dispatch<StudentsAction>;
  isLoading: boolean;
  error: string | null;
  reloadStudents: () => void;
};

const StudentsContext = createContext<StudentsContextValue | undefined>(undefined);

export function StudentsProvider({ children }: PropsWithChildren) {
  const [students, dispatch] = useReducer<React.Reducer<StudentsState, StudentsAction>>(
    studentsReducer,
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const reloadStudents = useCallback(() => {
    setError(null);
    setIsLoading(true);
    setReloadKey((key) => key + 1);
  }, []);

  // Week 8: the server replaces Week 7 AsyncStorage as the single source of truth.
  useEffect(() => {
    let cancelled = false;

    api
      .get<StudentsState>("/students")
      .then(({ data }) => {
        if (!cancelled) dispatch({ type: "LOAD", payload: data });
      })
      .catch((requestError) => {
        if (!cancelled) {
          setError("Could not load students. Is the REST server running?");
          console.error("Students API load error:", requestError);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const value = useMemo(
    () => ({ students, dispatch, isLoading, error, reloadStudents }),
    [students, isLoading, error, reloadStudents]
  );

  return <StudentsContext.Provider value={value}>{children}</StudentsContext.Provider>;
}

export function useStudents(): StudentsContextValue {
  const context = useContext(StudentsContext);
  if (!context) {
    throw new Error("useStudents must be used inside StudentsProvider");
  }
  return context;
}

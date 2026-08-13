import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { initialStudents, Student } from "../constants/students";

type State = {
  students: Student[];
};

type Action =
  | { type: "ADD_STUDENT"; payload: Student }
  | { type: "REMOVE_STUDENT"; payload: string }
  | { type: "RESET" };

const initialState: State = {
  students: initialStudents,
};

function studentsReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_STUDENT":
      return { ...state, students: [...state.students, action.payload] };
    case "REMOVE_STUDENT":
      return {
        ...state,
        students: state.students.filter((student) => student.id !== action.payload),
      };
    case "RESET":
      return { students: initialStudents };
    default:
      return state;
  }
}

type StudentsContextValue = {
  students: Student[];
  addStudent: (student: Student) => void;
  removeStudent: (id: string) => void;
  resetStudents: () => void;
};

const StudentsContext = createContext<StudentsContextValue | undefined>(undefined);

export function StudentsProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(studentsReducer, initialState);

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
      students: state.students,
      addStudent,
      removeStudent,
      resetStudents,
    }),
    [state.students, addStudent, removeStudent, resetStudents]
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
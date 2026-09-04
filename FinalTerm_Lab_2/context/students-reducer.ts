import { Student } from "../constants/students";
import { initialStudents } from "../constants/students";

// State is the complete list of students.
export type StudentsState = Student[];

// Every possible reducer action.
export type StudentsAction =
  | { type: "ADD_STUDENT"; payload: Student }
  | { type: "REMOVE_STUDENT"; payload: string }
  | { type: "RESET" }
  | { type: "LOAD"; payload: Student[] };

export function studentsReducer(
  state: StudentsState,
  action: StudentsAction
): StudentsState {
  switch (action.type) {
    case "ADD_STUDENT":
      return [action.payload, ...state];

    case "REMOVE_STUDENT":
      return state.filter((student) => student.id !== action.payload);

    case "RESET":
      return initialStudents;

    case "LOAD":
      // Replace the complete list with the data loaded from AsyncStorage.
      return action.payload;

    default:
      return state;
  }
}

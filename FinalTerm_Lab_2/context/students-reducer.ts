import { Student } from "../constants/students";

export type StudentsState = Student[];

export type StudentsAction =
  | { type: "ADD_STUDENT"; payload: Student }
  | { type: "REMOVE_STUDENT"; payload: string }
  | { type: "RESET"; payload?: Student[] }
  | { type: "LOAD"; payload: Student[] }
  | { type: "UPDATE_STUDENT"; payload: Student };

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
      return action.payload ?? state;

    case "LOAD":
      // Week 7: LOAD replaces the full list. In the Week 8 live app this
      // action hydrates the list from the API, which supersedes AsyncStorage.
      return action.payload;

    case "UPDATE_STUDENT":
      return state.map((student) =>
        student.id === action.payload.id ? action.payload : student
      );

    default:
      return state;
  }
}

import {
  SET_CONFIRM_PASSWORD,
  SET_DATE_OF_BIRTH,
  SET_EMAIL,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_PASSWORD,
  SET_PHONE_NUMBER,
  SET_USERNAME,
} from "../constants/signUpActionTypes";
import { ISignUpState } from "../interface/signUpState";

export const signUpReducer = (
  state: ISignUpState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_DATE_OF_BIRTH:
      return { ...state, dateOfBirth: action.payload };
    case SET_FIRST_NAME:
      return { ...state, firstName: action.payload };
    case SET_LAST_NAME:
      return { ...state, lastName: action.payload };
    case SET_USERNAME:
      return { ...state, username: action.payload };
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_PHONE_NUMBER:
      return { ...state, phoneNumber: action.payload };
    case SET_PASSWORD:
      return { ...state, password: action.payload };
    case SET_CONFIRM_PASSWORD:
      return { ...state, confirmPassword: action.payload };
    default:
      return state;
  }
};

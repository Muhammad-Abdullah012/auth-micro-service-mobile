import { SIGN_IN, SIGN_OUT } from "../constants/authActionTypes";
import { IAction } from "../interface";

export const SignInAction = (): IAction => {
  return {
    type: SIGN_IN,
    payload: null,
  };
};

export const SignOutAction = (): IAction => {
  return {
    type: SIGN_OUT,
    payload: null,
  };
};

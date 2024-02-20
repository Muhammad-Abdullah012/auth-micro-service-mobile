import { Dispatch, createContext } from "react";
import { IAuthState } from "../interface/authState";
import { IAction } from "../interface";

export const AuthContext = createContext<{
  state: IAuthState;
  dispatch: Dispatch<IAction>;
}>({
  state: {
    isLoading: false,
    isSignout: true,
    userToken: null,
  },
  dispatch: () => {},
});

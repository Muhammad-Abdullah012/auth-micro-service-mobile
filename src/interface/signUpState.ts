export interface ISignUpState {
  dateOfBirth: Date;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export const initialState: ISignUpState = {
  dateOfBirth: new Date(),
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

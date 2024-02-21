import {
  SET_DATE_OF_BIRTH,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_USERNAME,
  SET_EMAIL,
  SET_PHONE_NUMBER,
  SET_PASSWORD,
  SET_CONFIRM_PASSWORD,
} from "../constants/signUpActionTypes";

export const setDateOfBirthAction = (date: Date) => ({
  type: SET_DATE_OF_BIRTH,
  payload: date,
});

export const setFirstNameAction = (name: string) => ({
  type: SET_FIRST_NAME,
  payload: name,
});

export const setLastNameAction = (name: string) => ({
  type: SET_LAST_NAME,
  payload: name,
});

export const setUsernameAction = (username: string) => ({
  type: SET_USERNAME,
  payload: username,
});

export const setEmailAction = (email: string) => ({
  type: SET_EMAIL,
  payload: email,
});

export const setPhoneNumberAction = (phoneNumber: string) => ({
  type: SET_PHONE_NUMBER,
  payload: phoneNumber,
});

export const setPasswordAction = (password: string) => ({
  type: SET_PASSWORD,
  payload: password,
});

export const setConfirmPasswordAction = (confirmPassword: string) => ({
  type: SET_CONFIRM_PASSWORD,
  payload: confirmPassword,
});

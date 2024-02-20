import Axios from "axios";
import { BASE_URL } from "../../env";
import { ILoginRequest } from "../interface/requests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REFRESH_TOKEN } from "../constants/asyncStorageKeys";

const axios = Axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.error("Error from backend => ", error);
    if (error.response) {
      console.error("Error status code => ", error.response.status);
      console.error("Error message => ", error.response.data?.message);
    }
    return Promise.reject(error);
  }
);

export const LoginRequest = async (body: ILoginRequest) => {
  return axios.post("/login", body);
};

export const RefreshTokenRequest = async () => {
  const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN);
  if (!refreshToken) {
    throw "No refresh token found!";
  }
  return axios.post("/token/refresh", { refreshToken });
};

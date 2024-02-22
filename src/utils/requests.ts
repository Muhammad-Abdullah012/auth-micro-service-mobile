import Axios from "axios";
import Toast from "react-native-root-toast";
import { BASE_URL } from "../../env";
import { ILoginRequest } from "../interface/requests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BEARER_TOKEN, REFRESH_TOKEN } from "../constants/asyncStorageKeys";

const axios = Axios.create({
  baseURL: BASE_URL,
  // timeout: 1000,
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
      Toast.show(error.response.data?.message ?? "Something went wrong!", {
        duration: Toast.durations.LONG,
      });
    } else {
      Toast.show("Something went wrong!", {
        duration: Toast.durations.LONG,
      });
    }
    if (error.request) {
      console.error("error.request => ", error.request);
    }
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(async (config) => {
  try {
    const bearerToken = await AsyncStorage.getItem(BEARER_TOKEN);
    if (bearerToken) config.headers.Authorization = `Bearer ${bearerToken}`;
  } catch (err) {
    console.error("Error occured while requesting => ", err);
  }
  return config;
});

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

export const GetMyProfileRequest = async () => {
  return axios.get("/users/profile");
};

export const UpdateProfileRequest = async ({
  body,
}: {
  body: { [key: string]: any };
}) => {
  return axios.post("/users/update-profile", body);
};

export const UploadFiles = async (data: { [key: string]: any }) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  console.log("formData => ", formData);
  return axios.postForm("/files/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const ChatRequest = async (data: { [key: string]: string }) => {
  return axios.post("/chat", data);
};

export const SignUpRequest = async (data: { [key: string]: any }) => {
  return axios.post("/signup", data);
};

export const CheckUsernameRequest = async ({
  username,
}: {
  username: string;
}) => {
  return axios.post("/check-username", { username });
};

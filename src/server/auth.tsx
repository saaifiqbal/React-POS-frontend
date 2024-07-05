/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export const onLogin = async (
  data: { email: string; password: string },
  onSuccess: () => void,
  onError: () => void
) => {
  let response: any = [];
  await api
    .post("auth/login", data)
    .then((res) => {
      onSuccess();
      response = res.data;
    })
    .catch((err) => {
      console.log("Login Error", err);
      onError();
    });
  return response;
};
export const onLogout = async (onSuccess: () => void, onError: () => void) => {
  api
    .post("auth/logout")
    .then((res) => {
      onSuccess();
      return res.data;
    })
    .catch((err) => {
      console.log("Logout Error", err);
      onError();
    });
};
export const currentUser = async () => {
  let response: any = [];
  await api
    .post("auth/users")
    .then((res) => {
      response = res;
    })
    .catch((err: Error) => {
      localStorage.removeItem("token");
      console.log("user failed", err);
    });
  console.log("Response Current user", response);
  return response;
};

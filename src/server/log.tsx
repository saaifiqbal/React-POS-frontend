import api from "./api";

export const onLogin = async (
  data: { email: string; password: string },
  onSuccess: () => void,
  onError: () => void
) => {
  console.log("get Data", data);
  await api
    .post("auth/login", data)
    .then((response: Error) => {
      console.log("Login Response", response);
      const token = response.data.access_token;
      if (token) {
        localStorage.setItem("token", token);
      }
      onSuccess();
    })
    .catch((err: Error) => {
      console.log("Login Error", err);
      onError();
    });
};

export const onLogout = async (onSuccess: () => void, onError: () => void) => {
  await api
    .post("auth/logout")
    .then((res: Error) => {
      console.log("Logout response", res);
      localStorage.removeItem("token");
      onSuccess();
    })
    .catch((err: Error) => {
      console.log("Logout failed", err);
      onError();
    });
};

export const getUser = async (
  onSuccess: (data: object) => void,
  onError: () => void
) => {
  await api
    .post("auth/users")
    .then((res: { data: object }) => {
      onSuccess(res.data);
    })
    .catch((err: Error) => {
      localStorage.removeItem("token");
      console.log("user failed", err);
      onError();
    });
};

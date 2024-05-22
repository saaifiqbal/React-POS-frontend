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
export const onLogout = (onSuccess: () => void, onError: () => void) => {
  api
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

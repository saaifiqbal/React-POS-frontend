export const useGetToken = () => {
  return localStorage.getItem("token") !== null ;
};

export const useSetToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const useRemoveToken = () => {
  localStorage.removeItem("token");
};

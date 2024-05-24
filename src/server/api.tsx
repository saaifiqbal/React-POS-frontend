import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});
api.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      config.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "token"
      )}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      console.error("403 Forbidden Error: ", error.response);
      // alert("You do not have permission to perform this action.");
      // Optionally, you can log out the user or redirect them to a login page
      // localStorage.removeItem('token');
      // window.location.href = '/login';
    }
    if (error.response && error.response.status === 401) {
      console.error("403 Forbidden Error: ", error.response);
      alert("You do not have permission to perform this action.");
      // Optionally, you can log out the user or redirect them to a login page
      // localStorage.removeItem('token');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

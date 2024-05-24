import { Login } from "../../views/guest";
import { Customers, Dashboard } from "../../views/private";
import { useGetToken } from "../../hooks/useLocal";
import { useCallback, useEffect } from "react";
import BaseLayout from "../../components/Layouts/BaseLayout";
import { useNavigate, useRoutes } from "react-router-dom";
import { getUser } from "../../server/log";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../store/Slices/authSlice";

const routes = [
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      { path: "/customer", element: <Customers /> },
      { path: "/dashboard", element: <Dashboard /> },
    ],
  },
  { path: "/login", element: <Login /> },
];

interface AuthState {
  authenticate: {
    user: object;
  };
}
function AppRoute() {
  const user: object | boolean = useSelector(
    (state: AuthState) => state.authenticate.user
  );
  const hasToken = useGetToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setUser = useCallback(
    (data: object) => {
      dispatch(userAction(data));
    },
    [dispatch]
  );
  const getUsers = useCallback(
    async () =>
      await getUser(
        (data: object) => {
          setUser(data);
        },
        () => {}
      ),
    [setUser]
  );

  useEffect(() => {
    if (!hasToken) {
      navigate("/login");
    }

    getUsers();
  }, [hasToken, getUsers, navigate]);
  const route = useRoutes(routes);
  return route;
}

export default AppRoute;

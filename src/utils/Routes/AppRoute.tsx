// AppRoute.tsx
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { Fragment, useCallback, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { Login } from "../../views/guest";
import { Customers, Dashboard } from "../../views/private";
import BaseLayout from "../../components/Layouts/BaseLayout";
import { getUser } from "../../store/thunks/auth";
import { useGetToken } from "../../hooks/useLocal";
import { SnackbarProvider } from "../../hooks/SnackBarProvider";

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

const AppRoute: React.FC = () => {
  const hasToken = useGetToken();
  const user = useSelector((state: RootState) => state.authenticate?.authData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkAuth = useCallback(() => {
    console.log("has Token", !hasToken);
    if (!hasToken) {
      navigate("/login");
    } else if (!user || (Array.isArray(user) && user.length === 0)) {
      dispatch(
        getUser({
          onSuccess: () => {
            console.log("Success login ");
          },
          onError: () => {
            console.log("Failed login");
            // Handle error scenario, e.g., redirect to login page or show error message
          },
        })
      );
    }
  }, [hasToken, navigate, dispatch]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Fragment>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element}>
            {route.children &&
              route.children.map((child, index) => (
                <Route key={index} path={child.path} element={child.element} />
              ))}
          </Route>
        ))}
      </Routes>
    </Fragment>
  );
};

export default AppRoute;

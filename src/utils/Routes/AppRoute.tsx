import { Login } from "../../views/guest";
import { Customers, Dashboard } from "../../views/private";
import { useGetToken } from "../../hooks/useLocal";
import { useEffect } from "react";
import BaseLayout from "../../components/Layouts/BaseLayout";
import { useNavigate, useRoutes } from "react-router-dom";

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
function AppRoute() {
  const hasToken = useGetToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasToken) {
      navigate("/login");
    }
  }, [hasToken, navigate]);
  const route = useRoutes(routes);
  return route;
}

export default AppRoute;

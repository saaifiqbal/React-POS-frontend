import { yupResolver } from "@hookform/resolvers/yup";
import { CardContent, Button, Card, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";
import { loginSchema } from "../../../utils/validation";
import { onLogin } from "../../../server/log";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetToken } from "../../../hooks/useLocal";

function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const hasToken = useGetToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (hasToken) {
      navigate("/dashboard");
    }
  }, [hasToken, navigate]);

  const onSubmit = async (data: { email: string; password: string }) => {
    console.log("input data", data);
    await onLogin(
      data,
      () => navigate("/dashboard"),
      () => {}
    );
    console.log("has Token ", hasToken);
  };

  return (
    <Fragment>
      <div className="flex justify-center items-center h-screen">
        <Card sx={{ minWidth: 450, justifyContent: "center" }}>
          <CardContent>
            <form
              className="flex flex-col items-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1 className="text-2xl mb-5 font-bold text-center">Login</h1>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={{ my: 1 }}
                    fullWidth
                    type="email"
                    label="Email"
                    variant="filled"
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                    {...field}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={{ my: 1 }}
                    fullWidth
                    type="password"
                    label="Password"
                    variant="filled"
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ""}
                    {...field}
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3 }}
                color="primary"
                disabled={isSubmitting}
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Fragment>
  );
}

export default Login;

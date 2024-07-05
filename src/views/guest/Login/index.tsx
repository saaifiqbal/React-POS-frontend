// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { yupResolver } from "@hookform/resolvers/yup";
import { CardContent, Button, Card, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";
import { loginSchema } from "../../../utils/validation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetToken } from "../../../hooks/useLocal";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../../../store/thunks/auth";
import { useSnackbar } from "../../../hooks/SnackBarProvider";

function Login() {
  const { showSuccess } = useSnackbar();
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
  const dispatch = useDispatch();

  useEffect(() => {
    if (hasToken) {
      navigate("/dashboard");
    }
  }, [hasToken, navigate]);

  const onSubmit = (data: { email: string; password: string }) => {
    console.log("input data", data)
    dispatch(
      fetchLogin({
        data,
        onSuccess: () => {
          console.log("Login Successfully");
          showSuccess("Login Successfully")
        },
        onError: () => {},
      })
    );
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

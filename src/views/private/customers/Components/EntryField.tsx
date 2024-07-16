/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import Typography from "@mui/joy/Typography";
import ModalClose from "@mui/joy/ModalClose";
import { Grid, TextField } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { customerSchema } from "../../../../utils/validation/customer";
import { ModalDialog } from "@mui/joy";
import { useDispatch } from "react-redux";
import { fetchCreateUpdateCustomer } from "../../../../store/thunks/customer";
import { useSnackbar } from "../../../../hooks/SnackBarProvider";
import { AppDispatch } from "../../../../store/store";

interface params {
  data: {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    zip_code: string;
  } | null;
  setData: (e: object | null) => void;
  getData: () => void;
}
const initialData = {
  first_name: "",
  last_name: "",
  phone_number: "",
  email: "",
  zip_code: "",
};
export default function EntryField({ data, setData, getData }: params) {
  const { showSuccess, showError }: any = useSnackbar();
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  // form validations
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(customerSchema),
    defaultValues: initialData,
  });

  // submit method
  const onSubmit = (data: any) => {
    console.log("submit Customer", data);
    dispatch(
      fetchCreateUpdateCustomer({
        data: data,
        onSuccess: () => {
          getData();
          setOpen(false);
          showSuccess(`${data?.id ? "Edit" : "Create"} Customer Successfully`);
        },
        onError: () => {
          showError(`${data?.id ? "Edit" : "Create"} Customer Failed`);
        },
      })
    );
  };

  //life cycle
  useEffect(() => {
    if (data) {
      console.log("set data", data);
      reset(data);
      setOpen(true);
    } else {
      reset(initialData);
    }
  }, [data, reset, setData]);

  return (
    <Fragment>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Add Customer
      </Button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setData(null);
        }}
      >
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          sx={(theme) => ({
            [theme.breakpoints.only("xs")]: {
              top: "unset",
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              transform: "none",
              maxWidth: "unset",
            },
          })}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography id="nested-modal-title" level="h1">
            {data ? "Edit" : "Add"} Customer
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Controller
                  name="first_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      type="text"
                      label="First Name"
                      size="small"
                      error={!!errors.first_name}
                      helperText={
                        errors.first_name ? errors.first_name.message : ""
                      }
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="last_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      sx={{ width: "100%" }}
                      fullWidth
                      type="text"
                      label="Last Name"
                      size="small"
                      error={!!errors.last_name}
                      helperText={
                        errors.last_name ? errors.last_name.message : ""
                      }
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="phone_number"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      type="text"
                      label="Phone Number"
                      size="small"
                      error={!!errors.phone_number}
                      helperText={
                        errors.phone_number ? errors.phone_number.message : ""
                      }
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      type="email"
                      label="Email"
                      error={!!errors.email}
                      size="small"
                      helperText={errors.email ? errors.email.message : ""}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="zip_code"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      sx={{ width: "100%" }}
                      fullWidth
                      label="Zip Code"
                      size="small"
                      error={!!errors.zip_code}
                      helperText={
                        errors.zip_code ? errors.zip_code.message : ""
                      }
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                mt: 1,
                display: "flex",
                gap: 1,
                flexDirection: { xs: "column", sm: "row-reverse" },
              }}
            >
              <Button
                type="submit"
                sx={{ mt: 3 }}
                color="primary"
                disabled={isSubmitting}
              >
                Save
              </Button>
              <Button
                color="neutral"
                sx={{ mt: 3 }}
                onClick={() => {
                  setOpen(false);
                  setData(null);
                }}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </ModalDialog>
      </Modal>
    </Fragment>
  );
}

import { Alert } from "@mui/material";


export const showSuccess = (data: string) => {
  <Alert variant="filled" severity="success">
    {data}
  </Alert>;
};

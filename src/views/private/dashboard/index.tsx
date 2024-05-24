import { Fragment } from "react/jsx-runtime";
import { showSuccess } from "../../../utils/Alerts";
import { Alert, AlertTitle, Button } from "@mui/material";

function Dashboard() {
  return (
    <Fragment>
      <h1 className="text-3xl">Dashboard</h1>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success Alert with an encouraging title.
      </Alert>

      <Button onClick={() => showSuccess("Success Showed")}>Alert</Button>
    </Fragment>
  );
}

export default Dashboard;

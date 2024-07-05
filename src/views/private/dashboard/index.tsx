import { Fragment } from "react/jsx-runtime";
import { useSnackbar } from "../../../hooks/SnackBarProvider";
import { Button } from "@mui/material";
function Dashboard() {
  const {showInfo} = useSnackbar();
  return (
    <Fragment>
      <h1 className="text-3xl">Dashboard</h1>
      <Button onClick={()=> {
        showInfo("Test Error Occur")
      }}>show error</Button>
    </Fragment>
  );
}

export default Dashboard;

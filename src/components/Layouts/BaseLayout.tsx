/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { menuItems } from "../Variables";
import { Link, Outlet, useNavigate } from "react-router-dom";
import loading1 from "../../assets/images/Loading1.gif";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogout } from "../../store/thunks/auth";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;

export default function BaseLayout(props: Props) {
  const { window } = props;
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              component={Link}
              to={item.url}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const navigate = useNavigate();
  const loading = useSelector((state: any) => state.authenticate?.isLoading);
  if (loading === true)
    return (
      <div className="flex justify-center h-screen items-center">
        <img src={loading1} alt="loading" />
      </div>
    );
  else
    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              POS Management
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  sx={{ color: "#fff" }}
                  component={Link}
                  to={item.url}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" }, ml: 10 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                  dispatch(
                    fetchLogout({
                      onSuccess: () => {
                        showSuccess("Logout Success");
                        navigate("/login");
                      },
                      onError: () => {
                        // Handle error scenario if needed
                      },
                    })
                  )
                }
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    );
}

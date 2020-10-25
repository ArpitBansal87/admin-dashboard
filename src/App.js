import React, { useEffect, useState } from "react";
import "./App.css";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import SideBar from "./modules/sidebar/sidebar";
import Dashboard from "./modules/dashboard/dashboard";
import {
  colors,
  userInitialMailsList,
  userSentMailsList,
} from "./utils/constants";
import SignIn from "./components/signIn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import Notifications from "@material-ui/icons/Notifications";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    left: "73px",
    width: `calc(100% - 73px)`,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth - 73,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolBarClass: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    backgroundColor: colors.white,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    paddingLeft: theme.spacing(3),
  },
  openDrawerToolbar: {
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: colors.backgroundColor,
  },
  isDrawerOpen: {
    left: "72px",
  },
  button: {
    minWidth: "30px",
    backgroundColor: colors.primaryGreenColor,
    padding: "6px 10px",
    color: colors.white,
    "& span>span": {
      margin: 0,
    },
  },
}));

function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [wasLoginSuccessfull, setLoginSuccess] = useState(false);
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );
  const [inboxValue, setInboxValue] = useState(
    JSON.parse(localStorage.getItem("inbox"))
  );
  const [headingText, setHeading] = useState("Inbox");

  useEffect(() => {
    if (localStorage.getItem("mailsList") === null) {
      localStorage.setItem("mailsList", JSON.stringify(userInitialMailsList));
    }
    if (localStorage.getItem("userDetails") !== null) {
      setLoginSuccess(true);
      setUserDetails(localStorage.getItem("userDetails"));
    }
    if (localStorage.getItem("sentMailsList") === null) {
      localStorage.setItem("sentMailsList", JSON.stringify(userSentMailsList));
    }
  }, []);

  const updateInbox = (data) => {
    if (data === "sentMails") {
      setInboxValue(JSON.parse(localStorage.getItem("sentMails")));
    } else {
      setInboxValue(JSON.parse(localStorage.getItem("inbox")));
    }
  };

  const handleSuccessfullLogin = () => {
    setLoginSuccess(true);
    updateInbox("inbox");
  };

  const logout = () => {
    setLoginSuccess(false);
  };
  return (
    <>
      {wasLoginSuccessfull ? (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}

          >
            <Toolbar className={classes.toolBarClass}>
              <Button
                variant="contained"
                className={classes.button}
                startIcon={<MenuIcon />}
              ></Button>
              <Typography
                variant="h6"
                noWrap
                style={{ color: colors.greyColor2 }}
              >
                Search for something...
              </Typography>
              <div style={{ marginLeft: "auto" }}>
                <Badge
                  badgeContent={
                    JSON.parse(localStorage.getItem("inbox")).filter(
                      (ele) => !ele.isRead
                    ).length
                  }
                  color="primary"
                  style={{ marginLeft: "2rem" }}
                  showZero
                >
                  <MailIcon style={{ color: colors.greColor1 }} />
                </Badge>
                <Badge
                  badgeContent={0}
                  color="secondary"
                  style={{
                    marginLeft: "1.5rem",
                    color: colors.primaryGreenColor,
                  }}
                >
                  <Notifications style={{ color: colors.greColor1 }} />
                </Badge>
                <Button
                  startIcon={<ExitToAppIcon></ExitToAppIcon>}
                  onClick={logout}
                  style={{ marginLeft: "1.5rem", color: colors.greColor1 }}
                >
                  Logout
                </Button>
              </div>
            </Toolbar>
          </AppBar>
          <SideBar
            updateDrawerState={setOpen}
            inbox={inboxValue}
            userData={userDetails}
          ></SideBar>
          <main className={classes.content}>
            <Dashboard
              inbox={inboxValue}
              updateInbox={updateInbox}
              heading={headingText}
              changeheading={setHeading}
            ></Dashboard>
          </main>
        </div>
      ) : (
        <div>
          <SignIn data-id="sign-In-module" onLogin={handleSuccessfullLogin}></SignIn>
        </div>
      )}
    </>
  );
}

export default App;

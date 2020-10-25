import React, { useState } from "react";
import { List, ListItem, Drawer, ListItemIcon } from "@material-ui/core";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Collapse from "@material-ui/core/Collapse";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => {
  return {
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(0, 1),

      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    openDrawerToolbar: {
      justifyContent: "flex-start",
      margin: "30px 10px 30px 10px",
    },
    openDrawerLabel: {
      display: "inline",
    },
    closedDrawerLabel: {
      display: "none",
    },
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(10),
    },
    selectedSideBarItem: {
      borderLeft: "4px solid DarkGreen",
    },
  };
});

const menuItemsObj = [
  {
    name: "Dashboards",
    icons: "dashboard",
    hasSubLevel: false,
    isOpen: false,
  },
  {
    name: "Layouts",
    icons: "web",
    hasSubLevel: false,
    isOpen: false,
  },
  {
    name: "Graphs",
    icons: "bar_chart",
    hasSubLevel: false,
    isOpen: false,
  },
  {
    name: "Mailbox",
    icons: "mail",
    hasSubLevel: true,
    isSelected: true,
    labelValue: "16/24",
    children: [
      {
        name: "Inbox",
        isSelected: true,
      },
      {
        name: "Email view",
        isSelected: false,
      },
      {
        name: "Compose email",
        isSelected: false,
      },
      {
        name: "Email templates",
        isSelected: false,
      },
    ],
  },
  {
    name: "Metrics",
    icons: "pie_chart",
    hasSubLevel: false,
  },
  {
    name: "Widgets",
    icons: "widgets",
    hasSubLevel: false,
  },
  {
    name: "Forms",
    icons: "list_alt",
    hasSubLevel: false,
  },
  {
    name: "App Views",
    icons: "video_label",
    hasSubLevel: false,
  },
];

const SideBar = (props) => {
  const theme = useTheme();
  const [open, setDrawerOpen] = useState(false);
  const [menuItems, setMenuItems] = useState(menuItemsObj);
  const classes = useStyles(theme);
  const userDataObj = JSON.parse(props.userData);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
    props.updateDrawerState(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    props.updateDrawerState(false);
  };

  const handleSidebarItem = (indexValue) => {
    setMenuItems(
      menuItems.map((ele, index) => {
        if (indexValue === ele.name) {
          return {
            ...ele,
            isSelected: !ele.isSelected,
          };
        } else {
          return {
            ...ele,
            isSelected: false,
          };
        }
      })
    );
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
      onMouseEnter={handleDrawerOpen}
      onMouseLeave={handleDrawerClose}
      data-testid="sidebar-drawer"
    >
      <div
        className={clsx(
          classes.toolbar,
          open ? classes.openDrawerToolbar : classes.closedDrawer
        )}
      >
        {open ? (
          <div xs={12}>
            <Avatar
              alt={userDataObj.firstName}
              src="/static/images/avatar/1.jpg"
            />
            <Typography>
              {userDataObj.firstName} {userDataObj.lastName}
            </Typography>
            <Typography variant="caption">
              {userDataObj.designation}
              <KeyboardArrowDownIcon
                fontSize="small"
                style={{ verticalAlign: "bottom" }}
              ></KeyboardArrowDownIcon>
            </Typography>
          </div>
        ) : (
          <div>
            <Typography>IN+</Typography>
          </div>
        )}
      </div>
      <Divider />
      <List>
        {menuItems.map((data, index) => (
          <div
            className={clsx(data.isSelected ? classes.selectedSideBarItem : "")}
            key={index}
          >
            <ListItem button onClick={() => handleSidebarItem(data.name)}>
              <ListItemIcon>
                <span className="material-icons">{data.icons}</span>
              </ListItemIcon>
              <ListItemText primary={data.name} />
              <ListItemSecondaryAction
                className={
                  open ? classes.openDrawerLabel : classes.closedDrawerLabel
                }
              >
                {data.labelValue}
              </ListItemSecondaryAction>
            </ListItem>
            {data.hasSubLevel ? (
              <Collapse
                in={data.isSelected && open}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {data.children.map((ele, idx) => (
                    <ListItem button className={classes.nested} key={idx}>
                      <ListItemText primary={ele.name} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            ) : (
              <></>
            )}
          </div>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default SideBar;

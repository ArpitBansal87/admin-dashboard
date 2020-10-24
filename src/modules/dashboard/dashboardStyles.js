import { makeStyles } from "@material-ui/core";
import { colors } from "./../../utils/constants";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: "64px",
      backgroundColor: colors.backgroundColor,
    },
    composeButton: {
      color: colors.white,
      backgroundColor: colors.primaryGreenColor,
      width: "100%",
    },
    controlBar: {
      padding: "0 20px",
    },
    sectionHeading: {
      fontSize: "1rem",
      paddingBottom: "0.8rem",
    },
    folderInfoItem: {
      cursor: "pointer",
      display: "flex",
      paddingBottom: "0.3rem",
      paddingTop: "0.2rem",
      "& span.material-icons": { fontSize: "1rem", marginRight: "1rem" },
      "& p": {
        display: "inline",
        fontSize: "0.9rem",
      },
      "& p.countInfo": {
        padding: "0 10px",
        borderRadius: "4px",
        marginLeft: "auto",
      },
    },
    categoryItem: {
      paddingBottom: "0.3rem",
      paddingTop: "0.2rem",
    },
    labelContainer: {
      backgroundColor: colors.white,
      padding: "5px",
      display: "inline-flex",
      marginBottom: "10px",
      marginRight: "10px",
      "& span.material-icons": {
        color: colors.greColor1,
        fontSize: "16px",
      },
    },
    labelName: {
      fontSize: "12px",
    },
    circle: {
      width: "0.8rem",
      height: "0.8rem",
      display: "inline-block",
      borderRadius: "50%",
      marginRight: "10px",
    },

    // inside the Inbox panel
    emailSectionHeading: {
      padding: "1.5rem",
    },
    inboxCtrlButton: {
      fontSize: "0.6rem",
      padding: "0.5rem",
      marginLeft: "0.5rem",
      minWidth: "auto",
      "& span>span": {
        margin: "0",
        "& svg.MuiSvgIcon-root": {
          fontSize: "0.8rem",
        },
      },
    },
    "button.inboxCtrlButton:first-of-type": {
      paddingLeft: 0,
    },
    searchField: {
      "& input": {
        // height: '36px',
        // borderColor: colors.greyColor2,
      },
      "& button": {
        backgroundColor: colors.primaryGreenColor,
        textTransform: "none",
        color: colors.white,
      },
    },
    sendMailElement: {
      display: "flex",
      "& > div": {
        width: "100%",
      },
    },
    sendButton: {
      color: colors.white,
      backgroundColor: colors.primaryGreenColor,
    },
    sendMailHeading: {
      display: "inline",
      paddingRight: "1rem",
    },
  };
});

export default useStyles;

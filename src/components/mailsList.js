import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import AttachmentIcon from "@material-ui/icons/Attachment";
import { colors, categories, months } from "../utils/constants";

const useStyles = makeStyles((theme) => ({
  mailElement: {
    display: "flex",
    padding: "0 1.5rem",
    alignItems: "center",
    "& span": {
      paddingLeft: 0,
    },
    "& p": {
      display: "inline",
    },
    borderTop: "1px solid",
    borderTopColor: colors.greColor1,
  },
  "mailElement:last-type-of": {
    borderBottomColor: colors.greColor1,
    borderBottom: "1px solid",
  },
  nameInfo: {
    position: "relative",
    display: "flex",
    width: "20%",
    alignItems: "baseline",
    paddingLeft: "1rem",
    "& p.nameText": {
      fontSize: "1rem",
    },
  },
  mailDetails: {
    width: "65%",
    display: "flex",
    alignItems: "baseline",
    paddingLeft: "1.5rem",
  },
  mailDate: {
    paddingLeft: "1.5rem",
  },
  mailIsRead: {
    backgroundColor: "#f9f8f8",
  },
}));

const mailsSelected = (selectedObj, mailObj) => {
  const isObjectPresent = selectedObj.find((ele) => {
    const objValue = ele.split("-");
    if (
      mailObj.from === objValue[0] &&
      mailObj.to === objValue[1] &&
      mailObj.body === objValue[2] &&
      mailObj.subject === objValue[3]
    ) {
      return true;
    } else {
      return false;
    }
  });
  return isObjectPresent !== undefined ? true : false;
};

const CustomCheckbox = withStyles({
  root: {
    "&$checked": {
      color: colors.primaryGreenColor,
    },
  },
  checked: {},
})((props) => (
  <Checkbox
    color="default"
    {...props}
    checked={mailsSelected(props.selectedMails, props.mailData)}
    onChange={(event) => props.handleChange(event, props.mailData)}
  />
));

const Labels = (props) => {
  const categoryObject = categories.find((ele) => ele.name === props.name);
  return (
    <Typography
      style={{
        padding: "3px",
        color: colors.white,
        fontSize: "0.6rem",
        backgroundColor:
          categoryObject !== undefined
            ? categoryObject.indicatorColor
            : colors.defaultCategoryColor,
        borderRadius: "5px",
        marginLeft: "auto",
      }}
    >
      {props.name}
    </Typography>
  );
};

const showDate = (timeString) => {
  const dateObj = new Date(timeString);
  return months[dateObj.getMonth()] + " " + dateObj.getDate();
};

const MailsList = (props) => {
  const classes = useStyles();

  return (
    <>
      <Grid container direction="column">
        {props.mails !== null ? (
          props.mails.map((data, index) => (
            <Grid
              item
              key={index}
              className={clsx(
                classes.mailElement,
                data.isRead ? classes.mailIsRead : classes.mailIsNotRead
              )}
            >
              <CustomCheckbox
                mailData={data}
                handleChange={props.handleSelection}
                selectedMails={props.selectedMailList}
              ></CustomCheckbox>
              <div className={classes.nameInfo}>
                <Typography variant="body2" className="nameText">
                  {data.from}
                </Typography>
                {data.category !== undefined ? (
                  <Labels name={data.category}></Labels>
                ) : (
                  <></>
                )}
              </div>
              <div className={classes.mailDetails}>
                <Typography variant="body2"> {data.subject}</Typography>
                {data.hasAttachment ? (
                  <AttachmentIcon
                    style={{ marginLeft: "auto ", color: colors.greColor1 }}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className={classes.mailDate}>
                <Typography variant="body2">{showDate(data.time)}</Typography>
              </div>
            </Grid>
          ))
        ) : (
          <></>
        )}
      </Grid>
    </>
  );
};

export default MailsList;

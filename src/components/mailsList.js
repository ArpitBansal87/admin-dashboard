import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import AttachmentIcon from "@material-ui/icons/Attachment";
import { colors, categories } from "../utils/constants";
import { showDate } from "../utils/utils";

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
    cursor: "default",
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
  const isObjectPresent = selectedObj.find((ele) => ele === mailObj.id);
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
    checked={mailsSelected(props.selectedmails, props.maildata)}
    onChange={(event) => props.change(event, props.maildata)}
    inputProps={{
      "data-testid": "checkbox-" + props.maildata.id,
    }}
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
                maildata={data}
                change={props.handleSelection}
                selectedmails={props.selectedMailList}
              ></CustomCheckbox>
              <div className={classes.nameInfo}>
                <Typography variant="body2" className="nameText">
                  {props.heading === "Inbox" ? data.from : data.to}
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

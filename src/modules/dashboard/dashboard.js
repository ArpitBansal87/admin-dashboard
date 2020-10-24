import React, { useRef, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Button, Divider, FormHelperText, TextField } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import useStyles from "./dashboardStyles";
import {
  categories,
  colors,
  labels,
  userDetails,
} from "./../../utils/constants";
import CachedIcon from "@material-ui/icons/Cached";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import DeleteIcon from "@material-ui/icons/Delete";
import MailsList from "../../components/mailsList";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SendIcon from "@material-ui/icons/Send";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";
import {
  deleteEmail,
  handleSentEmails,
  readSelectedMails,
} from "../../utils/utils";

const Dashboard = (props) => {
  const [isDialogOpen, setShowDialog] = useState(false);
  const [selectedMails, setSelectedMails] = useState([]);
  const classes = useStyles();

  //Dialog States
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isFromValid, setIsFromValid] = useState(true);
  const [isToValid, setIsToValid] = useState(true);
  const [isSubjectValid, setIsSubjectValid] = useState(true);
  const [isBodyValid, setIsBodyValid] = useState(true);

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleEmailSending = (event) => {
    from === "" || from === undefined
      ? setIsFromValid(false)
      : setIsFromValid(true);
    to === "" || to === undefined ? setIsToValid(false) : setIsToValid(true);
    subject === "" || subject === undefined
      ? setIsSubjectValid(false)
      : setIsSubjectValid(true);
    body === "" || body === undefined
      ? setIsBodyValid(false)
      : setIsBodyValid(true);
    handleSentEmails(from, to, subject, body, userDetails);
    // childRef.current.updateInbox();
    props.updateInbox();
    setShowDialog(false);
  };

  const refreshMails = () => {};

  const handleDelete = () => {
    selectedMails.forEach((ele) => {
      const dataValue = ele.split("-");
      deleteEmail(dataValue[0], dataValue[1], dataValue[3], dataValue[2]);
    });
    setSelectedMails([]);
    props.updateInbox();
  };

  const selectEmails = (event, data) => {
    if (event.target.checked) {
      setSelectedMails([
        ...selectedMails,
        `${data.from}-${data.to}-${data.body}-${data.subject}`,
      ]);
    } else {
      let selectMails = selectedMails.filter((ele) => {
        return ele === `${data.from}-${data.to}-${data.body}-${data.subject}`;
      });
      setSelectedMails(selectMails);
    }
  };

  const markSelectedMailasRead = (event) => {
    console.log(event);
    selectedMails.forEach((ele) => {
      const mailData = ele.split("-");
      readSelectedMails(
        mailData[0],
        mailData[1],
        mailData[3],
        mailData[2],
        props.heading === "Inbox" ? "inbox" : "sentMails"
      );
    });
    setSelectedMails([]);
    props.updateInbox(props.heading === "Inbox" ? "inbox" : "sentMails");
  };

  const childRef = useRef();

  const handleSentMails = () => {
    console.log("handleSentMails");
    props.changeheading("Sent Mails");
    props.updateInbox("sentMails");
  };

  const handleInboxMail = () => {
    props.changeheading("Inbox");
    props.updateInbox("inbox");
  };

  return (
    <>
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
        maxWidth={"sm"}
        fullWidth
      >
        <DialogTitle id="form-dialog-title">New Message</DialogTitle>
        <DialogContent>
          <form autoComplete="off">
            <div className={classes.sendMailElement}>
              <TextField
                error={!isFromValid}
                id="component-from"
                value={from}
                onChange={(event) => {
                  setFrom(event.target.value);
                }}
                label="From"
                type="email"
                required
                fullWidth
                variant="outlined"
              />
              <FormHelperText></FormHelperText>
            </div>
            <div className={classes.sendMailElement}>
              <TextField
                label="To"
                error={!isToValid}
                margin="dense"
                id="to"
                type="email"
                variant="outlined"
                fullWidth
                required
                onChange={(event) => {
                  setTo(event.target.value);
                }}
              />
            </div>
            <div className={classes.sendMailElement}>
              <TextField
                error={!isSubjectValid}
                label="Subject"
                margin="dense"
                id="subject"
                type="text"
                variant="outlined"
                fullWidth
                onChange={(event) => {
                  setSubject(event.target.value);
                }}
              />
            </div>
            <div className={classes.sendMailElement}>
              <TextField
                error={!isBodyValid}
                margin="dense"
                id="body"
                label=""
                type="email"
                fullWidth
                multiline
                rows={5}
                variant="outlined"
                onChange={(event) => {
                  setBody(event.target.value);
                }}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleCloseDialog}
            className={classes.cancelButton}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleEmailSending}
            className={classes.sendButton}
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12} lg={3}>
          <Grid
            container
            direction="column"
            className={classes.controlBar}
            spacing={2}
          >
            <Grid item xs={12}>
              <Button
                variant="contained"
                size={"large"}
                className={classes.composeButton}
                onClick={handleOpenDialog}
              >
                Compose Mail
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.section}>
              <Grid container direction="column">
                <Grid item>
                  <Typography
                    variant="overline"
                    style={{ fontWeight: 600 }}
                    className={classes.sectionHeading}
                  >
                    FOLDERS
                  </Typography>
                </Grid>
                <Grid
                  item
                  className={classes.folderInfoItem}
                  onClick={handleInboxMail}
                >
                  <span className="material-icons">inbox</span>
                  <Typography variant="body2">Inbox</Typography>
                  <Typography
                    variant="body2"
                    className="countInfo"
                    style={{
                      backgroundColor: colors.secondaryColor,
                      color: colors.white,
                    }}
                  >
                    {
                      JSON.parse(localStorage.getItem("inbox")).filter(
                        (ele) => !ele.isRead
                      ).length
                    }
                  </Typography>
                </Grid>
                <Divider></Divider>
                <Grid
                  item
                  className={classes.folderInfoItem}
                  onClick={handleSentMails}
                >
                  <span className="material-icons">mail</span>
                  <Typography variant="body2">Sent mails</Typography>
                </Grid>
                <Divider></Divider>
                <Grid item className={classes.folderInfoItem}>
                  <span className="material-icons">star</span>
                  <Typography variant="body2">Important</Typography>
                </Grid>
                <Divider></Divider>
                <Grid item className={classes.folderInfoItem}>
                  <span className="material-icons">drafts</span>
                  <Typography variant="body2">Drafts</Typography>
                </Grid>
                <Divider></Divider>
                <Grid item className={classes.folderInfoItem}>
                  <span className="material-icons">delete</span>
                  <Typography variant="body2">Trash</Typography>
                </Grid>
                <Divider></Divider>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.section}>
              <Grid container direction="column">
                <Grid item>
                  <Typography
                    variant="overline"
                    style={{ fontWeight: 600 }}
                    className={classes.sectionHeading}
                  >
                    CATEGORIES
                  </Typography>
                </Grid>
                {categories.map((ele, index) => (
                  <Grid item className={classes.categoryItem} key={index}>
                    <div
                      className={classes.circle}
                      style={{ backgroundColor: ele.indicatorColor }}
                    ></div>
                    <Typography variant="body2" style={{ display: "inline" }}>
                      {ele.name}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.section}>
              <div>
                <Typography variant="overline" style={{ fontWeight: 600 }}>
                  Labels
                </Typography>
              </div>
              {labels.map((data, index) => (
                <div className={classes.labelContainer} key={"label-" + index}>
                  <span className="material-icons">label</span>
                  <Typography variant="caption">{data}</Typography>
                </div>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={9}>
          <Paper elevation={0}>
            <Grid container spacing={3} className={classes.emailSection}>
              <Grid item xs={12}>
                <Grid
                  container
                  direction="row"
                  className={classes.emailSectionHeading}
                >
                  <Grid item>
                    <Typography variant="h4" gutterBottom={true}>
                      {props.heading} (
                      {props.inbox
                        ? props.inbox.filter((ele) => !ele.isRead).length
                        : 0}
                      )
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<CachedIcon fontSize="small" />}
                      className={classes.inboxCtrlButton}
                      onClick={refreshMails}
                    >
                      Refresh
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<VisibilityIcon fontSize="small" />}
                      className={classes.inboxCtrlButton}
                      onClick={markSelectedMailasRead}
                    ></Button>
                    <Button
                      variant="outlined"
                      startIcon={<PriorityHighIcon fontSize="small" />}
                      className={classes.inboxCtrlButton}
                    ></Button>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon fontSize="small" />}
                      className={classes.inboxCtrlButton}
                      onClick={handleDelete}
                    ></Button>
                  </Grid>
                  <Grid
                    item
                    style={{
                      marginLeft: "auto",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className={classes.searchField}>
                      <TextField
                        variant="outlined"
                        placeholder="Seach email"
                        size="small"
                      ></TextField>
                      <Button
                        variant="contained"
                        style={{ marginLeft: "1rem" }}
                      >
                        Search
                      </Button>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                      <Button
                        variant="outlined"
                        startIcon={<ArrowBack fontSize="small" />}
                        className={classes.inboxCtrlButton}
                      ></Button>
                      <Button
                        variant="outlined"
                        startIcon={<ArrowForward fontSize="small" />}
                        className={classes.inboxCtrlButton}
                      ></Button>
                    </div>
                  </Grid>
                </Grid>
                <MailsList
                  mails={props.inbox}
                  updateMails={props.updateInbox}
                  handleSelection={selectEmails}
                  selectedMailList={selectedMails}
                  ref={childRef}
                ></MailsList>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;

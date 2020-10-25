import { userDetails } from "./constants";

export const setUserData = () => {
  const userEmail = localStorage.getItem("loggedInUserEmail");
  const currentMails = JSON.parse(localStorage.getItem("mailsList"));
  const sentMailsList = JSON.parse(localStorage.getItem("sentMailsList"));
  localStorage.setItem("sentMails", JSON.stringify(sentMailsList[userEmail]));
  localStorage.setItem("inbox", JSON.stringify(currentMails[userEmail]));
  localStorage.setItem("userDetails", JSON.stringify(userDetails[userEmail]));
};

export const handleSentEmails = (from, to, subject, body) => {
  if (from !== "" && to !== "" && subject !== "" && body !== "") {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    let currentMailsList = JSON.parse(localStorage.getItem("mailsList"));
    let sentMailsList = JSON.parse(localStorage.getItem("sentMailsList"));
    let sentMails = JSON.parse(localStorage.getItem("sentMails"));
    let inbox = JSON.parse(localStorage.getItem("inbox"));
    const mailObj = {
      time: new Date(),
      subject: subject,
      from: `${userDetails.firstName} ${userDetails.lastName}`,
      to: to,
      body: body,
      isRead: false,
      isSelected: false,
      fromEmail: from,
      hasAttachment: false,
    };
    currentMailsList[to] = [...currentMailsList[to], mailObj];
    sentMailsList[from] = [...sentMailsList[from], mailObj];
    localStorage.setItem("mailsList", JSON.stringify(currentMailsList));
    localStorage.setItem("sentMailsList", JSON.stringify(sentMailsList));
    localStorage.setItem("sentMails", JSON.stringify([...sentMails, mailObj]));
    if (to === userDetails.email) {
      localStorage.setItem("inbox", JSON.stringify([...inbox, mailObj]));
    }
  }
};

export const deleteEmail = (from, to, subject, body) => {
  const currentInbox = JSON.parse(localStorage.getItem("inbox"));
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  let currentMailsList = JSON.parse(localStorage.getItem("mailsList"));
  const newinbox = currentInbox.filter((ele) => {
    if (
      ele.from === from &&
      ele.to === to &&
      ele.subject === subject &&
      ele.body === body
    ) {
      return false;
    } else {
      return true;
    }
  });
  localStorage.setItem("inbox", JSON.stringify(newinbox));
  currentMailsList[userDetails.email] = currentMailsList[
    userDetails.email
  ].filter((ele) => {
    return (
      ele.from === from &&
      ele.to === to &&
      ele.subject === subject &&
      ele.body === body
    );
  });
  localStorage.setItem("mailsList", JSON.stringify(currentMailsList));
};

export const readSelectedMails = (from, to, subject, body, indicator) => {
  const inbox = JSON.parse(localStorage.getItem(indicator));
  const currentValue = JSON.stringify(
    inbox.map((mail) => {
      if (
        mail.from === from &&
        mail.to === to &&
        mail.subject === subject &&
        mail.body === body
      ) {
        mail.isRead = true;
      }
      return mail;
    })
  );
  localStorage.setItem(indicator, currentValue);
};

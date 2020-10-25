import { months, userDetails } from "./constants";

export const setUserData = () => {
  const userEmail = localStorage.getItem("loggedInUserEmail");
  const currentMails = JSON.parse(localStorage.getItem("mailsList"))[
    userEmail
  ].map((mail) => {
    return {
      ...mail,
      id: uniqueId(),
    };
  });
  const sentMailsList = JSON.parse(localStorage.getItem("sentMailsList"))[
    userEmail
  ].map((mail) => {
    return {
      ...mail,
      id: uniqueId(),
    };
  });
  localStorage.setItem("sentMails", JSON.stringify(sentMailsList));
  localStorage.setItem("inbox", JSON.stringify(currentMails));
  localStorage.setItem("userDetails", JSON.stringify(userDetails[userEmail]));
};

export const handleSentEmails = (cc, to, subject, body) => {
  if (to !== "" && subject !== "" && body !== "") {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    let currentMailsList = JSON.parse(localStorage.getItem("mailsList"));
    let sentMailsList = JSON.parse(localStorage.getItem("sentMailsList"));
    let sentMails = JSON.parse(localStorage.getItem("sentMails"));
    let inbox = JSON.parse(localStorage.getItem("inbox"));
    const mailObj = {
      id: uniqueId(),
      time: new Date(),
      subject: subject,
      from: `${userDetails.firstName} ${userDetails.lastName}`,
      cc: cc,
      to: to,
      body: body,
      isRead: false,
      isSelected: false,
      fromEmail: `${userDetails.email}`,
      hasAttachment: false,
    };
    currentMailsList[to] = [...currentMailsList[to], mailObj];
    sentMailsList[userDetails.email] = [
      ...sentMailsList[userDetails.email],
      mailObj,
    ];
    localStorage.setItem("mailsList", JSON.stringify(currentMailsList));
    localStorage.setItem("sentMailsList", JSON.stringify(sentMailsList));
    localStorage.setItem("sentMails", JSON.stringify([...sentMails, mailObj]));
    if (to === userDetails.email) {
      localStorage.setItem("inbox", JSON.stringify([...inbox, mailObj]));
    }
  }
};

export const deleteEmail = (id, mailBoxType) => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  let currentMailBox, currentMailsList;
  if (mailBoxType === "inbox") {
    currentMailBox = JSON.parse(localStorage.getItem("inbox"));
    currentMailsList = JSON.parse(localStorage.getItem("mailsList"));
  } else {
    currentMailBox = JSON.parse(localStorage.getItem("sentMails"));
    currentMailsList = JSON.parse(localStorage.getItem("sentMailsList"));
  }
  const newMailBox = currentMailBox.filter((ele) => ele.id !== id);
  localStorage.setItem(mailBoxType, JSON.stringify(newMailBox));
  currentMailsList[userDetails.email] = currentMailsList[
    userDetails.email
  ].filter((ele) => ele.id !== id);
  localStorage.setItem(
    mailBoxType === "inbox" ? "mailsList" : "sentMailsList",
    JSON.stringify(currentMailsList)
  );
};

export const readSelectedMails = (id, indicator) => {
  const inbox = JSON.parse(localStorage.getItem(indicator));
  const currentValue = JSON.stringify(
    inbox.map((mail) => {
      if (mail.id === id) {
        mail.isRead = !mail.isRead;
      }
      return mail;
    })
  );
  localStorage.setItem(indicator, currentValue);
};

export const showDate = (timeString) => {
  const dateObj = new Date(timeString);
  return months[dateObj.getMonth()] + " " + dateObj.getDate();
};

export const uniqueId = (length = 16) => {
  return parseInt(
    Math.ceil(Math.random() * Date.now())
      .toPrecision(length)
      .toString()
      .replace(".", "")
  );
};

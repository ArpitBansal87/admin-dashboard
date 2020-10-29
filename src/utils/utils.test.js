import {
  userDetails,
  userInitialMailsList,
  userSentMailsList,
} from "./constants";
import * as utils from "./utils";

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

global.localStorage = localStorageMock;

const mockEmail = "anna@smith.com";

const mockData = userInitialMailsList[mockEmail];
const mockSentData = userSentMailsList[mockEmail];

localStorage.setItem("loggedInUserEmail", mockEmail);
localStorage.setItem("mailsList", JSON.stringify(userInitialMailsList));
localStorage.setItem("inbox", JSON.stringify(mockData));
localStorage.setItem("sentMailsList", JSON.stringify(userSentMailsList));
localStorage.setItem("sentMails", JSON.stringify(mockSentData));
localStorage.setItem("userDetails", JSON.stringify(userDetails[mockEmail]));

describe("Utils Section", () => {
  test("should test deleteEmails functions", () => {
    utils.setUserData();
    utils.deleteEmail(JSON.parse(localStorage.getItem("inbox"))[0].id, "inbox");
    utils.deleteEmail(
      JSON.parse(localStorage.getItem("sentMails"))[0].id,
      "sentMails"
    );
    expect(mockData.length - 1).toBe(
      JSON.parse(localStorage.getItem("inbox")).length
    );
    expect(mockSentData.length - 1).toBe(
      JSON.parse(localStorage.getItem("sentMails")).length
    );
  });

  test("should test setUserData functions", () => {
    utils.setUserData();
    expect(
      JSON.parse(localStorage.getItem("sentMails")).map((ele) => {
        ele = { ...ele, time: new Date(ele.time) };
        delete ele.id;
        return ele;
      })
    ).toStrictEqual(
      userSentMailsList[mockEmail].map((ele) => {
        return { ...ele, time: new Date(ele.time) };
      })
    );
  });

  test("should test handleSentEmails functions ", () => {
    utils.handleSentEmails(mockEmail, mockEmail, "mock Subject", "mock body");
    expect(JSON.parse(localStorage.getItem("sentMails")).length).toBe(
      mockData.length + 1
    );
    utils.handleSentEmails(
      mockEmail,
      "arpit.bansal@outlook.com",
      "mock Subject",
      "mock body"
    );
    expect(JSON.parse(localStorage.getItem("sentMails")).length).toBe(
      mockData.length + 2
    );
  });

  test("should generate unique list of ids", () => {
    let uniqueIdArray = [];
    for (let i = 0; i < 10; i++) {
      uniqueIdArray[i] = utils.uniqueId();
    }
    const uniqueSet = new Set(uniqueIdArray);
    expect(uniqueSet.size).toStrictEqual(uniqueIdArray.length);
  });

  test("should be able to mark selected mail", () => {
    utils.setUserData();
    utils.readSelectedMails(JSON.parse(localStorage.getItem("inbox"))[0].id, "inbox");
    let selectedMailCount = 0;
    JSON.parse(localStorage.getItem("inbox")).forEach((inboxElement) => {
      if (inboxElement.isRead) {
        selectedMailCount++;
      }
    });
    expect(selectedMailCount).toBe(1);
  });
});

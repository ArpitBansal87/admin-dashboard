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

localStorage.setItem("loggedInUserEmail", mockEmail);
localStorage.setItem("mailsList", JSON.stringify(userInitialMailsList));
localStorage.setItem("inbox", JSON.stringify(mockData));
localStorage.setItem("sentMailsList", JSON.stringify(userSentMailsList));
localStorage.setItem("userDetails", JSON.stringify(userDetails[mockEmail]));

describe("Utils Section", () => {
  test("should test deleteEmails functions", () => {
    utils.setUserData();
    console.log(JSON.parse(localStorage.getItem("inbox")));
    utils.deleteEmail(JSON.parse(localStorage.getItem("inbox"))[0].id, "inbox");
    expect(mockData.length - 1).toBe(
      JSON.parse(localStorage.getItem("inbox")).length
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
  });
});

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
const removedData = mockData.slice(1);
const slicedData = userInitialMailsList[mockEmail][0];

localStorage.setItem("loggedInUserEmail", mockEmail);
localStorage.setItem("mailsList", JSON.stringify(userInitialMailsList));
localStorage.setItem("inbox", JSON.stringify(mockData));
localStorage.setItem("sentMailsList", JSON.stringify(userSentMailsList));
localStorage.setItem("userDetails", JSON.stringify(userDetails[mockEmail]));

describe("Utils Section", () => {
  test("should test deleteEmails functions", () => {
    utils.deleteEmail(
      slicedData.from,
      slicedData.to,
      slicedData.subject,
      slicedData.body
    );
    expect(mockData.length - 1).toBe(
      JSON.parse(localStorage.getItem("inbox")).length
    );
  });

  test("should test setUserData functions", () => {
    utils.setUserData();
    expect(
      JSON.parse(localStorage.getItem("sentMails")).map((ele) => {
        return { ...ele, time: new Date(ele.time) };
      })
    ).toStrictEqual(
      userSentMailsList[mockEmail].map((ele) => {
        return { ...ele, time: new Date(ele.time) };
      })
    );
  });

  test("should test handleSentEmails functions ", () => {
    const mockEmailData = {
      subject: "Many Desktops publishing pacakges",
      time: new Date(2020, 4, 3, 3, 20, 30),
      from: "John Doe",
      fromEmail: "john@doe.com",
      to: "john@doe.com",
      body: "test line",
      isSelected: false,
      category: "Documents",
      hasAttachment: true,
      isRead: true,
    };
    utils.handleSentEmails(mockEmail, mockEmail, "mock Subject", "mock body");
    expect(JSON.parse(localStorage.getItem("sentMails")).length).toBe(
      mockData.length + 1
    );
  });
});

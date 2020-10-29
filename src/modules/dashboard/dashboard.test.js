import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Dashboard from "./dashboard";
import {
  userDetails,
  userInitialMailsList,
  userSentMailsList,
} from "../../utils/constants";
import userEvent from "@testing-library/user-event";
import { setUserData } from "../../utils/utils";

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

global.localStorage = localStorageMock;
const mockEmail = "anna@smith.com";
const mockData = userInitialMailsList[mockEmail];

let inboxValue, setInboxValue, heading, changeHeading, propData, dashboard;

describe("should test Dashboard component", () => {
  beforeEach(() => {
    localStorage.setItem("loggedInUserEmail", mockEmail);
    localStorage.setItem("mailsList", JSON.stringify(userInitialMailsList));
    localStorage.setItem("sentMailsList", JSON.stringify(userSentMailsList));
    setUserData();
    // localStorage.setItem("sentMailsList", JSON.stringify(userSentMailsList));
    // localStorage.setItem(
    //   "sentMails",
    //   JSON.stringify(userSentMailsList[mockEmail])
    // );
    // localStorage.setItem("userDetails", JSON.stringify(userDetails[mockEmail]));
    inboxValue = JSON.parse(localStorage.getItem("inbox"));
    setInboxValue = (data) => {
      inboxValue = data;
    };
    heading = "Inbox";
    changeHeading = (data) => {
      heading = data;
    };
    propData = {
      inbox: inboxValue,
      updateInbox: setInboxValue,
      heading: "Inbox",
      changeheading: changeHeading,
    };
    dashboard = render(<Dashboard {...propData}></Dashboard>);
  });

  test("Dashboard has mail content", () => {
    const drawerExist = dashboard.getByTestId("mail-content");
    expect(drawerExist).toBeTruthy();
  });

  test("Should be able to switch between sent mails and inbox", () => {
    userEvent.click(dashboard.getByTestId("sent-mails-button"));
    expect(heading).toBe("Sent Mails");
    userEvent.click(dashboard.getByTestId("inbox-button"));
    expect(heading).toBe("Inbox");
  });

  test("toggle compose mail dialog", async () => {
    fireEvent.click(dashboard.getByTestId("compose-mail-button"));
    expect(dashboard.getByTestId("dialog-mail")).toBeInTheDocument();
  });

  describe("Should be able to perform selection of  Mails", () => {
    test("should be able to mark mails as read/unread", () => {
      userEvent.click(dashboard.getByTestId("inbox-button"));
      fireEvent.click(
        dashboard.getByTestId(
          "checkbox-" + JSON.parse(localStorage.getItem("inbox"))[0].id
        )
      );
      fireEvent.click(dashboard.getByTestId("mark-read-button"));
      expect(
        JSON.parse(localStorage.getItem("inbox")).filter((ele) => {
          return ele.isRead;
        }).length
      ).not.toBe(
        userInitialMailsList[mockEmail].filter((ele) => {
          return ele.isRead;
        }).length
      );
    });
    test("toggle Selection", () => {
      fireEvent.click(
        dashboard.getByTestId(
          "checkbox-" + JSON.parse(localStorage.getItem("inbox"))[0].id
        )
      );
      fireEvent.click(
        dashboard.getByTestId(
          "checkbox-" + JSON.parse(localStorage.getItem("inbox"))[0].id
        )
      );
      fireEvent.click(dashboard.getByTestId("mark-read-button"));
      expect(
        JSON.parse(localStorage.getItem("inbox")).filter((ele) => {
          return ele.isRead;
        }).length
      ).toBe(
        userInitialMailsList[mockEmail].filter((ele) => {
          return ele.isRead;
        }).length
      );
    });

    test("Delete Mails", () => {
      fireEvent.click(
        dashboard.getByTestId(
          "checkbox-" + JSON.parse(localStorage.getItem("inbox"))[0].id
        )
      );
      fireEvent.click(dashboard.getByTestId("mark-delete-button"));
      expect(JSON.parse(localStorage.getItem("inbox")).length).toBe(
        userInitialMailsList[mockEmail].length - 1
      );
    });
  });

  describe("Should be able to send email", () => {
    test("send email ", async () => {
      fireEvent.click(dashboard.getByTestId("compose-mail-button"));
      const ccTextField = await screen.findByTestId("data-cc");
      const toTextField = await screen.findByTestId("data-to");
      const bodyTextField = await screen.findByTestId("data-body");
      const subjectTextField = await screen.findByTestId("data-subject");
      fireEvent.change(ccTextField, { target: { value: "john@doe.com" } });
      fireEvent.change(toTextField, { target: { value: "anna@smith.com" } });
      fireEvent.change(bodyTextField, {
        target: { value: "dummy data for body object" },
      });
      fireEvent.change(subjectTextField, {
        target: { value: "This is subject line" },
      });
      fireEvent.click(dashboard.getByTestId("data-send"));
      expect(JSON.parse(localStorage.getItem("sentMails")).length).toBe(
        userSentMailsList[mockEmail].length + 1
      );
    });
  });
});

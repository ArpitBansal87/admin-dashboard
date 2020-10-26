import React from "react";
import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import Dashboard from "./dashboard";
import {
  userDetails,
  userInitialMailsList,
  userSentMailsList,
} from "../../utils/constants";

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
test("should test Dashboard component", () => {
  let inboxValue = userInitialMailsList["anna@smith.com"];
  const setInboxValue = (data) => {
    inboxValue(data);
  };
  let heading = "Inbox";
  const changeHeading = (data) => {
    heading = data;
  };
  const propData = {
    inbox: inboxValue,
    updateInbox: setInboxValue,
    heading: "Inbox",
    changeheading: changeHeading,
  };
  const { getByTestId } = render(<Dashboard {...propData}></Dashboard>);
  const drawerExist = getByTestId("mail-content");
  expect(drawerExist).toBeTruthy();
  fireEvent.click(screen.queryByText(/compose mail/i));
  expect(getByTestId("dialog-mail")).toBeTruthy();
});

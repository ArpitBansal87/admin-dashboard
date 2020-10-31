import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import {
  userDetails,
  userInitialMailsList,
  userSentMailsList,
} from "./utils/constants";
import { setUserData } from "./utils/utils";
import userEvent from "@testing-library/user-event";

describe("Test for App component", () => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
  };

  global.localStorage = localStorageMock;
  let renderApp;
  let mockEmail = "john@doe.com",
    clickSubmit,
    userText,
    passwordText,
    clickLogout;
  describe("should be able to handle loggedIn user", () => {
    describe("Tests for Login functionality", () => {
      beforeEach(async () => {
        renderApp = render(<App></App>);
        clickSubmit = () => userEvent.click(renderApp.getByTestId("signInBtn"));
        userText = await screen.findByTestId("username-text");
        passwordText = await screen.findByTestId("password-text");
      });
      test("Should be able to login with the correct coredentials", async () => {
        fireEvent.change(passwordText, { target: { value: "smithAnna" } });
        fireEvent.change(userText, { target: { value: "anna@smith.com" } });
        clickSubmit();
        const loggedInUserEmailValue = localStorage.getItem(
          "loggedInUserEmail"
        );
        expect(loggedInUserEmailValue).toBe("anna@smith.com");
      });
    });
    describe("Tests for logged In User", () => {
      beforeEach(() => {
        localStorage.setItem(
          "userDetails",
          JSON.stringify(userDetails[mockEmail])
        );
        localStorage.setItem("loggedInUserEmail", mockEmail);
        localStorage.setItem(
          "inbox",
          JSON.stringify(userInitialMailsList[mockEmail])
        );
        renderApp = render(<App></App>);
        clickLogout = () =>
          userEvent.click(renderApp.getByTestId("logout-button"));
        setUserData();
      });
      test("Sidebar should be visible", () => {
        expect(renderApp.getByTestId("sidebar-drawer")).toBeTruthy();
      });
      test("Switch between inbox and sent mails option", () => {
        userEvent.click(renderApp.getByTestId("sent-mails-button"));
        expect(renderApp.queryByText("Sent Mails (1)")).toBeInTheDocument();
      });
      test("Logout functionality should be working", () => {
        clickLogout();
        const loggedInUserEmailValue = localStorage.getItem(
          "loggedInUserEmail"
        );
        expect(loggedInUserEmailValue).toBeNull();
      });
    });
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { userInitialMailsList, userSentMailsList } from "../utils/constants";
import SignIn from "./signIn";

describe("Test for Sign In", () => {
  let renderSignIn, clickSubmit, userText, passwordText;
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
  };

  global.localStorage = localStorageMock;
  const onLoginHandler = () => {};

  beforeEach(() => {
    renderSignIn = render(<SignIn onLogin={onLoginHandler}></SignIn>);
    localStorage.setItem("mailsList", JSON.stringify(userInitialMailsList));
    localStorage.setItem("sentMailsList", JSON.stringify(userSentMailsList));
    clickSubmit = () => userEvent.click(renderSignIn.getByTestId("signInBtn"));
  });

  test("sign in UI component exists", () => {
    const mailContentExists = renderSignIn.getByTestId("signIn");
    expect(mailContentExists).toBeTruthy();
  });

  describe("Error Message shown incase of invalid credentials  ", () => {
    let errorMessage;
    beforeEach(async () => {
      clickSubmit();
      errorMessage = await screen.findByTestId("errorMsg");
    });
    test("should show an error message", () => {
      expect(errorMessage).toBeInTheDocument();
    });
  });
  describe("Valid Login with correct credentials", () => {
    beforeEach(async () => {
      userText = await screen.findByTestId("username-text");
      passwordText = await screen.findByTestId("password-text");
    });
    test("should be able to login", () => {
      fireEvent.change(passwordText, { target: { value: "smithAnna" } });
      fireEvent.change(userText, { target: { value: "anna@smith.com" } });
      clickSubmit();
      const loggedInUserEmailValue = localStorage.getItem("loggedInUserEmail");
      expect(loggedInUserEmailValue).toBe("anna@smith.com");
    });
  });
});

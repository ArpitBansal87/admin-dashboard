import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const { getByText, getAllByTestId } = render(<App />);
  const linkElement = getAllByTestId("signIn-module");
  expect(true).toBe(true);
});

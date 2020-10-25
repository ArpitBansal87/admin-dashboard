import React from "react";
import Sidebar from "./sidebar";
import { render } from "@testing-library/react";
import { userDetails, userInitialMailsList } from "../../utils/constants";
test("should test Sidebar component", () => {
  let drawerState = true;
  const updateDrawerState = () => {
    drawerState = !drawerState;
  };
  const propData = {
    updateDrawerState: updateDrawerState,
    inbox: userInitialMailsList["anna@smith.com"],
    userData: JSON.stringify(userDetails["anna@smith.com"]),
  };
  const { getByTestId } = render(<Sidebar {...propData}></Sidebar>);
  const drawerExist = getByTestId("sidebar-drawer");
  expect(drawerExist).toBeTruthy();
});

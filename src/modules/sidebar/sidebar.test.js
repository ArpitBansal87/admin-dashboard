import React from "react";
import Sidebar, { menuItems } from "./sidebar";
import { fireEvent, render, screen } from "@testing-library/react";
import { userDetails, userInitialMailsList } from "../../utils/constants";
describe("should test Sidebar component", () => {
  let renderSideBar;
  beforeEach(() => {
    let drawerState = true;
    const updateDrawerState = () => {
      drawerState = !drawerState;
    };
    const propData = {
      updateDrawerState: updateDrawerState,
      inbox: userInitialMailsList["anna@smith.com"],
      userData: JSON.stringify(userDetails["anna@smith.com"]),
    };
    renderSideBar = render(<Sidebar {...propData}></Sidebar>);
  });
  test("sidebar is present", () => {
    const drawerExist = renderSideBar.getByTestId("sidebar-drawer");
    expect(drawerExist).toBeTruthy();
  });
  test("sidebar drawer opens and closes on mouseLeave and MouseEnter", async () => {
    fireEvent.mouseEnter(await screen.getByTestId("sidebar-drawer"));
    expect(await screen.getByText("Anna Smith")).toBeInTheDocument();
    fireEvent.mouseLeave(await screen.getByTestId("sidebar-drawer"));
    // const nameElement = await screen.getByTestId("sidebar-name-field");
    expect(await screen.getByText("IN+")).toBeInTheDocument();
  });
  test("Sidebar drawer opens default with sidebar sub items", async () => {
    fireEvent.mouseEnter(await screen.getByTestId("sidebar-drawer"));
    fireEvent.click(await screen.getByTestId("sidebar-content-graphs"));
    expect(await screen.queryByTestId("sidebar-sub-items")).not.toHaveClass(
      "MuiCollapse-entered"
    );
  });
});

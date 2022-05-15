import React from "react";
import { render, screen } from "@testing-library/react";
import Table from "./Table";

test("renders table title", () => {
  render(<Table />);
  const thElement = screen.getByRole("contentinfo");
  expect(thElement).toHaveTextContent("Cameras 3");
});

test("check if divisible by 3", () => {
  render(<Table />);
  jest.advanceTimersByTime(3000);
  const thElement = screen.getByRole("cameras3-code");
  thElement.textContent &&
    expect(parseInt(thElement.textContent.replace(/\D/g, "")) % 3).toEqual(0);
});

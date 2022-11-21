import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test.skip("renders App", () => {
  render(<App />);
  const linkElement = screen.getByText(/pairing/i);
  expect(linkElement).toBeInTheDocument();
});

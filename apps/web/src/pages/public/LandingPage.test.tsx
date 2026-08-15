import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LandingPage } from "./LandingPage";

describe("LandingPage", () => {
  it("presents the product learning principle", () => {
    render(<LandingPage />);

    expect(
      screen.getByRole("heading", {
        name: /learn through reasoning, not answer delivery/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/ai-guided learning grounded in course material/i),
    ).toBeInTheDocument();
  });

  it("shows the example progressive tutor response", () => {
    render(<LandingPage />);

    expect(
      screen.getByText(
        /what information would be useful to remember while scanning the array/i,
      ),
    ).toBeInTheDocument();
  });
});

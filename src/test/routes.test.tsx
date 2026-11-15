import { describe, expect, it } from "vitest";
import { act, render, waitFor } from "@testing-library/react";
import App from "@/App";

const ROUTES = [
  { path: "/", title: "Palestinian Bridges of Peace Foundation for Relief and Development" },
  { path: "/about", title: "About Us | Palestinian Bridges of Peace" },
  { path: "/projects", title: "Projects | Palestinian Bridges of Peace" },
  { path: "/news", title: "News | Palestinian Bridges of Peace" },
  { path: "/gallery", title: "Gallery | Palestinian Bridges of Peace" },
  { path: "/books", title: "Books & Stories | Palestinian Bridges of Peace" },
  { path: "/donate", title: "Donate | Palestinian Bridges of Peace" },
  { path: "/contact", title: "Contact Us | Palestinian Bridges of Peace" },
  { path: "/privacy", title: "Privacy Policy | Palestinian Bridges of Peace" },
  { path: "/terms", title: "Terms & Conditions | Palestinian Bridges of Peace" },
  { path: "/cookies", title: "Cookie Policy | Palestinian Bridges of Peace" },
];

const go = (path: string) => {
  act(() => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
};

describe("routes", () => {
  it.each(ROUTES)("renders $path", async ({ path, title }) => {
    render(<App />);
    go(path);
    await waitFor(() => expect(document.title).toBe(title), { timeout: 20000 });
  });

  it("renders 404 for unknown paths", async () => {
    render(<App />);
    go("/nonexistent");
    await waitFor(
      () => expect(document.title).toBe("Page Not Found | Palestinian Bridges of Peace"),
      { timeout: 20000 }
    );
  });
});

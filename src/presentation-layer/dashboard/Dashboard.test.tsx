import React from "react";
import { render, screen } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { NotificationProvider } from "application/contexts";
import Dashboard from "./Dashboard";

const queryClient = new QueryClient();

describe("Dashboard tests", () => {
  it("renders Adidas title", () => {
    const component = render(
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <Dashboard />{" "}
        </NotificationProvider>
      </QueryClientProvider>
    )
    const textElement = screen.getByText(/Adidas Technical Test/i);
    expect(textElement).toBeInTheDocument();
  });

  it("renders well", () => {
    const component = render(
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <Dashboard />{" "}
        </NotificationProvider>
      </QueryClientProvider>
    );
    expect(component.container).toMatchSnapshot();
  });
});

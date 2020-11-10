import React from "react";
import { useSnackBar, SnackbarProvider } from "./Snackbar";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "mutationobserver-shim";

// Component to test with
const Component = function ({ type, message, classes }) {
  const snackbar = useSnackBar(classes);

  return (
    <button
      onClick={() =>
        snackbar({
          type,
          message,
          autoHideDuration: 0.1,
        })
      }
    >
      Click
    </button>
  );
};

const classes = {
  successClassName: "successClassName",
  errorClassName: "errorClassName",
};

describe("<SnackbarProvider />", () => {
  it("Should make the context available in the children", () => {
    const { queryByText } = render(
      <SnackbarProvider>
        <Component type="success" message="Success Message" />
      </SnackbarProvider>
    );

    fireEvent.click(queryByText("Click"));

    expect(queryByText("Success Message")).toBeTruthy();
  });

  it("Should have a custom success class name if I pass the parameter to the hook", () => {
    const { queryByText, queryByTestId } = render(
      <SnackbarProvider>
        <Component type="success" message="Success Message" classes={classes} />
      </SnackbarProvider>
    );

    fireEvent.click(queryByText("Click"));

    const icon = queryByTestId("Snackbar_Icon-Test");

    expect(icon.className.includes("successClassName")).toBeTruthy();
  });

  it("Should have a default success icon if I dont pass the parameter to the hook", () => {
    const { queryByText, queryByTestId } = render(
      <SnackbarProvider>
        <Component type="success" message="Success Message" />
      </SnackbarProvider>
    );

    fireEvent.click(queryByText("Click"));

    const icon = queryByTestId("Snackbar_Icon-Test");

    expect(icon.className.includes("fa-check-circle")).toBeTruthy();
  });

  it("Should have a custom error class name if I pass the parameter to the hook", () => {
    const { queryByText, queryByTestId } = render(
      <SnackbarProvider>
        <Component type="error" message="Error Message" classes={classes} />
      </SnackbarProvider>
    );

    fireEvent.click(queryByText("Click"));

    const icon = queryByTestId("Snackbar_Icon-Test");

    expect(icon.className.includes("errorClassName")).toBeTruthy();
  });

  it("Should have a default error icon if I dont pass the parameter to the hook", () => {
    const { queryByText, queryByTestId } = render(
      <SnackbarProvider>
        <Component type="error" message="Error Message" />
      </SnackbarProvider>
    );

    fireEvent.click(queryByText("Click"));

    const icon = queryByTestId("Snackbar_Icon-Test");

    expect(icon.className.includes("fa-exclamation-circle")).toBeTruthy();
  });

  it("Should cover the else statement if not sending any info for the hook function", () => {
    const TestComponent = function () {
      const snackbar = useSnackBar();

      return <button onClick={snackbar}>Click</button>;
    };

    const { queryByText, container } = render(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>
    );

    fireEvent.click(queryByText("Click"));

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe("useSnackbar", () => {
  it("Should input an icon for a successful snackbar if passed the parameter to the hook", () => {
    const { queryByText } = render(
      <SnackbarProvider>
        <Component
          type="success"
          message="Success Message"
          classes={{
            successClassName: "Snackbar_Success",
            errorClassName: "Snackbar_Error",
          }}
        />
      </SnackbarProvider>
    );

    fireEvent.click(queryByText("Click"));

    expect(queryByText("Success Message")).toBeTruthy();
  });

  it("Should not close the snackbar if clicking outside the component", () => {
    const { queryByText } = render(
      <SnackbarProvider>
        <Component
          type="success"
          message="Success Message"
          classes={{
            successClassName: "Snackbar_Success",
            errorClassName: "Snackbar_Error",
          }}
        />
        <span>Click Outside</span>
      </SnackbarProvider>
    );

    fireEvent.click(queryByText("Click"));
    fireEvent.click(queryByText("Click Outside"));

    expect(queryByText("Success Message")).toBeTruthy();
  });

  it("Should automatically close the snackbar in 3 seconds", async () => {
    const { queryByText } = render(
      <SnackbarProvider>
        <Component
          type="success"
          message="Success Message"
          classes={{
            successClassName: "Snackbar_Success",
            errorClassName: "Snackbar_Error",
          }}
        />
        <span>Click Outside</span>
      </SnackbarProvider>
    );

    fireEvent.click(queryByText("Click"));

    await waitFor(() => {
      expect(queryByText("Success Message")).toBeFalsy();
    });
  });
});

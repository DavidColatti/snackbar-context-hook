import React, { useContext } from "react";
import { SnackbarContext } from "./Snackbar";

export const useSnackBar = (classes) => {
  const { successClassName, errorClassName } = classes || {};
  const [, setSnackbar] = useContext(SnackbarContext);

  const noClasses = classes === undefined;

  const toggleSnackBar = ({ type, message, autoHideDuration }) => {
    const isSuccessful = type === "success";
    const isError = type === "error";
    let iconClassName;

    // if the toggle is successful and we are given a class name
    if (isSuccessful && successClassName) {
      iconClassName = successClassName;

      // if the toggle is successful and there are no specified class names
    } else if (isSuccessful && noClasses) {
      iconClassName = "fas fa-check-circle";

      // if the toggle is an error and we are given a class name
    } else if (isError && errorClassName) {
      iconClassName = errorClassName;

      // if the toggle is an error and there are no specified class names
    } else if (isError && noClasses) {
      iconClassName = "fas fa-exclamation-circle";
    }

    const messageOutput = (
      <>
        <i
          className={`${iconClassName} Snackbar__Icon`}
          data-testid="Snackbar_Icon-Test"
        />
        {message}
      </>
    );

    setSnackbar({
      isOpen: true,
      isSuccessful,
      autoHideDuration,
      message: messageOutput,
    });
  };

  return toggleSnackBar;
};

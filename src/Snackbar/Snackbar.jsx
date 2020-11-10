import React, { useState, createContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useSnackBar } from "./useSnackBar";
import "./Snackbar.scss";

const SnackbarContext = createContext({});

const SnackbarProvider = ({ children }) => {
  const snackBarState = useState({
    message: "",
    isOpen: null,
    isSuccessful: false,
  });

  const [
    { isOpen, message, isSuccessful, autoHideDuration },
    setSnackBar,
  ] = snackBarState;

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar({ isOpen: false, isSuccessful: false, message: "" });
  };

  return (
    <SnackbarContext.Provider value={snackBarState}>
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={isOpen}
        onClose={handleClose}
        className="Snackbar"
        autoHideDuration={autoHideDuration || 3000}
        TransitionComponent={(props) => <Slide {...props} direction="up" />}
      >
        <Paper
          className="Snackbar-Content"
          data-type={isSuccessful ? "success" : "error"}
        >
          <Typography className="Snackbar-Typography">{message}</Typography>
        </Paper>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export { SnackbarProvider, SnackbarContext, useSnackBar };

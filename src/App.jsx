import React from "react";
import { useSnackBar } from "./Snackbar";

const App = () => {
  const snackBar = useSnackBar();

  return (
    <div>
      <button
        onClick={() =>
          snackBar({
            type: "success",
            message: "Successful Message",
          })
        }
      >
        Good
      </button>
      <button
        onClick={() =>
          snackBar({
            type: "error",
            message: "Error Message",
          })
        }
      >
        Bad
      </button>
    </div>
  );
};

export default App;

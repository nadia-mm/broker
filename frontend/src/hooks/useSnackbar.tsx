import { useState, useCallback } from "react";
import { Snackbar, Alert, SnackbarCloseReason } from "@mui/material";

const useSnackbar = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"error" | "success">(
    "success"
  );

  const showSnackbar = useCallback(
    (message: string, severity: "error" | "success") => {
      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setSnackbarOpen(true);
    },
    [setSnackbarMessage, setSnackbarSeverity, setSnackbarOpen]
  );

  const handleClose = useCallback(
    (_event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
      if (reason === "clickaway") {
        return;
      }
      setSnackbarOpen(false);
    },
    [setSnackbarOpen]
  );

  const SnackbarComponent = () => (
    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={snackbarSeverity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );

  return { showSnackbar, SnackbarComponent };
};

export default useSnackbar;

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({ open, handleClose }) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ alignItems: "center" }}
      >
        <DialogContent
          style={{
            width: "400px",
            height: "300px",
            padding: "0",
            textAlign: "center",
          }}
        >
          <img
            src="/logo.jpg"
            alt="로고"
            style={{
              maxWidth: "150px",
              height: "auto",
              margin: "0 auto",
              marginTop: 40,
            }}
          />
          <DialogContentText
            style={{ color: "gray", fontSize: 14, marginTop: 10 }}
          >
            Version: 1.0.1
          </DialogContentText>
          <DialogContentText
            style={{
              textAlign: "left",
              color: "black",
              marginTop: 95,
              fontSize: 15,
              marginLeft: 20,
            }}
          >
            2024 Rush Note Operations
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

// TopBar.js
import React from "react";
import { Toolbar, Typography } from "@mui/material";

function TopBar() {
  return (
    <Toolbar sx={{ backgroundColor: "white" }}>
      <img
        src="/logo.jpg"
        alt="로고"
        style={{
          maxWidth: "100px",
          height: "auto",
        }}
      />
      <Typography
        sx={{
          marginLeft: "20px",
          color: "black",
          fontSize: "20px",
          textAlign: "center",
        }}
        variant="h6"
      >
        Untitled
      </Typography>
      <Typography
        sx={{
          marginLeft: "20px",
          color: "black",
          fontSize: "15px",
          textAlign: "center",
        }}
        variant="h6"
      >
        Last : yesterday
      </Typography>
    </Toolbar>
  );
}

export default TopBar;

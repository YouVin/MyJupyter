// TopBar.js
import React, { useState, useEffect } from "react";
import { Toolbar, Typography } from "@mui/material";

function TopBar() {
  const [lastExecutionTime, setLastExecutionTime] = useState(null);

  useEffect(() => {
    // 로컬 저장소에서 마지막 실행 시간을 가져옴
    const storedLastExecutionTime = localStorage.getItem("lastExecutionTime");
    if (storedLastExecutionTime) {
      setLastExecutionTime(getRelativeTime(new Date(storedLastExecutionTime)));
    }
  }, []);

  const getRelativeTime = (dateTime) => {
    const diffInMs = new Date() - dateTime;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return "오늘";
    } else if (diffInDays === 1) {
      return "어제";
    } else {
      return `${diffInDays}일 전`;
    }
  };

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
        }}
        variant="h6"
      >
        Last : {lastExecutionTime}
      </Typography>
    </Toolbar>
  );
}

export default TopBar;

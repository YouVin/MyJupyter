import React, { useState, useEffect } from "react";
import { Toolbar, Typography } from "@mui/material";

function TopBar({ onTitleChange }) {
  const [lastExecutionTime, setLastExecutionTime] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState("Nonamed");

  useEffect(() => {
    // 로컬 저장소에서 마지막 실행 시간을 가져옴
    const storedLastExecutionTime = localStorage.getItem("lastExecutionTime");
    if (storedLastExecutionTime) {
      setLastExecutionTime(getRelativeTime(new Date(storedLastExecutionTime)));
    }
  }, []);

  useEffect(() => {
    // 컴포넌트가 마운트되면 window 객체를 사용하여 로직 실행
    if (window.location.pathname === "/nonamed") {
      // 로직 실행
    }
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행되도록 빈 배열 전달

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

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    // 부모 컴포넌트로 변경된 타이틀 전달
    onTitleChange(event.target.value);
  };

  const handleTitleClick = () => {
    setIsEditingTitle(true);
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
      {window.location.pathname === "/nonamed" && (
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onClick={handleTitleClick}
          readOnly={!isEditingTitle}
          style={{
            marginLeft: "20px",
            color: "black",
            fontSize: "20px",
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
        />
      )}
      {window.location.pathname === "/nonamed" && (
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
      )}
    </Toolbar>
  );
}

export default TopBar;

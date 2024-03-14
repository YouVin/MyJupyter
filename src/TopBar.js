import React, { useState, useEffect } from "react";
import { Toolbar, Typography, Input, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function TopBar({ defaultTitle, onTitleChange }) {
  const [lastExecutionTime, setLastExecutionTime] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState("Nonamed");
  const navigate = useNavigate();

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
  const handleEditTitle = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleConfirmTitle = () => {
    setIsEditingTitle(false); //
    onTitleChange(title); // 타이틀 변경 이벤트 발생
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
        <>
          {isEditingTitle ? (
            <Input
              type="text"
              value={title}
              onChange={handleTitleChange}
              autoFocus
              style={{
                marginLeft: "20px",
                color: "black",
                fontSize: "20px",
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
              }}
            />
          ) : (
            <Typography
              onClick={handleEditTitle}
              sx={{
                marginLeft: "20px",
                color: "black",
                fontSize: "20px",
                cursor: "pointer",
              }}
              variant="h6"
            >
              {title}
            </Typography>
          )}
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
          {isEditingTitle && (
            <Button
              onClick={handleConfirmTitle}
              variant="outlined"
              style={{ marginLeft: "10px" }}
            >
              확인
            </Button>
          )}
        </>
      )}
    </Toolbar>
  );
}

export default TopBar;

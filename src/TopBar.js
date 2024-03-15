import React, { useState, useEffect } from "react";
import { Toolbar, Typography, Input, Button } from "@mui/material";

function TopBar({ defaultTitle, onTitleChange, handleSetTimeData, savetime }) {
  const [lastExecutionTime, setLastExecutionTime] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState("Nonamed");

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
            Last : {savetime} {/* savetime 사용 */}
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

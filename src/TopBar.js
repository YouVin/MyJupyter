import React, { useState } from "react";
import { Toolbar, Typography, Input, Button, Divider } from "@mui/material";

function TopBar({ onTitleChange, savetime, setSaveTime }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState("Nonamed");

  const handleEditTitle = () => {
    setIsEditingTitle(true);
    handleTitleClick();
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleConfirmTitle = () => {
    setIsEditingTitle(false);
    onTitleChange(title);
    setSaveTime(null);
    console.log(title);

    // 로컬 스토리지에서 해당 키(title)의 값을 가져옴
    let existingData = localStorage.getItem(title);
    if (existingData) {
      // 기존 값이 있을 경우 기존 값을 파싱하여 활성화 여부를 추가하고 다시 문자열로 변환하여 저장
      existingData = JSON.parse(existingData);
      existingData.isActive = true;
      localStorage.setItem(title, JSON.stringify(existingData));
    } else {
      // 기존 값이 없을 경우 새로운 키를 생성하고 활성화 여부를 추가하여 저장
      localStorage.setItem(title, JSON.stringify({ isActive: true }));
    }
  };

  const handleTitleClick = () => {
    // 타이틀이 클릭되어 편집 모드로 전환될 때 현재 타이틀의 로컬스토리지의 isActive 값을 false로 변경
    let existingData = localStorage.getItem(title);
    if (existingData) {
      // 기존 값이 있을 경우 기존 값을 파싱하여 활성화 여부를 추가하고 다시 문자열로 변환하여 저장
      existingData = JSON.parse(existingData);
      existingData.isActive = false;
      localStorage.setItem(title, JSON.stringify(existingData));
    } else {
      // 기존 값이 없을 경우 새로운 키를 생성하고 활성화 여부를 추가하여 저장
      localStorage.setItem(title, JSON.stringify({ isActive: false }));
    }
  };

  return (
    <div>
      <Toolbar sx={{ backgroundColor: "white" }}>
        <img
          src="/logo.jpg"
          alt="로고"
          style={{
            maxWidth: "90px",
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
              Last: {savetime ? savetime : null}
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
      <Divider
        sx={{
          backgroundColor: "black",
          marginLeft: "25px",
          marginRight: "25px",
          marginTop: "5px",
        }}
      />
    </div>
  );
}

export default TopBar;

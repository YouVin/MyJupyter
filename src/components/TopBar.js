import React, { useState } from "react";
import { Toolbar, Typography, Input, Button, Divider } from "@mui/material";

function TopBar({ onTitleChange, savetime, setSaveTime }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState("Nonamed");

  const handleEditTitle = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleConfirmTitle = () => {
    setIsEditingTitle(false);
    onTitleChange(title);
    setSaveTime(null);
    console.log(title);
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

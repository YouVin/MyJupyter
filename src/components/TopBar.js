import React, { useState, useEffect } from "react";
import { Toolbar, Typography, Input, Button, Divider } from "@mui/material";
import { useParams } from "react-router-dom";

function TopBar({ onTitleChange, savetime, setSaveTime }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(
    localStorage.getItem("title") || "nonamed"
  );
  const { title: routeTitle } = useParams();

  useEffect(() => {
    setTitle(routeTitle || title);
  }, [routeTitle, title]);

  const handleEditTitle = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleConfirmTitle = () => {
    onTitleChange(title);
    setSaveTime(null);
    setIsEditingTitle(false);
    window.location.pathname = `/rushnote/${title}`;
    localStorage.setItem("title", title);
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("title");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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
        {window.location.pathname !== "/rushhome" && (
          <>
            {isEditingTitle ? (
              <Input
                type="text"
                value={title}
                autoFocus
                onChange={handleTitleChange}
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

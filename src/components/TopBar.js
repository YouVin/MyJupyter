import React, { useState, useEffect } from "react";
import { Toolbar, Typography, Input, Button } from "@mui/material";
import { useParams } from "react-router-dom";

function TopBar({ savetime, setSaveTime }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(
    localStorage.getItem("title") || "nonamed"
  );
  const { title: routeTitle } = useParams();

  useEffect(() => {
    setTitle(routeTitle || title);
  }, [routeTitle, title]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("title");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleEditTitle = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleConfirmTitle = () => {
    setSaveTime(null);
    setIsEditingTitle(false);
    window.location.pathname = `/rushnote/${title}`;
    localStorage.setItem("title", title);
  };

  // 시간 변환 함수
  const getRelativeTime = (dateTime) => {
    const diffInMs = new Date() - dateTime;
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays === 0) {
      if (diffInSeconds < 2) {
        return "now";
      }
      if (diffInMinutes < 1) {
        return `${diffInSeconds}초 전`;
      }
      if (diffInMinutes < 60) {
        return `${diffInMinutes}분 전`;
      } else if (diffInHours < 24) {
        return `${diffInHours}시간 전`;
      } else {
        return "오늘";
      }
    } else {
      return `${diffInDays}일 전`;
    }
  };

  return (
    <div>
      <Toolbar sx={{ backgroundColor: "white" }}>
        <img
          src="/logo.png"
          alt="로고"
          style={{
            width: "100px",
            height: "auto",
            objectFit: "contain",
          }}
        />
        {window.location.pathname !== "/rushhome" &&
          window.location.pathname !== "/" && (
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
                Last : {savetime ? getRelativeTime(savetime) : null}
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
    </div>
  );
}

export default TopBar;

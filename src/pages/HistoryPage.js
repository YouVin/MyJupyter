import React, { useState, useEffect } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import ClearIcon from "@mui/icons-material/Clear";

const HistoryPage = () => {
  const [savedHistory, setSavedHistory] = useState([]);
  const [groupedHistory, setGroupedHistory] = useState({});

  useEffect(() => {
    // 저장된 히스토리 가져오기
    const savedHistory = JSON.parse(localStorage.getItem("savedHistory")) || [];
    setSavedHistory(savedHistory);
  }, []);

  useEffect(() => {
    // 날짜별로 저장된 히스토리 그룹화
    const grouped = savedHistory.reduce((acc, item) => {
      const date = new Date(item.saveTime).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
    setGroupedHistory(grouped);
  }, [savedHistory]);

  const formatTimeAgo = (time) => {
    if (!time) {
      return "not saved";
    }
    // ISO 8601 형식의 문자열을 Date 객체로 변환
    const savedTime = new Date(time);
    // 현재 시간
    const currentTime = new Date();
    // 시간 차이를 밀리초 단위로 계산
    const diff = currentTime - savedTime;
    // 초 단위로 변환
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    }
    // 분 단위로 변환
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    }
    // 시간 단위로 변환
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} hours ago`;
    }
    // 일 단위로 변환
    const days = Math.floor(hours / 24);
    if (days < 30) {
      return `${days} days ago`;
    }
    // 월 단위로 변환
    const months = Math.floor(days / 30);
    if (months < 12) {
      return `${months} months ago`;
    }
    // 년 단위로 변환
    const years = Math.floor(months / 12);
    return `${years} years ago`;
  };

  const handleDeleteItem = (date, index) => {
    const updatedHistory = { ...groupedHistory };
    updatedHistory[date] = [...updatedHistory[date]];
    updatedHistory[date].splice(index, 1);
    localStorage.setItem(
      "savedHistory",
      JSON.stringify(Object.values(updatedHistory).flat())
    );
    setGroupedHistory(updatedHistory);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom style={{ marginTop: 20 }}>
        History
      </Typography>
      <Divider sx={{ backgroundColor: "rgba(0, 0, 51, 1)", marginTop: 2 }} />
      <Paper elevation={0} sx={{ boxShadow: "none", marginTop: 5 }}>
        {Object.entries(groupedHistory)
          .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
          .map(([date, historyItems]) => {
            // 시간에 따라 정렬
            historyItems.sort(
              (a, b) => new Date(b.saveTime) - new Date(a.saveTime)
            );

            return (
              <div key={date} style={{ marginTop: 10 }}>
                <Typography variant="button" style={{ fontSize: 15 }}>
                  <CalendarViewDayIcon style={{ marginRight: 15 }} />
                  {date}
                </Typography>
                <List component="div">
                  {historyItems.map((item, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        border: "1px solid rgba(0, 0, 51, 0.3)",
                        borderRadius: 1,
                        borderTop: "1px solid rgba(0, 0, 51, 0.3)",
                        borderBottom:
                          index === historyItems.length - 1
                            ? "1px solid rgba(0, 0, 51, 0.3)"
                            : "none",
                      }}
                    >
                      <ListItemText
                        primary={`[UPDATE] • ${item.title}`}
                        primaryTypographyProps={{
                          fontSize: 16,
                          fontWeight: "medium",
                          letterSpacing: 0,
                        }}
                        secondary={`create ${
                          item.cellItemCount ? item.cellItemCount : 0
                        } cellItems •  ${formatTimeAgo(item.saveTime)}`}
                      />
                      <IconButton onClick={() => handleDeleteItem(date, index)}>
                        <ClearIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </div>
            );
          })}
      </Paper>
    </div>
  );
};

export default HistoryPage;

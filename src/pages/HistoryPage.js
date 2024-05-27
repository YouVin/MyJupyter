import React, { useState, useEffect } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  Pagination,
} from "@mui/material";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import ClearIcon from "@mui/icons-material/Clear";

const HistoryPage = () => {
  const [savedHistory, setSavedHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("savedHistory")) || [];
    // 최신 날짜 순으로 정렬
    savedHistory.sort((a, b) => new Date(b.saveTime) - new Date(a.saveTime));
    setSavedHistory(savedHistory);
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const formatTimeAgo = (time) => {
    if (!time) {
      return "not saved";
    }
    const savedTime = new Date(time);
    const currentTime = new Date();
    const diff = currentTime - savedTime;
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} hours ago`;
    }
    const days = Math.floor(hours / 24);
    if (days < 30) {
      return `${days} days ago`;
    }
    const months = Math.floor(days / 30);
    if (months < 12) {
      return `${months} months ago`;
    }
    const years = Math.floor(months / 12);
    return `${years} years ago`;
  };
  const handleDeleteItem = (date, index) => {
    // 복사본을 만들어서 원본을 변경하지 않고 삭제
    const updatedHistory = [...savedHistory];
    updatedHistory.forEach((item, i) => {
      if (
        new Date(item.saveTime).toLocaleDateString() === date &&
        i === index
      ) {
        // splice를 사용하는 대신 인덱스로 직접 항목을 제거합니다.
        updatedHistory.splice(i, 1);
      }
    });
    setSavedHistory(updatedHistory);
    // 로컬 스토리지 업데이트
    localStorage.setItem("savedHistory", JSON.stringify(updatedHistory));
  };

  const totalItems = savedHistory.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const paginatedItems = savedHistory.slice(startIndex, endIndex);

  return (
    <div>
      <Typography variant="h5" gutterBottom style={{ marginTop: 20 }}>
        HISTORY
      </Typography>
      <Divider sx={{ backgroundColor: "rgba(0, 0, 51, 1)", marginTop: 2 }} />
      <Paper elevation={0} sx={{ boxShadow: "none", marginTop: 2 }}>
        {Object.entries(
          paginatedItems.reduce((acc, item) => {
            const date = new Date(item.saveTime).toLocaleDateString();
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(item);
            return acc;
          }, {})
        ).map(([date, historyItems]) => (
          <div key={date}>
            <Typography
              variant="button"
              style={{ fontSize: 15, marginTop: 10 }}
            >
              <CalendarViewDayIcon style={{ marginRight: 15 }} />
              {date}
            </Typography>
            <List component="div">
              {historyItems.map(
                (
                  item,
                  index // 항목을 최신 순서로 변경
                ) => (
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
                )
              )}
            </List>
          </div>
        ))}
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          style={{ marginTop: 10, display: "flex", justifyContent: "center" }}
        />
      </Paper>
    </div>
  );
};

export default HistoryPage;

import React, { useState, useEffect } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
const HistoryPage = () => {
  const [savedHistory, setSavedHistory] = useState([]);
  const [unsavedHistory, setUnsavedHistory] = useState([]);

  useEffect(() => {
    const loadAllDataFromLocalStorage = () => {
      const savedData = [];
      const unsavedData = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
        if (value.saveTime) {
          savedData.push({ key, ...value });
        } else {
          unsavedData.push({ key, ...value });
        }
      }
      return { saved: savedData, unsaved: unsavedData };
    };

    // 모든 데이터 불러오기
    const { saved, unsaved } = loadAllDataFromLocalStorage();
    console.log(saved, unsaved);

    // 시간순으로 정렬
    saved.sort((a, b) => new Date(b.saveTime) - new Date(a.saveTime));

    setSavedHistory(saved);
    setUnsavedHistory(unsaved);
  }, []);

  // 시간을 포맷하는 함수
  const formatTimeAgo = (time) => {
    if (!time) {
      return "not saved";
    }

    const seconds = Math.floor((new Date() - new Date(time)) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return `${interval} years ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval} months ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} minutes ago`;
    }
    return `${Math.floor(seconds)} seconds ago`;
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Saved History
      </Typography>
      <Divider sx={{ backgroundColor: "rgba(0, 0, 51, 1)", marginTop: 3 }} />
      <Paper elevation={0} sx={{ boxShadow: "none", marginTop: 3 }}>
        <List component="div">
          {savedHistory.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                border: "1px solid rgba(0, 0, 51, 0.3)",
                borderRadius: 1,
                borderTop:
                  index === 0 ? "1px solid rgba(0, 0, 51, 0.3)" : "none",
                borderBottom: "1px solid rgba(0, 0, 51, 0.3)",
              }}
            >
              <ListItemText
                primary={`Update ${item.key}`}
                secondary={`create ${
                  item.cellItems ? item.cellItems.length : 0
                } cellItems • ${formatTimeAgo(item.saveTime)}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default HistoryPage;

// TextList.js
import React, { useState, useEffect } from "react";
import { List, ListItem, Paper, TextField } from "@mui/material";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import javascript from "highlight.js/lib/languages/javascript"; // 원하는 언어의 highlight 추가

hljs.registerLanguage("javascript", javascript); // 언어 등록

function TextList({ onCodeChange, markdownResult }) {
  // const [codeItems, setCodeItems] = useState([]);
  const [newCodeItemText, setNewCodeItemText] = useState("");
  // const [resultItems, setResultItems] = useState([]);
  // const [newResultItemText, setNewResultItemText] = useState("");

  const inputStyle = {
    minHeight: "40px",
    overflow: "auto",
    resize: "vertical",
  };

  const handleTextFieldChange = (e) => {
    const value = e.target.value;
    setNewCodeItemText(value);
    onCodeChange(value);
  };

  const highlightAndRemoveTags = (text) => {
    const highlighted = hljs.highlight("javascript", text).value;
    return highlighted.replace(/<\/?[^>]+(>|$)/g, ""); // HTML 태그 제거
  };

  // const onAddCodeItem = (newText) => {
  //   setCodeItems([...codeItems, newText]);
  // };

  // const onUpdateCodeItem = (index, newText) => {
  //   const updatedItems = [...codeItems];
  //   updatedItems[index] = newText;
  //   setCodeItems(updatedItems);
  // };

  return (
    <Paper elevation={3} style={{ padding: "16px", backgroundColor: "white" }}>
      <List>
        <ListItem>
          {/* 코드 작성할 리스트 아이템 */}
          <TextField
            fullWidth
            multiline
            variant="outlined"
            label="Code"
            value={highlightAndRemoveTags(newCodeItemText)}
            onChange={handleTextFieldChange}
            InputProps={{ style: inputStyle }}
          />
        </ListItem>
        <ListItem style={{ padding: "10px 20px" }}>
          {/* 두 번째 아이템: 변환된 마크다운 텍스트 */}
          <div dangerouslySetInnerHTML={{ __html: markdownResult }} />
        </ListItem>
      </List>
    </Paper>
  );
}

export default TextList;

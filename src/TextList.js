// TextList.js
import React, { useState } from "react";
import { List, ListItem, Paper, TextField } from "@mui/material";
import { marked } from "marked";

function TextList() {
  const [codeItems, setCodeItems] = useState([]);
  const [newCodeItemText, setNewCodeItemText] = useState("");
  const [resultItems, setResultItems] = useState([]);
  const [newResultItemText, setNewResultItemText] = useState("");

  const inputStyle = {
    height: "40px",
  };

  const onAddCodeItem = (newText) => {
    setCodeItems([...codeItems, newText]);
  };

  const onUpdateCodeItem = (index, newText) => {
    const updatedItems = [...codeItems];
    updatedItems[index] = newText;
    setCodeItems(updatedItems);
  };

  const onAddResultItem = (newText) => {
    setResultItems([...resultItems, newText]);
  };

  const onUpdateResultItem = (index, newText) => {
    const updatedItems = [...resultItems];
    updatedItems[index] = newText;
    setResultItems(updatedItems);
  };

  const handleConvertToMarkdown = (codeText) => {
    // 마크다운 변환
    const markdownText = marked(codeText);

    // 변환된 마크다운을 두 번째 리스트에 추가
    onAddResultItem(markdownText);
  };

  return (
    <Paper elevation={3} style={{ padding: "16px", backgroundColor: "white" }}>
      <List>
        <ListItem>
          {/* 코드 작성할 리스트 아이템 */}
          <TextField
            fullWidth
            variant="outlined"
            label="Code"
            value={newCodeItemText}
            onChange={(e) => setNewCodeItemText(e.target.value)}
            onBlur={() => {
              if (newCodeItemText.trim() !== "") {
                onAddCodeItem(newCodeItemText);
                setNewCodeItemText("");
              }
            }}
            InputProps={{ style: inputStyle }}
          />
        </ListItem>
        {codeItems.map((item, index) => (
          <ListItem key={index}>
            {/* 코드 작성할 리스트 아이템들 */}
            <TextField
              fullWidth
              variant="outlined"
              value={item}
              onChange={(e) => {
                onUpdateCodeItem(index, e.target.value);
              }}
              InputProps={{ style: inputStyle }}
            />
          </ListItem>
        ))}
        <ListItem>
          {/* 결과를 표시할 리스트 아이템 */}
          <div>{newResultItemText}</div>
        </ListItem>
        {resultItems.map((item, index) => (
          <ListItem key={index}>
            {/* 결과를 표시할 리스트 아이템들 */}
            <div>{item}</div>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default TextList;

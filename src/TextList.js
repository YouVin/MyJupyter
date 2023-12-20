// TextList.js
import React, { useState } from "react";
import { List, ListItem, Paper, TextField } from "@mui/material";

function TextList({ onCodeChange, markdownResult }) {
  // const [codeItems, setCodeItems] = useState([]);
  const [newCodeItemText, setNewCodeItemText] = useState("");
  // const [resultItems, setResultItems] = useState([]);
  // const [newResultItemText, setNewResultItemText] = useState("");

  const inputStyle = {
    height: "40px",
  };
  const handleTextFieldChange = (e) => {
    const value = e.target.value;
    setNewCodeItemText(value); // 상태 업데이트
    console.log(value);
    onCodeChange(value); // 상위 컴포넌트로 값을 전달
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
            variant="outlined"
            label="Code"
            value={newCodeItemText}
            onChange={handleTextFieldChange}
            InputProps={{ style: inputStyle }}
          />
        </ListItem>
        <ListItem>
          {/* 두 번째 아이템: 변환된 마크다운 텍스트 */}
          {markdownResult}
        </ListItem>
      </List>
    </Paper>
  );
}

export default TextList;

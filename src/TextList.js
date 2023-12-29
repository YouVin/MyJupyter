import React, { useState, useEffect } from "react";
import { List, ListItem, Paper, TextField } from "@mui/material";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript"; // JavaScript 모드 임포트
import "ace-builds/src-noconflict/theme-github"; // GitHub 테마 임포트

function TextList({ onCodeChange, markdownResult, selectedLanguage }) {
  const [newCodeItemText, setNewCodeItemText] = useState("");

  const inputStyle = {
    minHeight: "40px",
    overflow: "auto",
    resize: "vertical",
  };
  useEffect(() => {
    // selectedLanguage가 변경될 때마다 newCodeItemText 초기화
    setNewCodeItemText("");
  }, [selectedLanguage]);

  //markdown 텍스트필드
  const handleTextFieldChange = (e) => {
    const value = e.target.value;
    setNewCodeItemText(value);
    onCodeChange(value);
  };
  //javascript aditor필드
  const handleEditorChange = (newValue) => {
    setNewCodeItemText(newValue);

    // AceEditor의 높이를 자동으로 조절
    const lines = newValue.split("\n").length;
    const lineHeight = 20; // 기본적인 한 줄의 높이
    const newHeight = lines * lineHeight;

    // AceEditor의 높이를 조절하기 위한 로직
    const aceEditor = document.querySelector(".ace_editor");
    if (aceEditor) {
      aceEditor.style.height = `${newHeight}px`;
    }
  };
  // selectedLanguage가 변경될 때 markdownResult 초기화

  return (
    <Paper elevation={3} style={{ padding: "16px", backgroundColor: "white" }}>
      <List>
        <ListItem>
          {/* 코드 작성할 리스트 아이템 */}
          {selectedLanguage === "markdown" ? (
            <TextField
              fullWidth
              multiline
              variant="outlined"
              label="Markdown Code"
              value={newCodeItemText}
              onChange={handleTextFieldChange}
              InputProps={{ style: inputStyle }}
            />
          ) : selectedLanguage === "javascript" ? (
            <AceEditor
              mode="javascript"
              theme="github"
              onChange={handleEditorChange}
              value={newCodeItemText}
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              setOptions={{
                showLineNumbers: true,
                tabSize: 2,
                useWorker: false,
              }}
              style={{ width: "100%", height: "16px", overflow: "hidden" }}
            />
          ) : null}
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

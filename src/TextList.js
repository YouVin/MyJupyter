import React, { useState, useEffect } from "react";
import { List, ListItem, Paper, TextField } from "@mui/material";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript"; // JavaScript 모드 임포트
import "ace-builds/src-noconflict/theme-xcode"; // xcode 테마 임포트
import "ace-builds/src-noconflict/ext-language_tools";

//isActive = 활성 여부 , onSelect = 활성된 셀
// onCodeChang = 사용자입력값
//markdownResult=결과값, selectedLanguage = 선택언어
function TextList({
  isActive,
  onSelect,
  onCodeChange,
  markdownResult,
  selectedLanguage,
}) {
  const [newCodeItemText, setNewCodeItemText] = useState("");

  //TextField css
  const inputStyle = {
    minHeight: "40px",
    overflow: "auto",
    resize: "vertical",
  };

  //드롭버튼 변경 시 작성 칸 초기화
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
    onCodeChange(newValue);
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
    <div
      className="cell-item" //셀선택및해제
      onClick={onSelect}
      style={{
        borderLeft: isActive ? "1px solid blue" : "2px solid transparent",
        borderRight: isActive ? "1px solid blue" : "2px solid transparent",
        paddingTop: "15px",
      }}
    >
      <Paper
        elevation={3}
        style={{ padding: "16px", backgroundColor: "white" }}
      >
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
                placeholder="코드를 입력해보세요"
                mode="javascript"
                theme="xcode"
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
                  enableSnippets: false,
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                }}
                style={{ width: "100%", height: "16px", overflow: "hidden" }}
              />
            ) : null}
          </ListItem>
          <ListItem style={{ padding: "10px 20px" }}>
            {<div dangerouslySetInnerHTML={{ __html: markdownResult }} />}
          </ListItem>
        </List>
      </Paper>
    </div>
  );
}

export default TextList;

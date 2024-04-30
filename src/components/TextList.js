import React, { useEffect, useRef } from "react";
import { List, ListItem, Paper } from "@mui/material";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript"; // JavaScript 모드 임포트
import "ace-builds/src-noconflict/theme-textmate"; // xcode 테마 임포트
import "ace-builds/src-noconflict/mode-html"; // HTML 모드 임포트
import "ace-builds/src-noconflict/mode-markdown"; // Markdown 모드 임포트

function TextList({
  isActive,
  onSelect,
  onCodeChange,
  markdownResult,
  selectedLanguage,
  inputText,
}) {
  const editorRef = useRef(null);

  // AceEditor의 행 수를 계산하여 높이를 설정하는 함수
  const setEditorHeight = () => {
    const lineHeight = 1.2; // 각 행의 평균 높이 (em)
    const numLines = editorRef.current.editor.session.getLength(); // AceEditor의 행 수
    const editorHeight = `${numLines * lineHeight}em`; // AceEditor의 높이 계산
    editorRef.current.editor.container.style.height = editorHeight; // 높이 설정
  };

  // AceEditor의 행 수가 변경될 때마다 높이를 설정
  useEffect(() => {
    setEditorHeight();
  }, [inputText]);

  // markdown 텍스트 변경 시
  const handleEditorChange = (newValue) => {
    onCodeChange(newValue);
  };

  return (
    <div
      onClick={onSelect}
      style={{
        borderLeft: isActive ? "1px solid blue" : "2px solid transparent",
        borderRight: isActive ? "1px solid blue" : "2px solid transparent",
      }}
    >
      <Paper
        elevation={3}
        style={{ padding: "0px ", backgroundColor: "white" }}
      >
        <List>
          <ListItem>
            {selectedLanguage === "markdown" && (
              <AceEditor
                ref={editorRef}
                placeholder="Markdown 코드를 입력하세요"
                mode="markdown"
                theme="textmate"
                value={inputText}
                fontSize={15}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 2,
                  useWorker: false,
                }}
                style={{ width: "100%", height: "50px" }}
                onChange={handleEditorChange}
              />
            )}
            {selectedLanguage === "code" && (
              <AceEditor
                ref={editorRef}
                placeholder="코드를 입력해보세요"
                mode="javascript"
                theme="textmate"
                value={inputText}
                fontSize={15}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 2,
                  useWorker: false,
                }}
                style={{ width: "100%", height: "50px" }}
                onChange={handleEditorChange}
              />
            )}
            {selectedLanguage === "html" && (
              <AceEditor
                ref={editorRef}
                placeholder="HTML 코드를 입력하세요"
                mode="html"
                theme="textmate"
                value={inputText}
                fontSize={15}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 2,
                  useWorker: false,
                }}
                style={{ width: "100%", height: "50px" }}
                onChange={handleEditorChange}
              />
            )}
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

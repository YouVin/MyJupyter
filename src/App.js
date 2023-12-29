// ...

import React, { useState } from "react";
import NotebookMenuBar from "./NotebookMenuBar";
import MenuItemComponent from "./MenuItemComponent";
import TextList from "./TextList";
import { AppBar, Container } from "@mui/material";
import TopBar from "./TopBar";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState(""); // MenuItemComponent로 전달될 상태
  const [markdownResult, setMarkdownResult] = useState(""); // 마크다운으로 변환된 결과 상태
  const [selectedLanguage, setSelectedLanguage] = useState("markdown"); // 기본값을 markdown으로 설정

  const handleCodeChange = (codeValue) => {
    setInputText(codeValue);
  };

  return (
    <Container maxWidth="lg">
      <AppBar position="static" style={{ padding: "8px 16px" }}>
        <TopBar />
      </AppBar>
      <div style={{ padding: "0px 10px", marginTop: "8px" }}>
        <NotebookMenuBar />
      </div>
      <div style={{ padding: "0px 10px" }}>
        <MenuItemComponent
          inputText={inputText}
          setMarkdownResult={setMarkdownResult}
          selectedLanguage={selectedLanguage} // selectedLanguage 전달
          setSelectedLanguage={setSelectedLanguage} // 언어 변경 함수 전달
        />
      </div>
      <div>
        <TextList
          onCodeChange={handleCodeChange}
          markdownResult={markdownResult}
          selectedLanguage={selectedLanguage} // TextList 컴포넌트에 selectedLanguage 전달
        />
      </div>
    </Container>
  );
}

export default App;

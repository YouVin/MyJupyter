// ...

import React, { useState } from "react";
import NotebookMenuBar from "./NotebookMenuBar";
import MenuItemComponent from "./MenuItemComponent";
import TextList from "./TextList";
import { AppBar, Container } from "@mui/material";
import TopBar from "./TopBar";

import "./App.css";

function App() {
  const [textItems, setTextItems] = useState([]);
  const [markdownText, setMarkdownText] = useState([]); // 마크다운 텍스트를 저장할 상태

  const addCell = (newItem) => {
    newItem = "";
    setTextItems([...textItems, newItem]);
  };

  const updateItem = (index, newValue) => {
    const updatedItems = [...textItems];
    updatedItems[index] = newValue;
    setTextItems(updatedItems);
  };

  const convertToMarkdown = () => {
    const markdownItems = textItems.map((item) => {
      // 각 항목을 마크다운으로 변환하는 로직을 작성합니다.
      // 예: 각 항목을 리스트 항목으로 만들기
      return `- ${item}`;
    });
    setMarkdownText(markdownItems); // 변환된 마크다운을 상태에 저장
  };

  return (
    <Container maxWidth="lg">
      <AppBar position="static" style={{ padding: "8px 16px" }}>
        <TopBar />
      </AppBar>
      <div style={{ padding: "0px 16px", marginTop: "8px" }}>
        <NotebookMenuBar />
      </div>
      <div style={{ padding: "0px 10px" }}>
        <MenuItemComponent
          addCell={addCell}
          convertToMarkdown={convertToMarkdown}
        />
      </div>
      <div style={{ marginTop: "16px" }}>
        <TextList
          textItems={textItems}
          onAddItem={addCell}
          onUpdateItem={updateItem}
        />
      </div>
    </Container>
  );
}

export default App;

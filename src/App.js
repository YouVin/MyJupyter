// ...

import React, { useState, useEffect } from "react";
import NotebookMenuBar from "./NotebookMenuBar";
import MenuItemComponent from "./MenuItemComponent";
import TextList from "./TextList";
import { AppBar, Container } from "@mui/material";
import TopBar from "./TopBar";
import "./App.css";

function App() {
  const [cellItems, setCellItems] = useState([{ id: 1 }]);
  const [inputText, setInputText] = useState(""); // MenuItemComponent로 전달될 상태
  const [markdownResult, setMarkdownResult] = useState(""); // 마크다운으로 변환된 결과 상태
  const [selectedLanguage, setSelectedLanguage] = useState("markdown"); // 기본값을 markdown으로 설정
  const [selectedCellId, setSelectedCellId] = useState(null); // 선택된 셀의 ID를 관리

  //셀 추가, 관리 함수
  const addCellItem = () => {
    const newId =
      cellItems.length > 0 ? cellItems[cellItems.length - 1].id + 1 : 1;
    setCellItems([...cellItems, { id: newId }]);
  };

  const handleCodeChange = (codeValue) => {
    setInputText(codeValue);
  };

  const handleCellSelect = (id) => {
    setSelectedCellId(id);
    console.log(id);
  };

  // 셀 삭제 로직
  const deleteCell = (idToDelete) => {
    if (idToDelete === null) {
      console.log("cellID = NULL");
      return; // 선택된 셀이 없을 경우 함수 종료
    }
    const updatedCells = cellItems.filter((cell) => cell.id !== idToDelete);
    setCellItems(updatedCells);
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
          addCell={addCellItem}
          deleteCell={() => deleteCell(selectedCellId)}
          inputText={inputText}
          setMarkdownResult={setMarkdownResult}
          selectedLanguage={selectedLanguage} // selectedLanguage 전달
          setSelectedLanguage={setSelectedLanguage} // 언어 변경 함수 전달
          selectedCellId={selectedCellId} // 셀 ID 전달
        />
      </div>
      <div>
        {cellItems.map((item) => (
          <TextList
            key={item.id}
            id={item.id}
            isActive={selectedCellId === item.id} // 현재 셀이 활성화된 상태인지 확인
            onCodeChange={handleCodeChange}
            markdownResult={markdownResult}
            selectedLanguage={selectedLanguage}
            onSelect={() => handleCellSelect(item.id)} //셀 선택 해제
          />
        ))}
      </div>
    </Container>
  );
}

export default App;

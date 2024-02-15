import React, { useState, useEffect } from "react";
import NotebookMenuBar from "./NotebookMenuBar";
import MenuItemComponent from "./MenuItemComponent";
import TextList from "./TextList";
import { AppBar, Container } from "@mui/material";
import TopBar from "./TopBar";
import "./App.css";
import { marked } from "marked";
import { saveAs } from "file-saver";

function App() {
  const [cellItems, setCellItems] = useState([
    { id: 1, inputText: "", markdownResult: "", selectedLanguage: "markdown" },
  ]);
  const [markdownResult, setMarkdownResult] = useState(""); // 마크다운으로 변환된 결과 상태
  const [selectedCellId, setSelectedCellId] = useState(null); // 선택된 셀의 ID를 관리

  //셀 변환 코드 실행 함수
  const handleConvertClick = (id) => {
    const selectedCell = cellItems.find((cell) => cell.id === id);
    const { inputText, selectedLanguage } = selectedCell;

    console.log("handleConvertClick called");
    console.log("Selected Cell ID:", selectedCellId);
    console.log("Selected Language:", selectedLanguage);

    if (selectedLanguage === "markdown") {
      console.log(inputText);
      const convertedMarkdown = marked(inputText, {
        breaks: true,
      });
      //cellItems 상태 업데이트 함수
      setCellItems((prevState) => {
        const updatedCellItems = prevState.map((cell) => {
          if (cell.id === id) {
            return {
              ...cell,
              markdownResult: convertedMarkdown,
            };
          }
          return cell;
        });
        return updatedCellItems;
      });
    } else if (selectedLanguage === "javascript") {
      // 셀 상태 업데이트 함수
      setCellItems((prevState) => {
        const updatedCellItems = prevState.map((cell) => {
          if (cell.id === id) {
            return {
              ...cell,
              markdownResult: eval(inputText),
            };
          }
          return cell;
        });
        return updatedCellItems;
      });
    } else if (selectedLanguage === "html") {
      try {
        const result = inputText; // HTML은 그대로 출력
        setMarkdownResult(result);

        // 셀 상태 업데이트 함수
        setCellItems((prevState) => {
          const updatedCellItems = prevState.map((cell) => {
            if (cell.id === id) {
              return {
                ...cell,
                markdownResult: result,
              };
            }
            return cell;
          });
          return updatedCellItems;
        });
      } catch (error) {
        setMarkdownResult(
          `Error occurred while processing HTML: ${error.message}`
        );
      }
    }
  };
  //셀 추가, 관리 함수
  const addCellItem = () => {
    const newId =
      cellItems.length > 0 ? cellItems[cellItems.length - 1].id + 1 : 1;
    setCellItems([
      ...cellItems,
      {
        id: newId,
        inputText: "",
        markdownResult: "",
        selectedLanguage: "markdown",
      },
    ]);
  };
  //어플리케이션 로드 시 로컬에서 데이터 가져와 셀 설정
  useEffect(() => {
    const storedCellItems = localStorage.getItem("cellItems");
    if (storedCellItems) {
      const parsedCellItems = JSON.parse(storedCellItems);
      setCellItems(parsedCellItems);
    }
  }, []);

  // 셀 저장 및 다운로드 함수
  const handleSaveAndDownloadClick = () => {
    // 사용자에게 파일 이름 입력 받기
    const fileName = window.prompt("Enter file name:");

    if (fileName) {
      // 파일 이름이 유효하다면 다운로드
      const serializedCellItems = JSON.stringify(cellItems);
      const blob = new Blob([serializedCellItems], {
        type: "application/json",
      });

      // 파일 다운로드
      saveAs(blob, `${fileName}.json`);
    }
  };

  //입력 내용 상태 업데이트 함수
  const handleCodeChange = (codeValue) => {
    //selectedCellId 활성화 설정 필수
    setCellItems((prevState) => {
      const updatedCellItems = prevState.map((cell) => {
        if (cell.id === selectedCellId) {
          return {
            ...cell,
            inputText: codeValue,
          };
        }
        return cell;
      });
      return updatedCellItems;
    });
  };

  //셀 선택 함수
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
          inputText={
            cellItems.find((cell) => cell.id === selectedCellId)?.inputText ||
            ""
          }
          setMarkdownResult={setMarkdownResult}
          selectedLanguage={
            cellItems.find((cell) => cell.id === selectedCellId)
              ?.selectedLanguage || "markdown"
          }
          setSelectedLanguage={(lang) => {
            setCellItems((prevState) => {
              const updatedCellItems = prevState.map((cell) => {
                if (cell.id === selectedCellId) {
                  return {
                    ...cell,
                    selectedLanguage: lang,
                  };
                }
                return cell;
              });
              return updatedCellItems;
            });
          }}
          selectedCellId={selectedCellId}
          handleConvertClick={() => handleConvertClick(selectedCellId)}
          handleSaveAndDownloadClick={handleSaveAndDownloadClick}
        />
      </div>
      <div>
        {cellItems.map((item) => (
          <TextList
            key={item.id}
            id={item.id}
            setMarkdownResult={setMarkdownResult}
            isActive={selectedCellId === item.id} // 현재 셀이 활성화된 상태인지 확인
            onCodeChange={handleCodeChange} // 코드 작성 내용을 업데이트
            markdownResult={item.markdownResult}
            selectedLanguage={item.selectedLanguage}
            onSelect={() => handleCellSelect(item.id)} //셀 선택 및 해제
            cellItems={cellItems} //전체 셀 목록
          />
        ))}
      </div>
    </Container>
  );
}
export default App;

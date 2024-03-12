import React, { useState } from "react";
import NotebookMenuBar from "./NotebookMenuBar";
import MenuItemComponent from "./MenuItemComponent";
import TextList from "./TextList";
import { AppBar, Container } from "@mui/material";
import TopBar from "./TopBar";
import "./App.css";
import { marked } from "marked";

function RushNote({ rushNoteState }) {
  const [cellItems, setCellItems] = useState([
    { id: 1, inputText: "", markdownResult: "", selectedLanguage: "markdown" },
  ]);
  const [markdownResult, setMarkdownResult] = useState(""); // 마크다운으로 변환된 결과 상태
  const [selectedCellId, setSelectedCellId] = useState(null); // 선택된 셀의 ID를 관리
  let pauseTimeout; // 중단 상태를 저장하는 상태 변수

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
      try {
        // 콘솔 오버라이딩
        const originalConsoleLog = console.log;
        console.log = (message) => {
          const consoleOutput = `${message}\n`; // 콘솔 출력 내용을 변수에 저장

          // Markdown으로 변환
          const convertedMarkdown = marked(consoleOutput, { breaks: true });

          // 셀 상태 업데이트
          setCellItems((prevState) => {
            const updatedCellItems = prevState.map((cell) => {
              if (cell.id === id) {
                return {
                  ...cell,
                  markdownResult: convertedMarkdown, // 콘솔 출력 내용을 결과로 저장
                };
              }
              return cell;
            });
            return updatedCellItems;
          });

          originalConsoleLog(message); // 원래의 콘솔 로그 함수 실행
        };

        // 콘솔 오버라이딩을 원래대로 복구
        console.log = originalConsoleLog;
      } catch (error) {
        console.error("Error occurred while executing JavaScript code:", error);
      }
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
  // 셀 복사 함수
  const handleCopyCell = () => {
    const selectedCell = cellItems.find((cell) => cell.id === selectedCellId);
    console.log(selectedCell.id + " 복사 !");
    if (selectedCell) {
      // 클립보드에 복사
      navigator.clipboard.writeText(selectedCell.inputText);
    }
  };

  // 셀 붙여넣기 함수
  const handlePasteCell = () => {
    navigator.clipboard.readText().then((text) => {
      const selectedCell = cellItems.find((cell) => cell.id === selectedCellId);
      if (selectedCell) {
        // 클립보드에서 읽은 텍스트를 새로운 셀로 추가
        setCellItems((prevState) => [
          ...prevState.slice(0, prevState.indexOf(selectedCell) + 1), // 선택한 셀 다음에 추가
          {
            id: prevState.length + 1,
            inputText: selectedCell.markdownResult, // 결과 값(inputText 대신 markdownResult 사용)
            markdownResult: marked(selectedCell.markdownResult, {
              breaks: true,
            }), // 마크다운으로 변환
            selectedLanguage: selectedCell.selectedLanguage, // 선택한 셀의 언어 설정 사용
          },
          ...prevState.slice(prevState.indexOf(selectedCell) + 1), // 나머지 셀들을 뒤에 추가
        ]);
      }
    });
  };

  // 셀 중단 함수
  const handlePauseCell = () => {
    const selectedCell = cellItems.find((cell) => cell.id === selectedCellId);
    if (selectedCell) {
      const pauseMessage = "중단되었습니다.";
      console.log(pauseMessage); // 중단 메시지를 콘솔에 출력

      // 이전에 설정된 setTimeout을 clearTimeout으로 중지시킵니다.
      clearTimeout(pauseTimeout);

      // 선택된 셀의 상태 업데이트
      setCellItems((prevState) => {
        const updatedCellItems = prevState.map((cell) => {
          if (cell.id === selectedCellId) {
            return {
              ...cell,
              markdownResult: pauseMessage, // 셀의 결과 메시지 업데이트
            };
          }
          return cell;
        });
        return updatedCellItems;
      });
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

  // 파일 저장 및 다운로드 함수
  const handleSaveAndDownloadClick = (fileId) => {
    // 사용자에게 파일 이름 입력 받기
    const fileName = window.prompt("Enter file name:");

    if (fileName) {
      // fileId가 객체인 경우 문자열로 변환하여 저장
      const fileIdString =
        typeof fileId === "object" ? JSON.stringify(fileId) : fileId;

      // 현재 상태를 JSON으로 변환하여 저장
      const jsonState = JSON.stringify(cellItems);
      localStorage.setItem(`file_${fileIdString}`, jsonState);
    }
  };

  // 파일 불러오기 함수
  const handleLoadClick = () => {
    const fileId = "하이"; // 불러올 파일의 ID 설정

    // 로컬 스토리지에서 데이터 불러오기
    const savedData = localStorage.getItem(`file_${fileId}`);
    if (savedData) {
      // JSON 형태의 데이터를 파싱하여 가져옴
      const parsedData = JSON.parse(savedData);
      // 가져온 데이터를 cellItems에 설정
      setCellItems(parsedData);
    } else {
      // 해당 파일이 없는 경우에 대한 처리
      console.error(`File with id ${fileId} not found.`);
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

  // 셀 재시작 함수
  const handleRestartCell = () => {
    setCellItems((prevState) => {
      // 재시작한 셀 실행
      prevState.forEach((cell) => {
        if (cell.id === selectedCellId) {
          handleConvertClick(selectedCellId);
        }
      });
      return prevState;
    });
  };

  return (
    <Container maxWidth="lg">
      <AppBar
        position="static"
        style={{ backgroundColor: "white", padding: "8px 0px" }}
      >
        <TopBar />
      </AppBar>
      <div style={{ padding: "0px 10px", marginTop: "8px" }}>
        <NotebookMenuBar />
      </div>
      {/* 불러오기 버튼 */}
      <button onClick={() => handleLoadClick("1")}>Load</button>

      <div style={{ padding: "0px 10px" }}>
        <MenuItemComponent
          addCell={addCellItem}
          handleCopyCell={handleCopyCell} // 셀 복사 함수 전달
          handlePasteCell={handlePasteCell} // 셀 붙여넣기 함수 전달
          deleteCell={() => deleteCell(selectedCellId)} // 셀 삭제 함수 전달
          handlePauseCell={handlePauseCell} // 셀 중단 함수 전달
          handleRestartCell={handleRestartCell} // 셀 재시작 함수 전달
          inputText={
            cellItems.find((cell) => cell.id === selectedCellId)?.inputText ||
            ""
          }
          setMarkdownResult={setMarkdownResult} // 초기화를 위한 결과창 함수 전달
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
export default RushNote;

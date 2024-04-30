import React, { useState, useEffect } from "react";
import NotebookMenuBar from "../components/NotebookMenuBar";
import MenuItemComponent from "../components/MenuItemComponent";
import TextList from "../components/TextList";
import {
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AppBar,
} from "@mui/material";
import { marked } from "marked";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { useMediaQuery } from "@mui/material";

function RushNote({ setSaveData }) {
  const [cellItems, setCellItems] = useState([
    {
      id: 1,
      inputText: "",
      markdownResult: "",
      selectedLanguage: "markdown",
      cellTitle: "",
    },
  ]);

  const isLargeScreen = useMediaQuery("(min-width:1100px)"); // 미디어 쿼리를 이용해 큰 화면인지 확인
  const [markdownResult, setMarkdownResult] = useState(""); // 마크다운으로 변환된 결과 상태
  const [selectedCellId, setSelectedCellId] = useState(null); // 선택된 셀의 ID를 관리
  const [savetime, setSaveTime] = useState("");
  const [accordionsExpanded, setAccordionsExpanded] = useState({}); // 아코디언 아이템의 확장 상태를 관리하는 상태 변수
  const [editingTitle, setEditingTitle] = useState(null); // 추가: 편집 중인 아이템 ID

  let pauseTimeout; // 중단 상태를 저장하는 상태 변수

  useEffect(() => {
    const storedFileContent = localStorage.getItem("openfile");
    if (storedFileContent) {
      // JSON 형태의 데이터를 파싱하여 가져옴
      const parsedData = JSON.parse(storedFileContent);
      // 가져온 데이터를 cellItems에 설정
      setCellItems(parsedData.cellItems);
      // 마지막으로 저장된 시간을 가져와서 savetime 업데이트
      const savedTime = new Date(parsedData.saveTime);
      setSaveTime(savedTime);
      setSaveData(savedTime); // 불러올 때도 savetime을 업데이트
    }
    localStorage.removeItem("openfile");
  }, []);

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
    } else if (selectedLanguage === "code") {
      try {
        let consoleOutput = ""; // 콘솔 출력 내용을 저장할 변수

        // console.log 메서드 오버라이드
        const originalLog = console.log;
        console.log = function (message) {
          consoleOutput += message + "\n"; // 출력 내용을 캡처
          originalLog.apply(console, arguments); // 원래의 console.log 메서드 호출
        };

        // 자바스크립트 코드 실행
        eval(inputText); // codeToExecute에는 실행할 자바스크립트 코드가 들어가야 합니다.

        // 콘솔 출력 내용을 markdownResult에 할당
        setCellItems((prevState) => {
          const updatedCellItems = prevState.map((cell) => {
            if (cell.id === id) {
              return {
                ...cell,
                markdownResult: consoleOutput,
              };
            }
            return cell;
          });
          return updatedCellItems;
        });

        // console.log 메서드 원복
        console.log = originalLog;
      } catch (error) {
        console.error("JavaScript 코드 실행 중 오류가 발생했습니다:", error);
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

  // 모든 셀을 변환하고 결과를 업데이트하는 함수
  const runAllCells = () => {
    cellItems.forEach((cell) => {
      handleConvertClick(cell.id); // 각 셀에 대해 변환 함수 호출
    });
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
        cellTitle: "",
      },
    ]);
  };

  // 파일 저장 함수
  const handleSaveClick = () => {
    const now = new Date();
    const cellItemCount = cellItems.length;
    const currentTitle = localStorage.getItem("title"); // 불러올 파일의 ID 설정
    console.log(currentTitle);
    if (currentTitle) {
      // 현재 상태를 JSON으로 변환하여 저장합니다.
      const jsonState = JSON.stringify({
        cellItems: cellItems,
        title: localStorage.getItem("title"),
        saveTime: now, // 현재 시간을 저장합니다.
      });
      localStorage.setItem(`${currentTitle}`, jsonState);

      setSaveTime(now);
      setSaveData(now); // savetime을 저장 데이터로 업데이트
      // 기록 남기기
      const historyItem = {
        title: currentTitle,
        cellItemCount: cellItemCount,
        saveTime: now,
      };

      // 기존에 저장된 히스토리 내용 가져오기
      const savedHistory =
        JSON.parse(localStorage.getItem("savedHistory")) || [];

      // 새로운 기록 추가
      savedHistory.push(historyItem);

      // 로컬 스토리지에 저장
      localStorage.setItem("savedHistory", JSON.stringify(savedHistory));
    }
  };

  //파일 불러오기
  const handleLoadClick = () => {
    const fileId = localStorage.getItem("title"); // 불러올 파일의 ID 설정
    console.log(fileId);

    // 로컬 스토리지에서 데이터 불러오기
    const savedData = localStorage.getItem(`${fileId}`);
    console.log("파일 " + fileId + "를 불러옵니다.");
    if (savedData) {
      // JSON 형태의 데이터를 파싱하여 가져옴
      const parsedData = JSON.parse(savedData);

      // 가져온 데이터를 cellItems에 설정
      setCellItems(parsedData.cellItems);

      // 마지막으로 저장된 시간을 가져와서 savetime 업데이트
      const savedTime = new Date(parsedData.saveTime);
      setSaveTime(savedTime);
      setSaveData(savedTime); // 불러올 때도 savetime을 업데이트
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

  // 셀 선택 함수
  const handleCellSelect = (id) => {
    setSelectedCellId(id);

    // 아코디언 아이템의 확장 상태를 토글합니다.
    setAccordionsExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
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

  // 파일 다운로드 함수
  const handleDownloadClick = () => {
    const currentTitle = localStorage.getItem("title"); // 불러올 파일의 ID 설정
    const filename = `${currentTitle}.irn`; // 파일명 설정

    const fileContent = localStorage.getItem(currentTitle); // 현재 title을 키로 사용하여 해당 값을 가져옴

    // Blob 객체 생성
    const blob = new Blob([fileContent], { type: "application/json" });

    // Blob 객체를 URL로 변환
    const url = URL.createObjectURL(blob);

    // 링크 엘리먼트 생성
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename); // 다운로드 속성 설정

    // 링크 클릭 및 URL 해제
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
  // 제목 편집 함수
  const handleTitleEdit = (id) => {
    setEditingTitle(id); // 편집 중인 아이템 ID 설정
  };

  // 제목 저장 함수
  const handleTitleSave = (id, newTitle) => {
    setCellItems((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, cellTitle: newTitle } : item
      )
    );
    setEditingTitle(null); // 편집 종료
  };

  return (
    <Container maxWidth="lg">
      <AppBar
        position="fixed"
        style={{
          marginTop: 62,
          backgroundColor: "white",
          padding: "0px 0px",
          boxShadow: "none",
          width: isLargeScreen ? "59%" : "94%", // 화면 크기에 따라 너비 조정
          marginLeft: isLargeScreen ? "19%" : "4%", // 화면 크기에 따라 왼쪽 여백 조정
          marginRight: isLargeScreen ? "20%" : "2%", // 화면 크기에 따라 오른쪽 여백 조정
        }}
      >
        <div>
          <NotebookMenuBar
            handleTitleEdit={() => handleTitleEdit(selectedCellId)}
            handlePauseCell={handlePauseCell}
            addCellItem={addCellItem}
            runAllCells={runAllCells}
            handleLoadClick={handleLoadClick}
            handleDownloadClick={handleDownloadClick}
            handleCopyCell={handleCopyCell} // 셀 복사 함수 전달
            handlePasteCell={handlePasteCell} // 셀 붙여넣기 함수 전달
            deleteCell={() => deleteCell(selectedCellId)} // 셀 삭제 함수 전달
            selectedCellId={selectedCellId}
          />
        </div>
        <div>
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
            handleSaveClick={handleSaveClick}
          />
        </div>
      </AppBar>
      <div style={{ marginTop: 180 }}>
        {cellItems.map((item) => (
          <Accordion key={item.id} onChange={() => handleCellSelect(item.id)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${item.id}-content`}
              id={`panel${item.id}-header`}
              style={{ padding: 0 }}
            >
              {editingTitle === item.id ? (
                <div style={{ width: "95%", flexShrink: 0 }}>
                  <input
                    type="text"
                    value={item.cellTitle}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      setCellItems((prevState) =>
                        prevState.map((prevItem) =>
                          prevItem.id === item.id
                            ? { ...prevItem, cellTitle: newTitle }
                            : prevItem
                        )
                      );
                    }}
                    onBlur={() => handleTitleSave(item.id, item.cellTitle)} // 포커스를 잃으면 변경 사항 저장
                    autoFocus // 자동으로 포커스
                  />
                </div>
              ) : (
                <div style={{ width: "95%", flexShrink: 0 }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span
                      style={{
                        marginLeft: isLargeScreen ? 18 : 8,
                        marginRight: 40,
                        fontWeight: 500,
                      }}
                    >
                      {item.selectedLanguage.charAt(0).toUpperCase()}
                    </span>
                    <span style={{ fontWeight: 600 }}>
                      {item.cellTitle || ""}
                    </span>
                  </div>
                </div>
              )}
              {editingTitle === item.id ? (
                <CheckIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTitleSave(item.id, item.cellTitle); // 편집 모드 종료
                  }}
                  sx={{ color: "gray" }}
                />
              ) : (
                <EditIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    editingTitle === item.id
                      ? setEditingTitle(null)
                      : handleTitleEdit(item.id); // 편집 모드 전환
                  }}
                  sx={{ color: "gray" }}
                />
              )}
            </AccordionSummary>

            <AccordionDetails>
              <TextList
                id={item.id}
                isActive={selectedCellId === item.id}
                onCodeChange={handleCodeChange}
                markdownResult={item.markdownResult}
                inputText={item.inputText}
                selectedLanguage={item.selectedLanguage}
                onSelect={() => setSelectedCellId(item.id)}
                cellItems={cellItems}
              />
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Container>
  );
}
export default RushNote;

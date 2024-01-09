import React from "react";
import { MenuItem, IconButton, Select, Toolbar } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import ReplayIcon from "@mui/icons-material/Replay";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import { marked } from "marked";

const vm = require("vm"); // vm 모듈 임포트

function MenuItemComponent({
  selectedCellId,
  deleteCell,
  inputText,
  setMarkdownResult,
  selectedLanguage,
  setSelectedLanguage,
  addCell,
}) {
  const handleConvertClick = () => {
    if (selectedLanguage === "markdown") {
      console.log(inputText);
      const convertedMarkdown = marked(inputText, {
        breaks: true, // 이 옵션을 통해 줄바꿈 문자(\n)를 <br> 태그로 변환합니다.
      });
      setMarkdownResult(convertedMarkdown);
    } else if (selectedLanguage === "javascript") {
      try {
        const context = {
          result: null,
        };
        const result = vm.runInNewContext(inputText, context);
        console.log(result);
        let formattedResult;

        if (
          typeof result === "number" ||
          typeof result === "bigint" ||
          typeof result === "boolean"
        ) {
          formattedResult = result.toString();
        } else if (typeof result === "string") {
          formattedResult = result.replace(/\n/g, "<br>");
        } else if (typeof result === "object") {
          formattedResult = JSON.stringify(result);
        } else {
          formattedResult = "Result is of unknown type";
        }
        setMarkdownResult(formattedResult);
      } catch (error) {
        setMarkdownResult(
          `Error occurred while evaluating JavaScript: ${error.message}`
        );
      }
    }
  };

  const handleLanguageChange = (newValue) => {
    setSelectedLanguage(newValue); // 선택된 언어 업데이트
    setMarkdownResult(""); // 결과 초기화
  };

  return (
    <div>
      <Toolbar>
        <IconButton
          size="small"
          variant="contained"
          color="inherit"
          style={{ backgroundColor: "white" }}
          onClick={() => {
            // 여기에 선택된 변환기를 기반으로 입력 텍스트를 처리하는 로직을 추가할 수 있습니다.
          }}
        >
          <SaveIcon sx={{ color: "gray" }} style={{ fontSize: "15px" }} />
        </IconButton>
        <IconButton
          size="small"
          variant="contained"
          color="inherit"
          style={{ backgroundColor: "white", marginLeft: "10px" }}
          onClick={addCell}
        >
          <AddIcon sx={{ color: "gray" }} style={{ fontSize: "15px" }} />
        </IconButton>
        <IconButton
          size="small"
          variant="contained"
          color="inherit"
          style={{ backgroundColor: "white", marginLeft: "10px" }}
          onClick={() => {
            // 여기에 선택된 변환기를 기반으로 입력 텍스트를 처리하는 로직을 추가할 수 있습니다.
          }}
        >
          <ContentCutIcon sx={{ color: "gray" }} style={{ fontSize: "15px" }} />
        </IconButton>
        <IconButton
          size="small"
          variant="contained"
          color="inherit"
          style={{ backgroundColor: "white", marginLeft: "10px" }}
          onClick={() => {
            // 여기에 선택된 변환기를 기반으로 입력 텍스트를 처리하는 로직을 추가할 수 있습니다.
          }}
        >
          <ContentCopyIcon
            sx={{ color: "gray" }}
            style={{ fontSize: "15px" }}
          />
        </IconButton>

        <IconButton
          size="small"
          variant="contained"
          color="inherit"
          style={{ backgroundColor: "white", marginLeft: "10px" }}
          onClick={handleConvertClick}
        >
          <PlayArrowIcon sx={{ color: "gray" }} style={{ fontSize: "15px" }} />
        </IconButton>

        <IconButton
          size="small"
          variant="contained"
          color="inherit"
          style={{ backgroundColor: "white", marginLeft: "10px" }}
          onClick={() => {
            // 여기에 선택된 변환기를 기반으로 입력 텍스트를 처리하는 로직을 추가할 수 있습니다.
          }}
        >
          <StopIcon sx={{ color: "gray" }} style={{ fontSize: "15px" }} />
        </IconButton>
        <IconButton
          size="small"
          variant="contained"
          color="inherit"
          style={{ backgroundColor: "white", marginLeft: "10px" }}
          onClick={() => {
            // 여기에 선택된 변환기를 기반으로 입력 텍스트를 처리하는 로직을 추가할 수 있습니다.
          }}
        >
          <ReplayIcon sx={{ color: "gray" }} style={{ fontSize: "15px" }} />
        </IconButton>
        <IconButton
          size="small"
          variant="contained"
          color="inherit"
          style={{ backgroundColor: "white", marginLeft: "10px" }}
          onClick={() => deleteCell(selectedCellId)}
        >
          <DeleteIcon sx={{ color: "gray" }} style={{ fontSize: "15px" }} />
        </IconButton>
        {
          <div style={{ padding: "0px 10px" }}>
            <Select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)} // handleLanguageChange 함수로 변경
              style={{ marginLeft: "10px", backgroundColor: "white" }}
            >
              <MenuItem value="markdown">Markdown</MenuItem>
              <MenuItem value="javascript">JavaScript</MenuItem>
            </Select>

            {/* 변환 버튼 */}
          </div>
        }
      </Toolbar>
    </div>
  );
}

export default MenuItemComponent;

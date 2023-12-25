import React, { useState } from "react";
import {
  Button,
  MenuItem,
  IconButton,
  Select,
  Toolbar,
  Menu,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import ReplayIcon from "@mui/icons-material/Replay";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { marked } from "marked";

function MenuItemComponent({ inputText, setMarkdownResult }) {
  const [selectedLanguage, setSelectedLanguage] = useState("markdown"); // 드롭다운에서 선택된 언어 상태

  const handleConvertClick = () => {
    // 선택된 언어에 따라 inputText를 변환
    if (selectedLanguage === "markdown") {
      const convertedMarkdown = marked(inputText);
      setMarkdownResult(convertedMarkdown);
    } else if (selectedLanguage === "javascript") {
      // 자바스크립트 변환 로직을 추가 (여기서는 간단한 예제로 표시)
      // ... (원하는 변환 로직 추가)
      setMarkdownResult(inputText); // 간단히 inputText를 설정하도록 예제로 작성
    }
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
          //onClick={props.addCell}
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
          onClick={() => {
            // 여기에 선택된 변환기를 기반으로 입력 텍스트를 처리하는 로직을 추가할 수 있습니다.
          }}
        >
          <KeyboardDoubleArrowRightIcon
            sx={{ color: "gray" }}
            style={{ fontSize: "15px" }}
          />
        </IconButton>
        {
          <div style={{ padding: "0px 10px" }}>
            <Select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
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

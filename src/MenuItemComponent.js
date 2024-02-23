import React from "react";
import { MenuItem, IconButton, Select, Toolbar } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import ReplayIcon from "@mui/icons-material/Replay";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
function MenuItemComponent({
  selectedCellId,
  deleteCell,
  setMarkdownResult,
  selectedLanguage,
  setSelectedLanguage,
  addCell,
  handleConvertClick,
  handleSaveAndDownloadClick,
  handleCopyCell,
  handlePasteCell,
  handlePauseCell,
  handleRestartCell,
}) {
  //코드 변환 시 초기화
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
          onClick={handleSaveAndDownloadClick}
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
          onClick={() => deleteCell(selectedCellId)}
        >
          <ContentCutIcon sx={{ color: "gray" }} style={{ fontSize: "15px" }} />
        </IconButton>
        <IconButton
          size="small"
          variant="contained"
          color="inherit"
          style={{ backgroundColor: "white", marginLeft: "10px" }}
          onClick={handleCopyCell}
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
          onClick={handlePasteCell}
        >
          <ContentPasteIcon
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
          onClick={handlePauseCell}
        >
          <StopIcon sx={{ color: "gray" }} style={{ fontSize: "15px" }} />
        </IconButton>
        <IconButton
          size="small"
          variant="contained"
          color="inherit"
          style={{ backgroundColor: "white", marginLeft: "10px" }}
          onClick={handleRestartCell}
        >
          <ReplayIcon sx={{ color: "gray" }} style={{ fontSize: "15px" }} />
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
              <MenuItem value="html">HTML</MenuItem>
            </Select>

            {/* 변환 버튼 */}
          </div>
        }
      </Toolbar>
    </div>
  );
}

export default MenuItemComponent;

import React from "react";
import { IconButton, Toolbar, FormControl, NativeSelect } from "@mui/material";
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
  handleCopyCell,
  handlePasteCell,
  handlePauseCell,
  handleRestartCell,
  handleSaveClick,
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
          onClick={handleSaveClick}
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
        <div style={{ marginLeft: "15px" }}>
          <FormControl>
            <NativeSelect
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              inputProps={{
                name: "language",
                id: "select-language",
              }}
              style={{ padding: "8px", minWidth: "120px" }}
            >
              <option value="markdown">Markdown</option>
              <option value="code">Code</option>
              <option value="html">HTML</option>
            </NativeSelect>
          </FormControl>
        </div>
      </Toolbar>
    </div>
  );
}

export default MenuItemComponent;

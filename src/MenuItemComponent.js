import React, { useState } from "react";
import { Button, MenuItem, IconButton, Toolbar, Menu } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import ReplayIcon from "@mui/icons-material/Replay";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function MenuItemComponent(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPage, setCurrentPage] = useState("markdown");
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(""); // 결과값 저장
  function MenuItemComponent({ onConvertToMarkdown }) {
    const [inputText, setInputText] = useState("");

    const handleConvertClick = () => {
      // 변환 버튼 클릭 시 TextList로 변환된 마크다운을 전달
      onConvertToMarkdown(inputText);
    };

    const handleInputChange = (event) => {
      setInputText(event.target.value);
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
            <ContentCutIcon
              sx={{ color: "gray" }}
              style={{ fontSize: "15px" }}
            />
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
            <PlayArrowIcon
              sx={{ color: "gray" }}
              style={{ fontSize: "15px" }}
            />
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
          {/* <div style={{ padding: "0px 10px" }}>
            {
              <Button
                aria-controls="dropdown-menu"
                aria-haspopup="true"
                variant="outlined"
                //onClick={handleClick}
                style={{
                  marginLeft: "10px",
                  padding: "0px 0px",
                  fontSize: "12px",
                  border: "none",
                  outline: "none",
                  display: "flex",
                  alignItems: "center",
                  color: "black",
                }}
                endIcon={<ArrowDropDownIcon />}
              >
                {currentPage === "markdown" ? "MarkDown" : "Code"}
              </Button>
            }
            {
              <Menu
                id="dropdown-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  value="markdown"
                  onClick={() =>
                    handlePageChange({ target: { value: "markdown" } })
                  }
                >
                  <span style={{ marginRight: "5px" }}>MarkDown</span>
                </MenuItem>
                <MenuItem
                  value="code"
                  onClick={() =>
                    handlePageChange({ target: { value: "code" } })
                  }
                >
                  <span style={{ marginRight: "5px" }}>Code</span>
                </MenuItem>
              </Menu>
            }
          </div> */}
        </Toolbar>
      </div>
    );
  }
}
export default MenuItemComponent;

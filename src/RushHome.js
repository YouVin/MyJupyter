import React, { useState, useRef } from "react";
import {
  AppBar,
  Container,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import NotebookMenuBar from "./NotebookMenuBar";
import TopBar from "./TopBar";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

const RushHome = () => {
  const [folderPath, setFolderPath] = useState("");
  const [fileList, setFileList] = useState([]);
  const fileInputRef = useRef(null); // input 요소에 접근하기 위한 ref

  const handleFolderChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const folderPath = event.target.value; // 파일 선택 input의 값은 폴더 경로가 됩니다.
      setFolderPath(folderPath);

      const fileList = Array.from(files).map((file) => file.name); // 파일 이름 목록 추출
      setFileList(fileList);
    }
  };
  const handleButtonClick = () => {
    // 파일 선택 input 클릭
    fileInputRef.current.click();
  };

  return (
    <div>
      <AppBar
        position="static"
        style={{ backgroundColor: "white", padding: "8px 0px" }}
      >
        <TopBar />
      </AppBar>
      <NotebookMenuBar />
      <h1>Rush Home</h1>
      <Button
        variant="outlined"
        startIcon={<FolderOpenIcon />}
        onClick={handleButtonClick}
      >
        폴더 불러오기
      </Button>
      <input
        type="file"
        id="folderInput"
        ref={fileInputRef}
        accept=""
        webkitdirectory="true"
        directory="true"
        onChange={handleFolderChange}
        style={{
          display: "none", // 기본 파일 선택 input 숨김
        }}
      />
      <div>
        <p>선택한 폴더 경로: {folderPath}</p>
        <List>
          {fileList.map((fileName, index) => (
            <ListItem key={index}>
              <ListItemText primary={fileName} />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default RushHome;

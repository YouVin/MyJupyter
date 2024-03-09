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
  const fileInputRef = useRef(null);

  const handleFolderPath = (event) => {
    const files = event.target.files;
    const folderp = event.target.value;
    if (files && files.length > 0) {
      const localfolderpath = folderp.substring(0, folderp.lastIndexOf("\\"));
      // 첫 번째 파일의 상대 경로에서 첫 번째 폴더 이름을 추출합니다.
      const foldername = files[0].webkitRelativePath.split("/")[0];
      console.log(files[0]);
      // 폴더 경로에 첫 번째 폴더 이름을 추가하여 설정합니다.
      setFolderPath(localfolderpath + "\\" + foldername);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Container maxWidth="lg">
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
        onChange={handleFolderPath}
        style={{
          display: "none",
        }}
      />
      <div>
        <p>선택한 폴더 경로: {folderPath}</p>
      </div>
    </Container>
  );
};

export default RushHome;

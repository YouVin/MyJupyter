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
  const fileInputRef = useRef(null);

  const handleFolderPath = (event) => {
    const files = event.target.files;
    const folderp = event.target.value;
    if (files && files.length > 0) {
      const localfolderpath = folderp.substring(0, folderp.lastIndexOf("\\"));
      // 첫 번째 파일의 상대 경로에서 첫 번째 폴더 이름을 추출합니다.
      const foldername = files[0].webkitRelativePath.split("/")[0];
      // 폴더 경로에 첫 번째 폴더 이름을 추가하여 설정합니다.
      setFolderPath(localfolderpath + "\\" + foldername);

      const filteredFiles = Array.from(files).filter((file) => {
        // 파일 경로에서 폴더 구분자의 개수를 세어 폴더 구분자가 2개 이상인 파일을 걸러냄
        const folderSeparatorsCount = (
          file.webkitRelativePath.match(/\//g) || []
        ).length;

        return folderSeparatorsCount < 2;
      });

      setFileList(filteredFiles);
      // 각 파일의 전체 경로를 콘솔에 출력
      filteredFiles.forEach((file) => {
        console.log(file.webkitRelativePath);
      });
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
        <List>
          {fileList.map((file, index) => (
            <ListItem key={index}>
              <ListItemText primary={file.name} />
            </ListItem>
          ))}
        </List>
      </div>
    </Container>
  );
};

export default RushHome;

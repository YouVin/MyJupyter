import React, { useState, useRef } from "react";
import {
  AppBar,
  Container,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import NotebookMenuBar from "./NotebookMenuBar";
import TopBar from "./TopBar";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

const RushHome = () => {
  const [folderPath, setFolderPath] = useState("");
  const [fileList, setFileList] = useState([]);
  const [folderList, setFolderList] = useState([]); //폴더 목록
  const fileInputRef = useRef(null);

  //폴더 이름 가져오기
  const extractFolderNames = (files) => {
    const folderNames = new Set();

    files.forEach((file) => {
      const relativePath = file.name;
      console.log(relativePath);
      const folderName = relativePath.split("/")[0];
      folderNames.add(folderName);
    });
    console.log(folderNames);
    return Array.from(folderNames);
  };

  const handleFolderFile = (event) => {
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
      console.log(folderp);
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
        onChange={handleFolderFile}
        style={{
          display: "none",
        }}
      />
      <div>
        <p>선택한 폴더 경로: {folderPath}</p>
        <List>
          {folderList.map((folder, index) => (
            <ListItem key={index}>
              <ListItemText primary={folder} />
            </ListItem>
          ))}
        </List>
        <TableContainer component={Paper}>
          <Table aria-label="file table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1">이름</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">날짜</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">유형</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">크기</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fileList.map((file, index) => (
                <TableRow key={index}>
                  <TableCell>{file.name}</TableCell>
                  <TableCell>
                    {file.lastModifiedDate.toLocaleString()}
                  </TableCell>
                  <TableCell>{file.type}</TableCell>
                  <TableCell>{file.size} bytes</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
};

export default RushHome;

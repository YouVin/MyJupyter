import React, { useState, useRef } from "react";
import {
  AppBar,
  Container,
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
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { Link } from "react-router-dom";
import NotebookMenuBar from "./NotebookMenuBar";
const RushHome = () => {
  const [folderPath, setFolderPath] = useState("");
  const [fileList, setFileList] = useState([]);
  const fileInputRef = useRef(null);

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

  // 새로운 파일 생성 함수
  const createNewFile = () => {
    // 현재 선택된 폴더 경로
    const currentFolderPath = folderPath;

    // 새로운 파일 이름
    const newFileName = "nonamed.irn";

    // 새로운 파일의 경로
    const newFilePath = currentFolderPath + "/" + newFileName;

    // 파일 생성 및 저장 로직
    // 이 예시에서는 브라우저의 File API를 사용하여 파일 생성하고 다운로드하는 방식으로 구현되어 있습니다.
    // 실제로는 해당 경로에 파일을 저장하는 방법에 따라 구현이 달라질 수 있습니다.
    const anchor = document.createElement("a");
    anchor.download = newFileName;
    anchor.click();
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Container maxWidth="lg">
      <NotebookMenuBar />
      <h1>Rush Home</h1>
      <Button
        variant="outlined"
        startIcon={<FolderOpenIcon />}
        onClick={handleButtonClick}
      >
        폴더 불러오기
      </Button>
      <Button variant="outlined" onClick={createNewFile}>
        <Link to="/nonamed" target="_blank">
          파일 생성하기
        </Link>
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

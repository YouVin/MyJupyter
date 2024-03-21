import React, { useState, useRef } from "react";
import {
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
  Divider,
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
      const foldername = files[0].webkitRelativePath.split("/")[0];
      setFolderPath(localfolderpath + "\\" + foldername);

      const filteredFiles = Array.from(files).filter((file) => {
        const folderSeparatorsCount = (
          file.webkitRelativePath.match(/\//g) || []
        ).length;

        return folderSeparatorsCount < 2;
      });

      setFileList(filteredFiles);
      console.log(folderp);
    }
  };

  const createNewFile = () => {
    const currentFolderPath = folderPath;
    const newFileName = "nonamed.irn";
    const newFilePath = currentFolderPath + "/" + newFileName;

    const anchor = document.createElement("a");
    anchor.download = newFileName;
    anchor.click();
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ paddingLeft: "15px" }}>
        <NotebookMenuBar notebookType="RushHome" />
      </div>
      <Divider
        sx={{
          backgroundColor: "black",
          marginLeft: "25px",
          marginRight: "25px",
        }}
      ></Divider>
      <Container style={{ flexGrow: 1, paddingTop: "10px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FolderOpenIcon style={{ marginRight: "10px" }} />
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            File
          </Typography>
          <div>
            <Button
              variant="outlined"
              onClick={createNewFile}
              style={{ marginRight: "10px" }}
            >
              <Link
                to="/nonamed"
                target="_blank"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                파일 생성하기
              </Link>
            </Button>
            <Button variant="outlined" onClick={handleButtonClick}>
              폴더 불러오기
            </Button>
          </div>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <Typography variant="body1" style={{ flexGrow: 1 }}>
            내가 따로 텍스트를 적어둘 예정
          </Typography>
          <Typography variant="body1">{folderPath}</Typography>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TableContainer component={Paper}>
            <Table aria-label="file table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "43%" }}>
                    <Typography variant="subtitle1">이름</Typography>
                  </TableCell>
                  <TableCell style={{ width: "24.5%" }}>
                    <Typography variant="subtitle1">날짜</Typography>
                  </TableCell>
                  <TableCell style={{ width: "15%" }}>
                    <Typography variant="subtitle1">유형</Typography>
                  </TableCell>
                  <TableCell style={{ width: "20%" }}>
                    <Typography variant="subtitle1">크기</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
          <div style={{ maxHeight: "65vh", overflowY: "auto" }}>
            <TableContainer component={Paper}>
              <Table aria-label="file table">
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
        </div>
      </Container>
    </div>
  );
};

export default RushHome;

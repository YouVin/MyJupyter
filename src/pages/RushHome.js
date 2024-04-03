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
  Tab,
  Tabs,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import NotebookMenuBar from "../components/NotebookMenuBar";
import HistoryPage from "./HistoryPage";

const RushHome = () => {
  const [folderPath, setFolderPath] = useState("");
  const [fileList, setFileList] = useState([]);
  const fileInputRef = useRef(null);
  const [value, setValue] = React.useState(0); //tabs

  const handleChange = (event, newValue) => {
    //tabs value change
    setValue(newValue);
  };

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
  };

  const handleButtonClick = () => {
    window.open("/nonamed", "_blank"); // 새 창으로 열기
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
      <Container style={{ flexGrow: 1, paddingTop: "20px" }}>
        <div>
          <div>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              indicatorColor="inherit"
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "white",
                },
                padding: 0.5,
                alignItems: "center",
                minHeight: 20,
                height: 25,
                minWidth: "auto",
              }}
            >
              <Tab
                icon={<FolderIcon sx={{ fontSize: 18 }} />}
                iconPosition="start"
                disableRipple
                sx={{
                  borderBottom: "none",
                  fontSize: 12,
                  fontWeight: "bold",
                  border: "1px solid",
                }}
                label="Files"
              />
              <Tab
                icon={<StopCircleIcon sx={{ fontSize: 20 }} />}
                iconPosition="start"
                disableRipple
                sx={{
                  borderBottom: "none",
                  fontWeight: "bold",
                  fontSize: 12,
                  color: "black",
                  borderRight: "1px solid",
                }}
                label="Run"
              />
            </Tabs>
            {value === 0 && (
              <div
                style={{
                  paddingLeft: "5px",
                  marginTop: "15px",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1">
                    Select items to perform actions on them.
                  </Typography>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                      variant="outlined"
                      style={{
                        padding: "8px",
                        fontSize: "10px",
                        color: "black",
                        textDecoration: "none",
                        border: "1px solid black",
                      }}
                      onClick={handleButtonClick} // 버튼 클릭 핸들러 연결
                    >
                      New
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<FolderOpenIcon />}
                      onClick={handleButtonClick}
                      style={{
                        padding: "7px",
                        fontSize: "10px",
                        color: "black",
                        border: "1px solid black", // 버튼의 테두리를 검정색으로 설정합니다.
                      }}
                    >
                      Upload
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
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    fontSize: 14,
                    color: "grey",
                    gap: "5px",
                  }}
                >
                  <FolderIcon style={{ fontSize: 15 }} />
                  <div>/</div>
                  <div>{folderPath}</div>
                </div>
              </div>
            )}
            {value === 0 && (
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TableContainer component={Paper}>
                  <Table aria-label="file table" size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{
                            width: "33%",
                            border: "1px solid rgba(169, 169, 169,0.4)",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            style={{ fontWeight: "bold", fontSize: 15 }}
                          >
                            이름
                          </Typography>
                        </TableCell>
                        <TableCell
                          style={{
                            width: "28%",
                            border: "1px solid rgba(169, 169, 169,0.4)",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            style={{ fontWeight: "bold", fontSize: 15 }}
                          >
                            날짜
                          </Typography>
                        </TableCell>
                        <TableCell
                          style={{
                            width: "14%",
                            border: "1px solid rgba(169, 169, 169,0.4)",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            style={{ fontWeight: "bold", fontSize: 15 }}
                          >
                            유형
                          </Typography>
                        </TableCell>
                        <TableCell
                          style={{
                            width: "18%",
                            border: "1px solid rgba(169, 169, 169,0.4)",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            style={{ fontWeight: "bold", fontSize: 15 }}
                          >
                            크기
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
              </div>
            )}
          </div>
          {value === 0 && (
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
          )}
        </div>
        {value === 1 && (
          <div
            style={{
              paddingLeft: "5px",
              marginTop: "15px",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            {/* History 탭의 내용 */}
            <HistoryPage />
          </div>
        )}
      </Container>
    </div>
  );
};

export default RushHome;

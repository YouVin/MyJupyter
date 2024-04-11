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
import NotebookMenuBar from "../components/NotebookMenuBar";
import PdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import HistoryPage from "./HistoryPage";
import HtmlIcon from "@mui/icons-material/Html";
import ArticleIcon from "@mui/icons-material/Article";
import HistoryIcon from "@mui/icons-material/History";

const RushHome = () => {
  const [folderPath, setFolderPath] = useState("");
  const [fileList, setFileList] = useState([]);
  const [value, setValue] = React.useState(0); //tabs
  // Upload 버튼에 대한 input 요소의 ref
  const folderInputRef = useRef(null);
  // Open 버튼에 대한 input 요소의 ref
  const fileInputRef = useRef(null);

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
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType && fileType.startsWith("image/")) {
      return <ImageIcon />;
    } else if (
      fileType &&
      fileType.startsWith("application/x-zip-compressed")
    ) {
      return <FolderIcon />;
    } else if (fileType && fileType.startsWith("application/pdf")) {
      return <PdfIcon />;
    } else if (fileType && fileType.startsWith("video/mp4")) {
      return <SmartDisplayIcon />;
    } else if (fileType && fileType.startsWith("text/html")) {
      return <HtmlIcon />;
    } else if (fileType && fileType.startsWith("text/")) {
      return <ArticleIcon />;
    }
  };

  const createNewFile = () => {
    window.open("/rushnote/nonamed", "_blank"); // 새 창으로 열기
  };

  //파일 사이즈 정리
  const formatFileSize = (bytes) => {
    if (bytes < 1000) {
      return bytes + " B";
    } else {
      return (bytes / 1000).toFixed(1) + " KB";
    }
  };

  const handleFolderButtonClick = () => {
    folderInputRef.current.click(); // 폴더를 열기 위해 Upload 버튼을 클릭할 때 실행되는 함수
  };

  const handleFileButtonClick = (event) => {
    fileInputRef.current.click(); // 파일을 열기 위해 Open 버튼을 클릭할 때 실행되는 함수
  };

  const handleFileOpenClick = (event) => {
    const selectedFile = event.target.files[0];
    const fileExtension = selectedFile.name.split(".").pop(); // 파일의 확장자 추출
    if (fileExtension !== "irn") {
      // 선택한 파일의 확장자가 .irn이 아닌 경우
      alert("올바른 파일 형식이 아닙니다. .irn 파일을 선택해주세요.");
      return; // 함수 종료
    }

    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const fileContent = JSON.parse(event.target.result);
      localStorage.setItem("openfile", JSON.stringify(fileContent)); // 파일 내용을 로컬 스토리지에 저장
      const title = fileContent.title;
      window.open(`/rushnote/${title}`, "_blank"); // RushNote를 새 창으로 열기
    };
    fileReader.readAsText(selectedFile);
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
                icon={<HistoryIcon sx={{ fontSize: 20 }} />}
                iconPosition="start"
                disableRipple
                sx={{
                  borderBottom: "none",
                  fontWeight: "bold",
                  fontSize: 12,
                  color: "black",
                  borderRight: "1px solid",
                }}
                label="History"
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
                  <Typography variant="body1" style={{ whiteSpace: "nowrap" }}>
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
                      onClick={createNewFile} // 버튼 클릭 핸들러 연결
                    >
                      New
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<FolderOpenIcon />}
                      onClick={handleFolderButtonClick}
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
                      ref={folderInputRef}
                      accept=""
                      webkitdirectory="true"
                      directory="true"
                      onChange={handleFolderFile}
                      style={{
                        display: "none",
                      }}
                    />
                    <Button
                      variant="outlined"
                      onClick={handleFileButtonClick}
                      style={{
                        padding: "8px",
                        fontSize: "10px",
                        color: "black",
                        textDecoration: "none",
                        border: "1px solid black",
                      }}
                    >
                      Open
                    </Button>
                    <input
                      type="file"
                      id="folderInput"
                      ref={fileInputRef}
                      onChange={handleFileOpenClick} // 파일 선택 이벤트 핸들러 연결
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
                  <Table
                    aria-label="file table"
                    size="small"
                    style={{ width: "100%" }}
                  >
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
            <div
              style={{ maxHeight: "65vh", overflowY: "auto", width: "100%" }}
            >
              <TableContainer component={Paper}>
                <Table aria-label="file table" size="small">
                  <TableBody>
                    {fileList.map((file, index) => (
                      <TableRow key={index}>
                        <TableCell
                          style={{ whiteSpace: "nowrap", fontSize: 12 }}
                        >
                          {getFileIcon(file.type)} {file.name}
                        </TableCell>
                        <TableCell
                          style={{ whiteSpace: "nowrap", fontSize: 12 }}
                        >
                          {file.lastModifiedDate.toLocaleString()}
                        </TableCell>
                        <TableCell
                          style={{ whiteSpace: "nowrap", fontSize: 12 }}
                        >
                          {file.type}
                        </TableCell>
                        <TableCell
                          style={{ whiteSpace: "nowrap", fontSize: 12 }}
                        >
                          {formatFileSize(file.size)}
                        </TableCell>
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

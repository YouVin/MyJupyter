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
  AppBar,
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
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useMediaQuery } from "@mui/material";

const RushHome = () => {
  const isLargeScreen = useMediaQuery("(min-width:1100px)"); // 미디어 쿼리를 이용해 큰 화면인지 확인
  const [folderPath, setFolderPath] = useState("");
  const [fileList, setFileList] = useState([]);
  const [value, setValue] = React.useState(0); //tabs
  // Upload 버튼에 대한 input 요소의 ref
  const folderInputRef = useRef(null);
  // Open 버튼에 대한 input 요소의 ref
  const fileInputRef = useRef(null);
  const data = [["이름", "날짜", "유형", "크기"]];

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
    } else {
      return (
        <img
          src="/R.png"
          alt="icon"
          style={{
            maxWidth: "20px",
            height: "auto",
          }}
        />
      );
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
      localStorage.setItem("title", title);
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
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "white",
          color: "black",
          marginTop: 80,
          boxShadow: "none",
          width: isLargeScreen ? "60%" : "93%", // 화면 크기에 따라 너비 조정
          marginLeft: isLargeScreen ? "20%" : "4%", // 화면 크기에 따라 왼쪽 여백 조정
          marginRight: isLargeScreen ? "20%" : "3%", // 화면 크기에 따라 오른쪽 여백 조정
        }}
      >
        <Divider
          sx={{
            marginTop: "10px",
            backgroundColor: "black",
            marginLeft: "40px",
            marginRight: "25px",
          }}
        />
        <div style={{ paddingLeft: "30px" }}>
          <NotebookMenuBar
            handleFileButtonClick={handleFileButtonClick}
            handleFolderButtonClick={handleFolderButtonClick}
          />
        </div>
        <Divider
          sx={{
            backgroundColor: "black",
            marginLeft: "40px",
            marginRight: "25px",
          }}
        />
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="inherit"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "white",
            },
            marginLeft: "35px",
            marginTop: "20px",
            padding: 1,
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
              marginTop: "10px",
              alignItems: "center",
              marginBottom: "15px",
              marginLeft: "35px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginRight: 20,
              }}
            >
              <Typography variant="body1" style={{ whiteSpace: "nowrap" }}>
                Select items to perform actions on them.
              </Typography>
              <div style={{ display: "flex", gap: "10px" }}>
                <Button
                  startIcon={<AddOutlinedIcon />}
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
                  startIcon={<PublishOutlinedIcon />}
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
                <Button
                  variant="outlined"
                  startIcon={<FolderOpenIcon />}
                  onClick={handleFolderButtonClick}
                  style={{
                    padding: "7px",
                    fontSize: "10px",
                    color: "black",
                    border: "1px solid black", // 버튼의 테두리를 검정색으로 합니다.
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
              </div>
            </div>
            <div
              style={{
                marginTop: "15px",
                marginLeft: "5px",
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
      </AppBar>
      <Container
        style={{ flexGrow: 1, marginTop: value === 0 ? "260px" : "160px" }}
      >
        <div>
          {value === 0 && (
            <div
              style={{
                marginLeft: isLargeScreen ? 5 : 15,
                width: "100%",
                maxHeight: "70vh",
                overflowY: "auto",
              }}
            >
              <TableContainer component={Paper}>
                <Table aria-label="file table" size="small">
                  <TableHead>
                    {data.map((item, index) => (
                      <TableRow key={index}>
                        {Object.values(item).map((value, innerIndex) => (
                          <TableCell
                            key={innerIndex}
                            style={{
                              border: "1px solid rgba(169, 169, 169,0.4)",
                              backgroundColor: "#fff",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              style={{ fontWeight: "bold", fontSize: 15 }}
                            >
                              {value}
                            </Typography>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableHead>
                  <TableBody>
                    {fileList.map((file, index) => (
                      <React.Fragment key={index}>
                        <TableRow>
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
                      </React.Fragment>
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
              marginLeft: isLargeScreen ? 15 : 25,
              paddingLeft: "5px",
              marginTop: "30px",
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

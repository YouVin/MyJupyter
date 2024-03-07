import React, { useState } from "react";
import { AppBar, Container, Typography, Grid, Button } from "@mui/material";
import TopBar from "./TopBar";
import NotebookMenuBar from "./NotebookMenuBar";
import { Link } from "react-router-dom";

function RushHome() {
  const [selectedDirectories, setSelectedDirectories] = useState([]);
  const [filesByDirectory, setFilesByDirectory] = useState({});

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedDirectories(files);

      const updatedFilesByDirectory = {};
      for (const file of files) {
        const directoryPath = file.webkitRelativePath
          .split("/")
          .slice(0, -1)
          .join("/"); // 디렉터리 경로 추출

        if (!updatedFilesByDirectory[directoryPath]) {
          updatedFilesByDirectory[directoryPath] = [];
        }

        updatedFilesByDirectory[directoryPath].push(file);
      }
      setFilesByDirectory(updatedFilesByDirectory);
    } else {
      setSelectedDirectories([]);
      setFilesByDirectory({});
    }
  };

  const handleButtonClick = () => {
    // 새로운 경로로 이동
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
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <input
            type="file"
            directory="true"
            webkitdirectory="true"
            multiple
            onChange={handleFileInputChange}
          />
        </Grid>
        <Grid item>
          <button>
            <Link to="/Untitled.irn" target="_blank">
              Go to App
            </Link>
          </button>
        </Grid>
      </Grid>
      {selectedDirectories.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h5">Selected Folder</Typography>
          {Object.entries(filesByDirectory).map(([directoryPath, files]) => (
            <div key={directoryPath}>
              <Typography>{`Directory: ${directoryPath}`}</Typography>
              <ul>
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}

export default RushHome;

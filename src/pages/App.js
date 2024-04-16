import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RushHome from "./RushHome";
import RushNote from "./RushNote";
import TopBar from "../components/TopBar";
import { AppBar, Container } from "@mui/material";
import { useMediaQuery } from "@mui/material";

function App() {
  const [lastExecutionTime, setLastExecutionTime] = useState(null);
  const [savetime, setSaveTime] = useState(""); // savetime 상태 추가
  const isLargeScreen = useMediaQuery("(min-width:1100px)"); // 미디어 쿼리를 이용해 큰 화면인지 확인

  const handleSetTimeData = (time) => {
    setLastExecutionTime(time);
    setSaveTime(time); // savetime 업데이트
  };

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <AppBar
          position="fixed"
          style={{
            backgroundColor: "white",
            padding: "0px 0px",
            boxShadow: "none",
            width: isLargeScreen ? "60%" : "93%", // 화면 크기에 따라 너비 조정
            marginLeft: isLargeScreen ? "20%" : "4%", // 화면 크기에 따라 왼쪽 여백 조정
            marginRight: isLargeScreen ? "20%" : "3%", // 화면 크기에 따라 오른쪽 여백 조정
          }}
        >
          <TopBar
            handleSetTimeData={handleSetTimeData}
            savetime={savetime} // savetime 전달
            setSaveTime={setSaveTime}
          />
        </AppBar>

        <Routes>
          <Route path="/" element={<Navigate to="/rushhome" />} />
          <Route path="/rushhome" element={<RushHome />} />
          <Route
            path={"/rushnote/:title"}
            element={<RushNote setSaveData={setSaveTime} />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;

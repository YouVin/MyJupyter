import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RushHome from "./RushHome";
import RushNote from "./RushNote";
import TopBar from "../components/TopBar";
import { AppBar, Container } from "@mui/material";

function App() {
  const [lastExecutionTime, setLastExecutionTime] = useState(null);
  const [savetime, setSaveTime] = useState(""); // savetime 상태 추가

  const handleSetTimeData = (time) => {
    setLastExecutionTime(time);
    setSaveTime(time); // savetime 업데이트
  };

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <AppBar
          position="static"
          style={{
            backgroundColor: "white",
            padding: "0px 0px",
            boxShadow: "none",
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

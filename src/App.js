// App 컴포넌트
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RushHome from "./RushHome";
import RushNote from "./RushNote";
import TopBar from "./TopBar";
import { AppBar, Container } from "@mui/material";

function App() {
  const [currentTitle, setCurrentTitle] = useState("Nonamed");

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <AppBar
          position="static"
          style={{ backgroundColor: "white", padding: "8px 0px" }}
        >
          <TopBar defaultTitle={currentTitle} onTitleChange={setCurrentTitle} />
        </AppBar>
        <Routes>
          <Route path="/" element={<RushHome />} />
          <Route
            path={"/nonamed"}
            element={<RushNote currentTitle={currentTitle} />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from "react";
import {
  Popover,
  Typography,
  List,
  ListItem,
  Button,
  Paper,
} from "@mui/material";

const buttonStyle = {
  textTransform: "none",
  cursor: "pointer",
  color: "black",
};

const popoverPaperStyle = {
  cursor: "default", // 팝업 창에 마우스를 가져다 대면 손바닥 모양으로 변경
};

const menuItems = {
  File: ["New", "Open", "Save"],
  Edit: ["Cut", "Copy", "Paste"],
  View: ["Zoom In", "Zoom Out", "Full Screen"],
  Run: ["Run All", "Run Selected", "Stop"],
  Kernel: ["Change Kernel", "Restart Kernel", "Shutdown Kernel"],
  Settings: ["General Settings", "User Preferences"],
  Help: ["Documentation", "About"],
};

function NotebookMenuBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorLabel, setAnchorLabel] = useState(null);

  const handleButtonClick = (event, label) => {
    setAnchorLabel(label);
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item) => {
    // 클릭 이벤트 처리
    console.log(`Clicked: ${item}`);
  };

  return (
    <div>
      {Object.keys(menuItems).map((label, index) => (
        <Button
          key={index}
          style={buttonStyle}
          onMouseEnter={(e) => handleButtonClick(e, label)}
        >
          {label}
        </Button>
      ))}

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Paper style={popoverPaperStyle}>
          <List>
            {menuItems[anchorLabel]?.map((item, index) => (
              <ListItem key={index} onClick={() => handleMenuItemClick(item)}>
                <Typography>{item}</Typography>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Popover>
    </div>
  );
}

export default NotebookMenuBar;

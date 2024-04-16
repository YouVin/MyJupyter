import React, { useState } from "react";
import {
  Typography,
  List,
  ListItemButton,
  Button,
  Popover,
  Paper,
} from "@mui/material";
import AlertDialog from "./RushVersion"; // Alert 다이얼로그 컴포넌트를 import

function NotebookMenuBar({
  handleLoadClick,
  handleDownloadClick,
  handleCopyCell,
  handlePasteCell,
  deleteCell,
  selectedCellId,
  handleFileButtonClick,
  handleFolderButtonClick,
}) {
  const [open, setOpen] = useState(false); // 다이얼로그를 열기 위한 상태
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorLabel, setAnchorLabel] = useState(null);
  const disabledMenuItemsForRushHome = [
    "Save",
    "Download",
    "Cut Cell",
    "Copy Cell",
    "Paste Cell",
    "Zoom In",
  ]; // RushHome에서 비활성화 할 항목

  const getMenuItemsForCurrentPath = () => {
    const menuItems = getMenuItems(); // getMenuItems 호출
    if (window.location.pathname === "/rushhome") {
      return Object.keys(menuItems)
        .filter((label) => !disabledMenuItemsForRushHome.includes(label))
        .reduce((acc, label) => {
          acc[label] = menuItems[label];
          return acc;
        }, {});
    } else if (window.location.pathname.startsWith("/rushnote")) {
      return menuItems;
    }
    return {};
  };

  const createNewFile = () => {
    window.open("/rushnote/nonamed", "_blank"); // 새 창으로 열기
  };

  const getMenuItems = () => {
    if (window.location.pathname === "/rushhome") {
      return {
        File: ["New", "Open File", "Upload", "Save", "Download"],
        View: ["FullScreen Toggle", "Header Toggle"],
        Settings: ["Theme", "Language", "User Preferences"],
        Help: ["Rush Version", "About Rush", "Markdown Reference"],
      };
    } else {
      return {
        File: ["New", "Open", "Save", "Download"],
        Edit: ["Cut Cell", "Copy Cell", "Paste Cell", "Undo", "Redo"],
        Run: ["Run Selected Cell"],
        Settings: ["General Settings", "User Preferences"],
        Help: ["Rush Version", "About Rush", "Markdown Reference"],
      };
    }
  };
  const fullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };
  const markDownRef = () => {
    window.open("https://commonmark.org/help/", "_blank");
  };
  const aboutRush = () => {
    window.open("https://github.com/YouVin/MyJupyter", "_blank");
  };

  const handleButtonClick = (event, label) => {
    setAnchorLabel(label);
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item) => {
    console.log(`Clicked: ${item}`);
    if (item === "Download") {
      handleDownloadClick();
    } else if (item === "Open") {
      handleLoadClick();
    } else if (item === "Cut Cell") {
      deleteCell(selectedCellId);
    } else if (item === "Copy Cell") {
      handleCopyCell();
    } else if (item === "Paste Cell") {
      handlePasteCell();
    } else if (item === "New") {
      createNewFile();
    } else if (item === "Open File") {
      handleFileButtonClick();
    } else if (item === "Upload") {
      handleFolderButtonClick();
    } else if (item === "Markdown Reference") {
      markDownRef();
    } else if (item === "About Rush") {
      aboutRush();
    } else if (item === "Rush Version") {
      setOpen(true);
    } else if (item === "FullScreen Toggle") {
      fullScreen();
    } else if (item === "Header Toggle") {
    }
    setAnchorEl(null);
  };

  return (
    <div>
      {Object.keys(getMenuItemsForCurrentPath()).map((label, index) => (
        <Button
          key={index}
          variant="text"
          onMouseEnter={(e) => handleButtonClick(e, label)}
          aria-haspopup="true"
          style={{ color: "#000000" }}
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
        slotProps={{ paper: { style: { maxWidth: "300px" } } }}
      >
        <Paper>
          <List>
            {getMenuItemsForCurrentPath()[anchorLabel]?.map((item, index) => (
              <ListItemButton
                key={index}
                onClick={() => handleMenuItemClick(item)}
                disabled={
                  window.location.pathname === "/rushhome" &&
                  disabledMenuItemsForRushHome.includes(item)
                }
              >
                <Typography>{item}</Typography>
              </ListItemButton>
            ))}
          </List>
        </Paper>
      </Popover>

      {anchorEl && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: -1,
            maxWidth: "200",
          }}
          onClick={handleClosePopover}
        />
      )}
      <AlertDialog open={open} handleClose={() => setOpen(false)} />
    </div>
  );
}

export default NotebookMenuBar;

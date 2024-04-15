import React, { useState } from "react";
import {
  Typography,
  List,
  ListItemButton,
  Button,
  Popover,
  Paper,
} from "@mui/material";

function NotebookMenuBar({
  handleLoadClick,
  handleDownloadClick,
  handleCopyCell,
  handlePasteCell,
  deleteCell,
  selectedCellId,
}) {
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

  const getMenuItems = () => {
    if (window.location.pathname === "/rushhome") {
      return {
        File: ["New", "Open", "Save", "Download"],
        Settings: ["General Settings", "User Preferences"],
        Help: ["Documentation", "About"],
      };
    } else {
      return {
        File: ["New", "Open", "Save", "Download"],
        Edit: ["Cut Cell", "Copy Cell", "Paste Cell", "Undo", "Redo"],
        Run: ["Run Selected Cell"],
        Settings: ["General Settings", "User Preferences"],
        Help: ["Documentation", "About"],
      };
    }
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
    </div>
  );
}

export default NotebookMenuBar;

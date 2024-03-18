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
  notebookType,
  handleCopyCell,
  handlePasteCell,
  deleteCell,
  selectedCellId,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorLabel, setAnchorLabel] = useState(null);

  const allMenuItems = {
    File: ["New", "Open", "Save", "Download"],
    Edit: ["Cut Cell", "Copy Cell", "Paste Cell", "Undo", "Redo"],
    View: ["Zoom In", "Zoom Out", "Full Screen"],
    Run: ["Run All", "Run Selected", "Stop"],
    Kernel: ["Change Kernel", "Restart Kernel", "Shutdown Kernel"],
    Settings: ["General Settings", "User Preferences"],
    Help: ["Documentation", "About"],
  };

  const disabledMenuItemsForRushHome = [
    "Save",
    "Download",
    "Cut Cell",
    "Copy Cell",
    "Paste Cell",
    "Zoom In",
  ]; // RushHome에서 비활성화 할 항목

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

  const getMenuItems = () => {
    if (anchorLabel && allMenuItems[anchorLabel]) {
      return allMenuItems[anchorLabel];
    }
    return [];
  };

  return (
    <div>
      {Object.keys(allMenuItems).map((label, index) => (
        <Button
          key={index}
          variant="text"
          onMouseEnter={(e) => handleButtonClick(e, label)}
          disabled={
            !notebookType ||
            (notebookType === "RushHome" &&
              disabledMenuItemsForRushHome.includes(label))
          }
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
            {getMenuItems().map((item, index) => (
              <ListItemButton
                key={index}
                onClick={() => handleMenuItemClick(item)}
                disabled={
                  notebookType === "RushHome" &&
                  disabledMenuItemsForRushHome.includes(item)
                }
                style={{
                  backgroundColor: notebookType === "RushNote" ? "white" : "",
                }}
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
          }}
          onClick={handleClosePopover}
        />
      )}
    </div>
  );
}

export default NotebookMenuBar;

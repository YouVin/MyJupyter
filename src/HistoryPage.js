import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadAllDataFromLocalStorage = () => {
      const allData = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
        allData.push({ key, ...value });
      }
      return allData;
    };

    // 모든 데이터 불러오기
    const allData = loadAllDataFromLocalStorage();
    console.log(allData);

    setHistory(allData);
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>저장한 title 이름</TableCell>
              <TableCell>저장된 날짜</TableCell>
              <TableCell>저장된 내용</TableCell>
              <TableCell>활동중</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.key}</TableCell>
                <TableCell>{item.saveTime}</TableCell>
                <TableCell>
                  {item.cellItems &&
                    item.cellItems.map((cell, cellIndex) => (
                      <div key={cellIndex}>
                        inputText: {cell.inputText}, markdownResult:{" "}
                        {cell.markdownResult}, selectedLanguage:{" "}
                        {cell.selectedLanguage}
                      </div>
                    ))}
                </TableCell>
                <TableCell>{item.isActive ? "TRUE" : "FALSE"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HistoryPage;

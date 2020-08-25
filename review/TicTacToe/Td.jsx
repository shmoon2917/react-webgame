import React, { useCallback, memo } from "react";
import { ACTION } from "./TicTacToe";

const Td = memo(({ rowIndex, cellIndex, cellData, dispatch }) => {
  console.log("Td rendered");
  const clickTdHandler = useCallback(() => {
    console.log("clickTdHandler", rowIndex, cellIndex, cellData);
    if (cellData) {
      return;
    }

    dispatch({ type: ACTION.CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);

  return <td onClick={clickTdHandler}>{cellData}</td>;
});

export default Td;

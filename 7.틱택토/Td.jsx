import React, { memo, useCallback, useEffect, useRef } from "react";
import { CLICK_CELL } from "./TicTacToe";

const Td = memo(({ rowIndex, cellIndex, cellData, dispatch }) => {
  // const ref = useRef([]);
  // useEffect(() => {
  //   console.log(cellData, ref.current[3]);
  //   ref.current = [rowIndex, cellIndex, dispatch, cellData];
  // }, [rowIndex, cellIndex, dispatch, cellData]);

  const onClickTd = useCallback(() => {
    if (cellData) {
      return;
    }
    console.log(rowIndex, cellIndex);
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);

  return <td onClick={onClickTd}>{cellData}</td>;
});

export default Td;

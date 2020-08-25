import React, { useReducer, useEffect, memo } from "react";
import Table from "./Table";

const initialState = {
  winner: "",
  turn: "O",
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  recentCell: [-1, -1],
};

export const ACTION = {
  CLICK_CELL: "CLICK_CELL",
  CHANGE_TURN: "CHANGE_TURN",
  SET_WINNER: "SET_WINNER",
  RESET_GAME: "RESET_GAME",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.CLICK_CELL:
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    case ACTION.CHANGE_TURN:
      return {
        ...state,
        turn: state.turn === "O" ? "X" : "O",
      };
    case ACTION.SET_WINNER:
      return {
        ...state,
        winner: action.winner,
      };
    case ACTION.RESET_GAME:
      return {
        ...state,
        tableData: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        turn: "O",
        recentCell: [-1, -1],
      };

    default:
      return false;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, winner, recentCell, turn } = state;

  console.log("TicTacToe rendered");

  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) return;

    const win = isWin(row, cell);
    if (win) {
      dispatch({ type: ACTION.SET_WINNER, winner: turn });
      dispatch({ type: ACTION.RESET_GAME });
    } else {
      let isTie = true;
      tableData.forEach((row) => {
        row.forEach((cell) => {
          if (!cell) isTie = false;
        });
      });

      if (isTie) dispatch({ type: ACTION.RESET_GAME });
      else dispatch({ type: ACTION.CHANGE_TURN });
    }
  }, [recentCell]);

  const isWin = (row, cell) => {
    let win = false;
    if (
      tableData[row][0] === turn &&
      tableData[row][1] === turn &&
      tableData[row][2] === turn
    ) {
      win = true;
    } else if (
      tableData[0][cell] === turn &&
      tableData[1][cell] === turn &&
      tableData[2][cell] === turn
    ) {
      win = true;
    } else if (
      tableData[0][0] === turn &&
      tableData[1][1] === turn &&
      tableData[2][2] === turn
    ) {
      win = true;
    } else if (
      tableData[0][2] === turn &&
      tableData[1][1] === turn &&
      tableData[2][0] === turn
    ) {
      win = true;
    }
    return win;
  };

  return (
    <>
      <Table tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner} 의 승리!</div>}
    </>
  );
};

export default TicTacToe;

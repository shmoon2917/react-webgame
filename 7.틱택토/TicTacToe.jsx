import React, {
  useState,
  useRef,
  useEffect,
  useReducer,
  useCallback,
} from "react";
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

export const SET_WINNER = "SET_WINNER"; // action 의 이름은 대문자로 하는게 암묵적 규칙
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "CHANGE_TURN";
export const RESET_GAME = "RESET_GAME";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      // state.winner = action.winner; 이렇게 하면 안됨.
      return {
        ...state,
        winner: action.winner,
      };
    case CLICK_CELL:
      const tableData = [...state.tableData]; // 얕은 복사
      tableData[action.row] = [...tableData[action.row]]; // 나중에 immer 라는 라이브러리로 가독성 문제 해결
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === "O" ? "X" : "O",
      };
    }
    case RESET_GAME: {
      return {
        ...state,
        tableData: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        recentCell: [-1, -1],
      };
    }
    default:
      return false;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;

  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) {
      return;
    }

    let win = false;
    if (
      tableData[row][0] === turn &&
      tableData[row][1] === turn &&
      tableData[row][2] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][cell] === turn &&
      tableData[1][cell] === turn &&
      tableData[2][cell] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][0] === turn &&
      tableData[1][1] === turn &&
      tableData[2][2] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][2] === turn &&
      tableData[1][1] === turn &&
      tableData[2][0] === turn
    ) {
      win = true;
    }
    if (win) {
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
    } else {
      let all = true; // all 이 true면 무승부라는 뜻
      tableData.forEach((row) => {
        row.forEach((cell) => {
          if (!cell) {
            all = false;
          }
        });
      });
      if (all) {
        dispatch({ type: RESET_GAME });
      } else {
        dispatch({ type: CHANGE_TURN });
      }
    }
  }, [recentCell]);

  const clickTableHandler = useCallback(() => {
    dispatch({ type: "SET_WINNER", winner: "O" });
  }, []);

  return (
    <>
      <Table tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리</div>}
    </>
  );
};

export default TicTacToe;

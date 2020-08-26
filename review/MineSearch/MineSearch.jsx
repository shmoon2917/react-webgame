import React, { createContext, useReducer, useMemo, useEffect } from "react";
import Form from "./Form";
import Table from "./Table";

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  FLAG: -2,
  QUESTION: -3,
  FLAG_MINE: -4,
  QUESTION_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0,
  AFTER_MINE: -8,
  AFTER_FLAG_QUESTION: -9,
};

export const TableContext = createContext({
  tableData: [],
  halted: true,
  dispatch: () => {},
});

const plantMine = (row, cell, mine) => {
  const candidate = Array(row * cell)
    .fill()
    .map((arr, i) => i);
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    shuffle.push(chosen);
  }
  const tableData = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    tableData.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  const mineCoords = [];
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    tableData[ver][hor] = CODE.MINE;
    mineCoords.push([ver, hor]);
  }

  return { tableData, mineCoords };
};

export const START_GAME = "START_GAME";
export const OPEN_CELL = "OPEN_CELL";
export const CLICK_MINE = "CLICK_MINE";
export const FLAG_CELL = "FLAG_CELL";
export const QUESTION_CELL = "QUESTION_CELL";
export const NORMALIZE_CELL = "NORMALIZE_CELL";
export const INCREMENT_TIMER = "INCREMENT_TIMER";

const initialState = {
  tableData: [],
  coordData: {
    mines: [],
    flags: [],
    questions: [],
  },
  timer: 0,
  halted: true,
  result: "",
  openedCount: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      const { tableData, mineCoords } = plantMine(
        action.row,
        action.cell,
        action.mine
      );
      return {
        ...state,
        tableData,
        coordData: {
          mines: mineCoords,
          flags: [],
          questions: [],
        },
        halted: false,
        openedCount: 0,
        timer: 0,
      };
    case OPEN_CELL: {
      const tableData = [...state.tableData];
      tableData.forEach((row, i) => (tableData[i] = [...state.tableData[i]]));

      const checked = [];
      let openedCount = 0;

      const checkAround = (row, cell) => {
        if (checked.includes(`${row},${cell}`)) {
          // 한 번 연 칸은 무시하기
          return;
        } else {
          checked.push(`${row},${cell}`);
        }

        let around = [];
        if (tableData[row - 1]) {
          around = around.concat(
            tableData[row - 1][cell - 1],
            tableData[row - 1][cell],
            tableData[row - 1][cell + 1]
          );
        }
        around = around.concat(
          tableData[row][cell - 1],
          tableData[row][cell + 1]
        );
        if (tableData[row + 1]) {
          around = around.concat(
            tableData[row + 1][cell - 1],
            tableData[row + 1][cell],
            tableData[row + 1][cell + 1]
          );
        }
        const count = around.filter((v) =>
          [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)
        ).length;

        if (count === 0) {
          // 지뢰 없으면 주변 칸들 오픈
          const near = [];
          if (row - 1 > -1) {
            near.push([row - 1, cell - 1]);
            near.push([row - 1, cell]);
            near.push([row - 1, cell + 1]);
          }
          near.push([row, cell - 1]);
          near.push([row, cell + 1]);
          if (row + 1 < tableData.length) {
            near.push([row + 1, cell - 1]);
            near.push([row + 1, cell]);
            near.push([row + 1, cell + 1]);
          }
          near.forEach((n) => {
            if (
              tableData[n[0]][n[1]] !== undefined &&
              tableData[n[0]][n[1]] !== CODE.OPENED
            ) {
              checkAround(n[0], n[1]);
            }
          });
        }

        if (tableData[row][cell] === CODE.NORMAL) {
          openedCount += 1;
        }
        tableData[row][cell] = count;
      };
      checkAround(action.row, action.cell);
      let halted = false;
      let result = "";

      console.log(
        tableData.length * tableData[0].length - state.coordData.mines.length,
        state.openedCount,
        openedCount
      );

      if (
        tableData.length * tableData[0].length -
          state.coordData.mines.length ===
        state.openedCount + openedCount
      ) {
        // 승리
        halted = true;
        result = `${state.timer} 초 만에 승리하셨습니다`;
      }
      return {
        ...state,
        tableData,
        openedCount: state.openedCount + openedCount,
        halted,
        result,
      };
    }
    case CLICK_MINE: {
      console.log(state);
      const tableData = [...state.tableData];
      tableData.forEach((row, i) => (tableData[i] = [...state.tableData[i]]));

      // 지뢰 보여주기
      state.coordData.mines.forEach((coord, i) => {
        tableData[coord[0]][coord[1]] = CODE.AFTER_MINE;
      });

      state.coordData.flags.forEach((coord, i) => {
        if (tableData[coord[0]][coord[1]] === CODE.FLAG) {
          tableData[coord[0]][coord[1]] = CODE.AFTER_FLAG_QUESTION;
        }
      });

      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        result: "졌습니다. 다시 시작하세요",
        halted: true,
      };
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
        coordData: {
          mines: [...state.coordData.mines],
          flags: [...state.coordData.flags, [action.row, action.cell]],
          questions: [...state.coordData.questions],
        },
      };
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE;
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      };
    }
    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
      };
    }
    default:
      return;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, halted, result, timer } = state;
  const value = useMemo(() => ({ tableData, dispatch, halted }), [
    tableData,
    halted,
  ]);

  useEffect(() => {
    let timer;
    if (!halted) {
      timer = setInterval(() => {
        dispatch({ type: INCREMENT_TIMER });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [halted]);

  return (
    <TableContext.Provider value={value}>
      <Form />
      <Table />
      <div>{timer}</div>
      <div>{result}</div>
    </TableContext.Provider>
  );
};

export default MineSearch;

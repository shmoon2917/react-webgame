import React, { Component } from "react";
import ResponseCheck from "./ResponseCheck/ResponseCheckHooks";
import TicTacToe from "./TicTacToe/TicTacToe";
import Lotto from "./Lotto/LottoHooks";
import RSP from "./RSP/RSPHooks";
import MineSearch from "./MineSearch/MineSearch";

const GameMatcher = (props) => {
  const {
    match: {
      params: { name },
    },
  } = props;

  // const urlSearchParams = new URLSearchParams(props.location.search.slice(1));
  // console.log(urlSearchParams.get("hello"));

  const matchGame = (name) => {
    console.log("match the games");
    if (name === "response-check") {
      return <ResponseCheck />;
    } else if (name === "rsp") {
      return <RSP />;
    } else if (name === "lotto-generator") {
      return <Lotto />;
    } else if (name === "tictactoe") {
      return <TicTacToe />;
    } else if (name === "mine-finder") {
      return <MineSearch />;
    }

    return <div>게임을 선택하세요.</div>;
  };

  return matchGame(name);
};
export default GameMatcher;

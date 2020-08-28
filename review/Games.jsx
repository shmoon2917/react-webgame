import React from "react";
import { Route, BrowserRouter, Link, Switch } from "react-router-dom";
import GameMatcher from "./GameMatcher";

const Games = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to="/game/response-check?hello=30">반응속도체크</Link>&nbsp;
        <Link to="/game/rsp">가위바위보</Link>&nbsp;
        <Link to="/game/lotto-generator">로또 추첨기</Link>&nbsp;
        <Link to="/game/tictactoe">틱택토</Link>&nbsp;
        <Link to="/game/mine-finder">지뢰찾기</Link>
      </div>
      <div>
        <Route exact path="/" component={GameMatcher} />
        <Route path="/game/:name" component={GameMatcher} />
      </div>
    </BrowserRouter>
  );
};

export default Games;

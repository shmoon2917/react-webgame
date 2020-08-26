import React from "react";
import {
  BrowserRouter,
  HashRouter,
  Route,
  Link,
  Switch,
} from "react-router-dom";
import GameMatcher from "./GameMatcher";

const Games = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to="/game/tictactoe">틱택토</Link>
        &nbsp;
        <Link to="/game/rock-scissors-paper">가위바위보</Link>
        &nbsp;
        <Link to="/game/lotto-generator">로또 추첨기</Link>
        &nbsp;
        <Link to="/game/mine-finder">지뢰 찾기</Link>
      </div>

      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <GameMatcher {...props} />}
          />
          <Route
            path="/game/:name"
            render={(props) => <GameMatcher {...props} />}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Games;

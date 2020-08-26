import React, { Component } from "react";
//import { withRouter } from 'react-router-dom';

import TicTacToe from "../review/TicTacToe/TicTacToe";
import RSP from "../review/RSP/RSP";
import Lotto from "../review/Lotto/Lotto";
import MineSearch from "./MineSearch";

class GameMatcher extends Component {
  render() {
    console.log(this.props);
    // let urlSearchParams = new URLSearchParams(
    //   this.props.location.search.slice(1)
    // );
    // console.log(urlSearchParams.get("hello"));

    if (this.props.match.params.name === "tictactoe") {
      return <NumberBaseball />;
    } else if (this.props.match.params.name === "rock-scissors-paper") {
      return <RSP />;
    } else if (this.props.match.params.name === "lotto-generator") {
      return <Lotto />;
    } else if (this.props.match.params.name === "mine-finder") {
      return <MineSearch />;
    }

    return <div>일치하는 게임이 없습니다.</div>;
  }
}

// export default withRouter(GameMatcher);
export default GameMatcher;

import React, { Component } from "react";

class Try extends Component {
  // constructor(props) {
  //   super(props);
  //   // 다른 동작 구현 가능
  //   this.state = {
  //     result: this.props.result,
  //     try: this.props.try,
  //   };
  // }

  render() {
    const { tryInfo } = this.props;
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    );
  }
}

export default Try;

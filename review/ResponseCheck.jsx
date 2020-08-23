import React, { Component, PureComponent } from "react";

class ResponseAverageTime extends PureComponent {
  render() {
    console.log("render response average time");
    const { result, onClickReset } = this.props;
    return (
      result.length !== 0 && (
        <>
          <div>
            평균 시간: {result.reduce((a, c) => a + c) / result.length} ms
          </div>
          <button onClick={onClickReset}>reset</button>
        </>
      )
    );
  }
}

class ResponseScreen extends PureComponent {
  render() {
    const { status, message, onClickScreen } = this.props;
    console.log("render response screen");
    return (
      <div id="screen" className={status} onClick={onClickScreen}>
        {message}
      </div>
    );
  }
}

class ResponseCheck extends Component {
  state = {
    status: "waiting",
    message: "클릭하면 시작합니다",
    result: [],
  };

  timeOut;
  startTime;
  endTime;

  clickScreenHandler = () => {
    const { status } = this.state;
    if (status === "waiting") {
      this.setState({
        status: "ready",
        message: "초록색으로 화면이 바뀌면 재빠르게 누르세요",
      });
      this.timeOut = setTimeout(() => {
        this.setState({
          status: "now",
          message: "지금 누르세요!",
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (status === "ready") {
      this.setState({
        status: "waiting",
        message: "너무 빨리 눌렀습니다. 새로 클릭하여 다시 시작해보세요",
      });
      clearTimeout(this.timeOut);
    } else if (status === "now") {
      this.endTime = new Date();
      this.setState((prevState) => {
        return {
          status: "waiting",
          message: "잘 눌렀습니다. 다시 해볼까요?",
          result: [...prevState.result, this.endTime - this.startTime],
        };
      });
      clearTimeout(this.timeOut);
    }
  };

  resetAvgTimeHandler = () => {
    this.setState({
      result: [],
    });
  };

  render() {
    const { status, message, result } = this.state;
    return (
      <>
        <ResponseScreen
          status={status}
          message={message}
          onClickScreen={this.clickScreenHandler}
        />
        <ResponseAverageTime
          result={result}
          onClickReset={this.resetAvgTimeHandler}
        />
      </>
    );
  }
}

export default ResponseCheck;

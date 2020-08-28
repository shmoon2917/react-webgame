import React from "react";

const Wrapper = ({ children }) => {
  const style = {
    border: "2px solid black",
    padding: "16px",
  };
  return <div style={style}>{children}</div>;
};

const Hello = ({ name, color, isSpecial }) => {
  return (
    <div style={{ color }}>
      {isSpecial && <b>*</b>}
      안녕하세요 {name}
    </div>
  );
};

//
Hello.defaultProps = {
  name: "이름없음",
};

const VelopertReview = () => {
  return (
    <>
      <Wrapper>
        <div>hello world</div>
        <Hello color="blue" />
        <Hello color="green" name="sangho" isSpecial={true} />
      </Wrapper>
    </>
  );
};

export default VelopertReview;

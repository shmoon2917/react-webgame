벨로퍼트 리액트 강의 문서
https://react.vlpt.us/basic/06-conditional-rendering.html

# 1장 리액트 입문

### 1-5. props 를 통해 컴포넌트에게 값 전달하기

- 전달되는 `props` 의 기본값을 설정할 수 있다(defaultProps)

```
const Hello = ({ name, color }) => {
  ...
};

//
Hello.defaultProps = {
  name: "이름없음",
};
```

- 컴포넌트 태그 사이에 넣은 값을 조회하기 위해서는 `props.children` 을 조회하면 된다.

### 1.6 조건부 렌더링

- 컴포넌트의 props 값을 설정하게 될 때 이름만 작성하고 값 설정을 생략한다면 이를 `true`로 설정한 것으로 간주한다.

```
<Wrapper>
  <Hello name="react" isSpecial />
</Wrapper>
```

### 1.7 useState 를 통해 컴포넌트에서 바뀌는 값 관리하기

- 기초적인 팁: 이벤트 콜백을 정해줄 때 함수형태를 넣어주어야 하지, 함수를 다음과 같이 실행하면 안된다.

```
onClick={onIncrease()}

// 이렇게 하면 렌더링 하는 시점에 함수가 호출된다.
```

### 1.9 여러 개의 input 관리하기

- 객체 형태(name: value) 로 input 값들을 관리하기

```
  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  };
```

### 1.11 배열 렌더링하기

- key 값의 존재유무에 따른 배열 렌더링 방식(없을 때는 FILO 방식으로 수정됨, 있을 때는 고유 값을 가지고 수정 필요한 부분만 수정)

### 1.12 useRef 로 컴포넌트 안의 변수 만들기

- useRef는 또 다른 용도로 컴포넌트 안에서 조회 및 수정할 수 있는 변수를 관리하는 기능이 있다.(값이 바뀐다고 해서 리렌더링되지 않는다)
- setTimeout, setInterval 등을 통해서 만들어진 id / 외부 라이브러리를 사용하여 만들어진 인스턴스 / scroll 위치 등의 값을 관리할 수 있다.

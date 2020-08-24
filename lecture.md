벨로퍼트 리액트 강의 문서
https://react.vlpt.us/basic/06-conditional-rendering.html

# 3.13

render 안에서는 this.setState사용 절대 안된다

props를 바꾸고 싶을 때는 자식 컴포넌트에서 state로 바꾼다음 그 state를 변경한다.
함수를 써주면 좀 더 세밀한 기능 구현이 가능하다(constructor / ref / setState )

jsx 에서 조건문은 삼항 연산자(또는 부호 연산자) 활용

Q. 숫자야구에서 getNumbers가 input 값이 바뀔때마다 계속 호출된다
A. hooks에서는 state를 바꿀 때 훅스 함수 전체가 다시 실행되기 때문에 그 안에 있는 getNumbers 가 다시 호출되는 것임(나중에 어떻게 해결하는지 배움)

# 4. 반응속도 체크

### 팁

- hooks 에서 사용하는 ref 는 DOM 에 접근하기 위한 용도뿐만 아니라 추가로
  class에서의 this속성들(콕 집어서 화면에는 영향을 미치지 않지만 값이 바뀌는 것들)을 표현하기 위한 용도로도 사용가능함.

- ref 는 current 로 접근해야함

- 리액트에서는 배열안에 JSX 구문을 담아서 return 하는 것도 가능

### QnA

Q.state 랑 ref 의 차이는?

A.state 값은 변경되면 다시 렌더링되지만 ref 는 값이 변경되어도 렌더링이 되지 않음.

### 이슈

- 리셋 버튼 누를때마다 screen 도 렌더링이 되는데, 역시나 불필요한 렌더링이 되는 중
  -> 해결 : 스크린과 result 를 다른 컴포넌트로 분리하고 pure 또는 memo 로 작성

- 부모 Component 자식 pureComponent 로 작성하였을 때는 잘 작동하나, memo로 작성하니 잘 되지 않는다.. 이유가 무엇일까
  -> 문제 없었음. 그냥 refresh 하니 작동 잘 됨! (pure -> pure / pure -> memo / memo -> memo / memo -> pure 다 잘 작동)

---

# 5. 가위바위보

### 팁

- hooks 에서는 라이프사이클 어떻게 처리하나
  -> useEffect 로 비슷하게 사용가능
  -> 두 번째 인수 배열에 넣은 값(예제에서는 imgCoord) 들이 바뀔 때 useEffect 가 실행됨(그래서 예제에서는 계속 useEffect 가 실행되고 종료되고를 반복한다)
  -> 배열을 안넣은 상태는 componentDidMount 와 유사한 기능, 배열에 변수를 추가했을 때는 componentDidUpdate 와 유사한 기능을 수행한다.
  -> useEffect 를 state 마다 따로 두어 기능을 수행할 수도 있다.(class 의 경우에는 componentDidMount 나 componentDidUpdate 에서 모든 state를 조건문으로 분기처리하여야함)

- Object.keys/values/entries 개념 익히기

```
let user = {
  name: "John",
  age: 30
};

Object.keys(user); // ["name", "age"]
Object.values(user);  // ["John", 30]
Object.entries(user); // [ ["name","John"], ["age",30] ]
```

### 이슈

- 클로저 이슈 const { imgCoords } = this.state 를 비동기 함수 안에 넣었어야 했는데, 밖에서 선언함으로써 참조하는 값이 바뀌지 않는 문제 발생했음
  -> 해결: 비동기 함수안에서 값을 참조하도록 위치 바꿔줌.

- Error: Maximum update depth exceeded 문제 발생. (https://kss7547.tistory.com/36)
  -> onClick 안에 화살표 함수를 넣어 해결할 수 있지만, 이렇게 되면 렌더링될 때마다 새로운 함수가 생기게됨 -> 메모리문제 발생
  -> 고차함수 패턴 사용

- 버튼을 클릭하여 멈췄을 때, 다시 버튼을 누르면 기능 작동이 꼬이는 이슈 발생
  -> disabled 변수를 추가하여 버튼을 클릭하고 다시 시작되기까지는 css로 disabled 처리할 수 있게끔 함.

- (미) useEffect 작동 시 리턴되는 함수도 계속 작동함. 원래 그런 것인지 확인해보아야겠음
  -> 6.로또 추첨기에서 작동 순서 확인. 이해됨

---

# 6. 로또 추첨기

### 팁

- useEffect 인풋 배열에 넣는 요소를 잘 선택해야한다. (인풋배열에 넣은 요소가 바뀔 때 다시 실행된다)

- useMemo: 복잡한 함수 결괏값(리턴값)을 기억, 배열 요소가 바뀌기 전까지 기억(바뀌면 새로 실행되어 기억) / useRef: 일반 값을 기억

- useState, useEffect 등을 써야 hooks임. 이런걸 쓰지않으면 그냥 함수 컴포넌트라 부름

- componentWillMount / WillReceiveProps / WillUpdate 메소드는 사라질거라 사용하지 않는다.

- setTimeout / setInterval 확실하게 정리해야한다 (ComponentWillUnMount 에서)

- hooks 의 state 들은 조건문안에 절대 넣으면 안된다. 함수나 반복문 안에도 웬만하면 안넣는게 좋다.

- Array.sort() 메소드 익히기

```
var fruit = ['orange', 'apple', 'banana']; // 문자 정렬

/* 일반적인 방법 */
fruit.sort(); // apple, banana, orange

var score = [4, 11, 2, 10, 3, 1]; // 숫자 정렬

/* 오류 */
score.sort(); // 1, 10, 11, 2, 3, 4
              // ASCII 문자 순서로 정렬되어 숫자의 크기대로 나오지 않음

/* 정상 동작 */
score.sort(function(a, b) { // 오름차순
    return a - b;
    // 1, 2, 3, 4, 10, 11
});

score.sort(function(a, b) { // 내림차순
    return b - a;
    // 11, 10, 4, 3, 2, 1
});
```

- useEffect 작동 순서를 보자면 처음 useEffect 함수 실행 -> RedoHandler 실행 -> timeout.current 초기화 -> useEffect 에서 리턴되는 콜백 함수(종료되는) 실행 -> 다시 useEffect 실행 -> 컴포넌트 종료 시 리턴 콜백 함수 실행

### 이슈

- getWinNumbers 를 화살표 함수로 작성하면 cannot find getWinNumbers 에러가 뜬다. 호이스팅 문제인 듯 하다.

- useCallback 함수 안에서 state 접근 시 초기값만을 기억함(클로저 현상) -> 따라서 함수 안에서 state 접근해야 한다면 두 번째 인자 배열에 요소값을 넣어줘야 함.

- 자식 컴포넌트에 메소드를 전달할 때는 useCallback 처리를 꼭 해줘야 함(함수가 새로 계속 생성되기 때문에 자식 쪽에서 리렌더링이 발생함)

- componentDidMount 단계 말고 DidUpdate 단계에서만 실행 됐으면 좋겠다면 (Hooks에서)

```
const mounted = useRef(false);
useEffect(() => {
  if (!mounted.current) {
    mounted.current = true;
  } else {
    // 원하는 코드
  }
}, [요소]);
```

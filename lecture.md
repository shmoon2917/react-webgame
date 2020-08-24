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

리셋 버튼 누를때마다 screen 도 렌더링이 되는데, 역시나 불필요한 렌더링이 되는 중

-> 해결 : 스크린과 result 를 다른 컴포넌트로 분리하고 pure 또는 memo 로 작성

부모 Component 자식 pureComponent 로 작성하였을 때는 잘 작동하나, memo로 작성하니 잘 되지 않는다.. 이유가 무엇일까

-> 작동 잘 됨! (pure -> pure / pure -> memo / memo -> memo / memo -> pure 다 잘 작동)

---

# 5. 가위바위보

## 5.3 가위바위보 게임 만들기

- 클로저 이슈 const { imgCoords } = this.state 를 비동기 함수 안에 넣었어야 했는데, 밖에서 선언함으로써 참조하는 값이 바뀌지 않는 문제 발생했음

5-4. 고차함수와 QnA

- Error: Maximum update depth exceeded 문제 발생.
  https://kss7547.tistory.com/36
  onClick 안에 화살표 함수를 넣어 해결할 수 있지만, 이렇게 되면 렌더링될때마다 새로운 함수가 생기게됨 -> 메모리문제 발생
  -> 고차함수 패턴 사용

5-5. Hooks 와 useEffect

- hooks 에서는 라이프사이클 어떻게 처리하나
  -> useEffect 로 비슷하게 사용가능
  -> 두 번째 인수 배열에 넣은 값(예제에서는 imgCoord) 들이 바뀔 때 useEffect 가 실행됨.
  -> 그래서 예제에서는 계속 useEffect 가 실행되고 종료되고를 반복한다
  -> 배열을 안넣은 상태는 componentDidMount 와 유사한 기능, 배열에 변수를 추가했을 때는 componentDidUpdate 와 유사한 기능을 수행한다.
  -> useEffect 를 state 마다 따로 두어 기능을 수행할 수도 있다.( class 의 경우에는 componentDidMount 나 componentDidUpdate 에서 모든 state를 조건문으로 분기처리하여야함)

  5.6 클래스와 Hooks 라이프사이클 비교

6-1. 로또 추첨기 컴포넌트

- useState, useEffect 등을 써야 hooks임. 이런걸쓰지않으면 그냥 함수 컴포넌트
- componentWillMount / WillReceiveProps / WillUpdate 메소드는 사라질거라 안쓰면된다
- setTimeout / setInterval 확실하게 정리해야한다 (ComponentWillUnMount 에서)

6-4. useEffect
-useEffect 인풋배열에 넣는 요소를 잘 선택해야한다. (인풋배열에 넣은 요소가 바뀔 때 다시 실행된다)

6-5. useMemo와 useCallback
-useMemo: 복잡한 함수 결괏값(리턴값)을 기억, 배열 요소가 바뀌기 전까지 기억(바뀌면 새로 실행되어 기억)
-useRef: 일반 값을 기억

- useCallback: 함수 자체를 기억, 함수 안에서 state 접근 시 초기값만을 기억함(클로저 현상같음) -> 따라서 두 번째 인자인 배열에 요소값을 넣어줌(넣어주게되면 새로 기억하는듯)
- 자식컴포넌트에 메소드를 전달할 때는 useCallback 처리를 꼭 해줘야함(함수가 새로 계속 생성되기 때문에 자식쪽에서 리렌더링이 발생함)

6-6. Hooks 에 대한 자잘한 팁들

- hooks 의 state 들은 조건문안에 절대 넣으면 안된다. 함수나 반복문 안에도 웬만하면 안넣는게 좋다.

- ComponentDidMount 말고 DidUpdate 단계에서만 실행 됐으면 좋겠다 (Hooks에서)
  -> const mounted = useRef(false);
  useEffect 안에서 if(!mounted.current) {
  mounted.current = true;
  } else {
  코드
  }

요렇게 작성하면 됨

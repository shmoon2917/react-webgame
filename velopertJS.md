벨로퍼트 모던 자바스크립트 문서
https://learnjs.vlpt.us/useful/03-short-circuiting.html

# 1장 자바스크립트 입문

### 1-2. Truthy and Falsy

- 특정 값이 Truthy 한 값이라면 true, 그렇지 않다면 false 로 값을 표현하는 것을 구현하기

```
const value = { a: 1 };
const truthy = !!value;

// !value가 false가 되고 !false 가 true 가 됨.
```

### 1-3. 단축 평가 논리 계산법

- &&와 || 연산자로 코드 단축시키기

```
console.log(true && 'hello'); // hello
console.log(false && 'hello'); // false
console.log('hello' && 'bye'); // bye
console.log(null && 'hello'); // null
console.log(undefined && 'hello'); // undefined
console.log('' && 'hello'); // ''
console.log(0 && 'hello'); // 0
console.log(1 && 'hello'); // hello
console.log(1 && 1); // 1

// A && B 에서 A가 Truthy 한 값이면 B가 결과값이 되고, A가 Falsy 한 값이면 A 가 결과값이 됨.
// A || B 는 A 가 Truthy 할 경우 결과는 A 가 된다. 반면, A 가 Falsy 하다면 결과는 B 가 된다.
```

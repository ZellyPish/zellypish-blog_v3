---
emoji: 💊
title: JavaScript Study#1 - 변수 번외편
tags:
  - 개발
  - JavaScript Study
date: '2021-01-21 20:00:00'
categories: Javascript
---

![JS](./javascript.svg)

## 🎈JavaScript Study

<br />

😅 틀린 부분이 있다면 댓글로 알려주세요...

### 호이스팅 시의 차이점

JavaScript 작동방식 위에서 `var` ,`let`, `const` 셋의 공통점이 있는데, 모든 변수 선언은 호이스팅이 일어난다는 것이다.

[호이스팅 포스트👈링크(추후 포스트 예정입니다..)]

호이스팅이 뭔지 궁금하면 이 포스트를 참고하자.

<br />

#### `let`과 `const`의 호이스팅?

<br />

혹자들은 착각하지만 변수를 `let`, `const`로 선언해도 호이스팅이 일어난다.

<br />

##### 예시 코드

```js
let a = 1;
if (true) {
  console.log(a);
  let a = 2;
}
```

<br />

만약 `let`이 호이스팅되지 않는다면 if문 블록 안에서 3번 줄은 변수 선언, 할당의 이전에 있으니 블록 스코프의 `a`를 인식하지 못하고 전역의 `a`를 참조해 1을 출력할 것이다. 하지만 위의 코드는 `ReferenceError`를 내뿜는다. `let`도 호이스팅되기 때문.

<br />

#### 다시 본론으로 돌아와서

<br />

호이스팅이 될 때 `var`과 `let, const` 사이에 다른 점이 있는데

<br />

- `var`는 선언과 초기화가 같이 일어나 호이스팅될 때 값에 `undefined`가 할당된다.

<br />

##### 예시 코드

<br />

```js
console.log(a);

// ...

var a = 1;
```

위의 코드는

```js
var a = undefined;
console.log(a);

// ...

a = 1;
```

<br />

와 같이 동작한다.

<br />

- `let`, `const`는 선언과 초기화가 분리되어 있어 호이스팅 시 값이 없이 선언만 된다. 그 변수를 할당 전에 사용하려 하면 `ReferenceError`가 난다. 호이스팅 된 때부터 변수에 데이터가 할당될 때까지의 구간을 `Temporal Dead Zone(TDZ)`이라고 한다.

<br />

##### 예시 코드

<br />

```js
console.log(a);

// ...

let a = 1;
```

<br />

1 ~ 4번 줄은 변수 `a`의 `TDZ`이다. 따라서 `ReferenceError`가 발생한다.

<br />

### `const` 사용 시 한 가지 주의할 점

<br />

##### 예시 코드

<br />

```js
const a = { foo: `bar` };

a.foo = `baz`;
a.prop1 = 123;
console.log(a);
```

<br />

위의 코드를 실행해보면 에러가 일어나지 않는다. `a` 객체 자체는 불변하지만 내부 속성값은 수정 가능하기 때문이다.

이를 해결하려면 아예 `Immer`와 같은 라이브러리를 사용해 불변성을 관리하는 것이 좋다.

<br />

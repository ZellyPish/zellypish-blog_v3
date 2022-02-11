---
emoji: 💊
title: JavaScript Study#3 표현식과 문
tags:
  - 개발
  - JavaScript Study
date: '2021-02-22 02:00:00'
categories: Javascript
---

![JS](./javascript.svg)

## 🎈JavaScript Study

😅 틀린 부분이 있다면 댓글로 알려주세요...

### 표현식(Expression)

표현식은 값(Value)으로 평가(Evaluation)될 수 있는 문이다.

평가를 간단히 알아보자면, `3 - 2`가 평가되면 `1`이 된다.

```javascript
1 + 1; // 2를 만들어내는 표현식
Math.random(); // Math.random을 호출해 0 ~ 1 사이의 값을 반환하는 표현식

let foo;
foo = 5; // 실행해보면 5를 반환한다. 즉, 표현식이다.
foo > 3; // 평가 후 true가 되는 표현식
```

### 문(Statement)

문이란 프로그램의 기초 단위이다. 자바스크립트의 동작에 있어 가장 기초가 되는 코드 조각이다. 앞서 살펴봤듯이 모든 표현식은 문이다.

거기에 더해 선언문, 조건문, 반복문 처럼 그 자체로는 값을 나타내지 않는 문들이 있다. 그러한 문들은 변수에 할당 불가하고 함수의 인자로도 사용할 수 없다는 특징이 있다.

```javascript
const foobar
if(true) {}
while(true) {}

console.log(if(true){true}) // Unexpected token 'if' Error
```

### 함수 표현식과 함수 선언문

함수를 '선언'하는 것과 '식'으로 구현하는 것의 차이를 알아보자.

```javascript
foo(10, 5); // Error
bar(10, 5); // 15

const foo = (a, b) => {
  return a + b;
};
function bar(a, b) {
  return a - b;
}
```

함수를 표현식으로 적으면 함수를 할당하는 변수만 호이스팅 되고 함수는 호이스팅되지 않아 할당될 때까지 그 함수의 TDZ에 해당되어 실행할 수 없다.

하지만 선언하게되면 함수 선언문 전체가 호이스팅 되기에 실행될 수 있다.

```javascript
function foobar(a, b) {
  return a + b;
}

foobar(10, 5); // ?

/* 대략 엄청난 길이의 코드 */

function foobar(a, b) {
  return a - b;
}
```

위의 코드를 실행시켜보면 위쪽의 `foobar` 함수가 호출되어 15가 반환될 것 같지만 실행결과 5가 반환된다.

함수 선언문이 호이스팅되며 아래의 함수가 위의 함수를 덮어씌우기 때문이다.

이런 참사를 막기 위해서는 함수를 표현식으로 할당해 사용하는 습관을 들이는 것이 좋다.

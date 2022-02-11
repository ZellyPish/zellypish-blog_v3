---
emoji: 💊
title: JavaScript Study#2 변수의 타입
tags:
  - 개발
  - JavaScript Study
date: '2021-01-22 04:00:00'
categories: Javascript
---

![JS](./javascript.svg)

## 🎈JavaScript Study

<br />

😅 틀린 부분이 있다면 댓글로 알려주세요...

[Mozilla 데이터타입 문서 👈👈 링크](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)

### 타입(Type)?

<br />

먼저 타입(Type)이란 변수의 자료형, 즉 변수에 담기는 데이터의 종류를 말한다.

JavaScirpt의 표준 명세인 최신 ECMAScript는 `Number`, `String`, `Boolean`, `undefined`, `BigInt`, `Symbol` 등 6가지의 원시 데이터 타입(Primitive Data Type)을 정의하고 있다.  
그리고 원시 자료형이 아닌(non-primitive) `Object`와 그로부터 파생된 `function`이 있다.  
마지막으로 `null` 타입이 있다.

<br />

##### 예시들

- `null` 타입은 값이 없다는 것을 표현한다. 완전한 없음. 이라고도 한다.

- `undefined`는 `null`과 비슷하면서도 다른데, "변수에 값이 할당된 적이 없다"는 것을 표현할 때 주로 사용되는 타입이다.

둘은 모두 '값이 없음'을 나타내지만 다른 의미의 타입이므로 구분을 하는 것이 중요하다.

- `Number`: 숫자를 표현한다.

- `String`: 문자열을 표현한다.

- `Boolean`: 참(`true`)과 거짓(`false`)를 표현하는 타입이다.

- `BigInt`: 일반적 숫자 범위를 넘어서는 아주 큰 숫자를 표현할 때 사용된다.

- `Symbol`: 유일한 식별자(Unique identifier)를 만들 때 쓰인다. 객체의 속성에 대한 식별자로 쓰일 수 있다.

JavaScript의 타입 각자의 특성에 대해서는 따로 포스팅 할 예정이다.

<br />

JavaScript에 내장된 `typeof` 키워드를 이용하면 변수의 타입을 알아낼 수 있다.

<br />

##### 예시 코드

<br />

```js
// primitive data type
let a = 123;
console.log(typeof a); // number

a = `foobar`;
console.log(typeof a); // string

a = true;
console.log(typeof a); // boolean

a = 124817249174914717824917424118408129n;
console.log(typeof a); // bigint

a = Symbol(`foobar`);
console.log(typeof a); // symbol

a = undefined;
console.log(typeof a); // undefined

// non-primitive data type
a = { foo: `bar` };
console.log(typeof a); // object

a = function () {
  return `Hello`;
};
console.log(typeof a); // function

// special case
a = null;
console.log(typeof a); // object
```

<br />

나머지는 다 제대로 타입이 출력됐는데, `null`은 이상하게 Object형이 튀어나온다. 이는 초기 JavaScript의 `typeof`에 버그가 있었기 때문이라고 한다. 하위호환성을 위해 아직도 유지되고 있다.

그런데 하나의 변수에 여러개의 타입이 지정되고 있다?  
C로 프로그래밍에 입문했던 나는 이것이 아무래도 이상했다.

이것은 JavaScript가 동적 타입 언어(Dynamically Typed Language)이기 때문이다.

<br />

### JavaScript는 동적 타입 언어(Dynamically Typed Language), 약타입 언어(Weakly Typed Language)다.

<br />

프로그래밍 언어는 동적 타입 언어(Dynamically Typed Language)와 정적 타입 언어(Statically Typed Language)로 구분할 수 있다.

그리고 약타입 언어(Weakly Typed Language)와 강타입 언어(Strongly Typed Language)로도 구분할 수 있다.

##### JavaScript는 동적 타입 / 약타입 언어로 분류할 수 있다.

<br />

#### 동적 타입 언어(Dynamically Typed Language)

<br />

동적 타입 언어는 Runtime(프로그램 실행 중)에 변수의 데이터 타입이 결정된다. Runtime에 변수에 값이 할당되는 과정에서 자동으로 변수의 타입이 결정되는 타입 추론(Type Inference)이 일어난다.  
즉, 변수 자체에는 고정된 타입이 없다. 프로그램 실행 시 타입을 결정하는 걸 동적 타이핑(Dynamic Typing)이라고 한다.

앞 챕터의 예시 코드에서 일어난 일과 같은데, 그래도 또 코드로 살펴보자.

<br />

##### 예시 코드

<br />

```js
let a;
a = `안녕하세요.`;
a = 123;
a = true;
```

<br />

변수 `a`가 `String`타입이 됐다가, `Number`타입이었다가, 최종적으론 `Boolean`타입이다. 이처럼 동적 타입 언어는 변수의 타입에 제약을 두지 않는다.

이는 프로그래밍 하는데 있어 유연함과 편리성을 주지만, 실행되기 전에 잠재적인 타입 에러를 예상하기 어려운 단점도 있다.

처음은 편하지만 나중이 불편해지는(?) 방식이라고 생각하면 된다.

<br />

#### 정적 타입(Statically Type)이란

<br />

정적 타입이란 Compile할 때 변수의 타입이 결정되는 걸 말한다. 미리 변수의 타입을 지정하는 것을 말한다. 타입 에러를 미리 Compile 에러로 확인할 수 있어 안정성을 주고, 타입을 미리 지정해둬서 속도가 빠르다는 장점이 있다. 단점으로는 초기 설계가 힘들어지는 점이 있다.

정적 타입 언어인 C언어의 동작을 확인해보자.

<br />

##### 예시 코드

<br />

```c
int foo;
foo = 1; // 컴파일 성공
int bar;
bar = 1.23; // 정수가 아닌 실수값을 대입해 컴파일 에러
```

<br />

1번 줄은 정수자료형 `int`의 변수에 정수가 들어가 정상적인 코드지만, 2번 줄은 실수를 대입해서 에러가 발생한다.

정적 타이핑은 처음에 신경써서 후반을 잘 풀어나간다는 느낌이다.

<br />

#### 약타입(Weakly Typed)

<br />

약타입이란 타입이 달라도 암묵적(Implicit)으로 타입의 '형변환(Type Casting)'을 해주는 것을 말한다.

위에서 말했듯이 JavaScript는 약타입 언어다.

<br />

##### 예시 코드

<br />

```js
`abc` + 1; // => "abc1" 연산시 타입이 달라도 암묵적 형변환을 하고 연산함
```

<br />

C언어 또한 약타입이다.

<br />

```c
// ...

int a = 1.3;
long long b = a; // 암묵적 형변환, 타입이 다름에도 에러가 없음.

// ...
```

<br />

#### 강타입(Strongly Typed)

<br />

강타입은 반대로 타입이 다를 때 암묵적 형변환을 하지 않고 에러를 발생시키는 것을 말한다.

대표적인 강타입 언어로는 Python이 있다.

<br />

```python
a = "foobar"
b = 123

print(a + b) # 에러 발생
```

<br />

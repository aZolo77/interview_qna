# Функции высшего порядка (Higher-Order Functions)

## Определение
**Функции высшего порядка** — это функции, которые:
- принимают другие функции как аргументы,  
- или возвращают функции как результат.  

Они делают код гибким, модульным и позволяют писать декларативно.

---

## Примеры

### 1. Callback (функция обратного вызова)

```js
function calculate(num1, num2, operation) {
    return operation(num1, num2);
}

function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

console.log(calculate(5, 3, add));      // 8
console.log(calculate(5, 3, multiply)); // 15
```

---

### 2. Wrapper (обёртка / декоратор)
Функция может возвращать новую функцию с дополнительной логикой.

```js
function withLogging(func) {
    return function(...args) {
        console.log('Вызов функции:', func.name);
        const result = func(...args);
        console.log('Результат:', result);
        return result;
    };
}

function multiply(a, b) {
    return a * b;
}

const wrappedMultiply = withLogging(multiply);
wrappedMultiply(5, 3); // Вызов функции: multiply → Результат: 15
```

---

### 3. Встроенные функции высшего порядка
JS имеет кучу встроенных HOF для работы с массивами:
- `map` — трансформация массива
- `filter` — отбор элементов
- `reduce` — аккумуляция в одно значение
- `forEach` — обход массива
- `some`, `every`, `find` и др.

Пример:

```js
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15
```

---

## Почему это важно на собеседовании
- HOF = фундамент колбэков, промисов и async/await.  
- Умение использовать `map`/`filter`/`reduce` = показатель, что ты пишешь современный, декларативный код.  
- Интервьюеры часто дают задачки на `map+reduce`, чтобы проверить мышление в функциональном стиле.  

---

## Итог
Функции высшего порядка — это основа «функционального» подхода в JS:
- Принимают или возвращают функции.
- Делают код переиспользуемым и читаемым.
- Часто применяются для работы с асинхронностью и массивами.

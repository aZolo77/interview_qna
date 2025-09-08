# Spread vs Rest оператор

Оба используют `...` (три точки), но их поведение зависит от **контекста**:

---

## Spread-оператор
- «распаковывает» элементы массива или свойства объекта;  
- применяется в **литералах массивов, объектов** и при **вызове функций**.  
- создаёт *поверхностную копию* (shallow copy).

### Примеры

```js
const numbers = [1, 2, 3];
const newArray = [...numbers, 4, 5]; 
// [1, 2, 3, 4, 5]

const person = { name: 'John', age: 30 };
const newPerson = { ...person, city: 'New York' };
// { name: 'John', age: 30, city: 'New York' }

function add(a, b, c) {
    return a + b + c;
}

const values = [10, 20, 30];
console.log(add(...values)); // 60
```

---

## Rest-оператор
- «собирает» оставшиеся элементы в массив;  
- используется **только в объявлениях функций и деструктуризации**.  

### Примеры

```js
function sum(...numbers) {
    return numbers.reduce((acc, n) => acc + n, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

function printNames(first, last, ...middle) {
    console.log('First:', first);
    console.log('Last:', last);
    console.log('Middle:', middle);
}

printNames('John', 'Doe', 'Smith', 'Johnson');
// First: John
// Last: Doe
// Middle: ['Smith', 'Johnson']

const [a, ...restNumbers] = [1, 2, 3, 4];
console.log(a); // 1
console.log(restNumbers); // [2, 3, 4]
```

---

## Сходства и различия
- **Синтаксис один** (`...`), но:
  - spread = *распаковка* значений;  
  - rest = *сборка* значений.  
- Spread работает в **литералах и вызовах функций**, rest — только в **параметрах функций и деструктуризации**.
- Оба создают новые массивы/объекты, не изменяя оригинал.  

---

## Важные моменты для собеседования
- Spread и rest — это **разные механизмы**, хоть и пишутся одинаково. Всё зависит от *контекста применения*.  
- Spread — чаще для копирования и объединения.  
- Rest — для гибкой работы с аргументами функций или деструктуризацией.  
- Оба не делают глубокого копирования (nested объекты/массивы остаются ссылками).  

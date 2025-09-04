# Разница между .call() и .apply()

## 🎯 Определение

**call()** и **apply()** — это методы функций в JavaScript, которые позволяют вызвать функцию с явно заданным контекстом (`this`) и аргументами. Основная разница заключается в способе передачи аргументов.

---

## ⚖️ Основные различия

| Характеристика | .call() | .apply() |
|----------------|---------|----------|
| **Передача аргументов** | Список через запятую | Массив аргументов |
| **Синтаксис** | `func.call(thisArg, arg1, arg2, ...)` | `func.apply(thisArg, [arg1, arg2, ...])` |
| **Производительность** | Немного быстрее | Немного медленнее |
| **Когда использовать** | Знаем количество аргументов | Аргументы в массиве |

---

## 📝 Синтаксис

### call()
```javascript
function.call(thisArg, arg1, arg2, arg3, ...)
```

### apply()  
```javascript
function.apply(thisArg, [arg1, arg2, arg3, ...])
```

**Параметры:**
- `thisArg` — значение `this` при вызове функции
- `arg1, arg2, ...` — аргументы функции

---

## 🔧 Практические примеры

### Базовое использование
```javascript
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: 'Alice' };

// call - аргументы через запятую
const result1 = greet.call(person, 'Hello', '!');
// "Hello, Alice!"

// apply - аргументы в массиве
const result2 = greet.apply(person, ['Hi', '?']);
// "Hi, Alice?"
```

### Заимствование методов
```javascript
const obj1 = {
  name: 'Object1',
  sayHello() {
    return `Hello from ${this.name}`;
  }
};

const obj2 = { name: 'Object2' };

// Заимствуем метод у obj1 для obj2
obj1.sayHello.call(obj2); // "Hello from Object2"
```

---

## 🛠️ Применения в реальном коде

### 1. Работа с Math методами
```javascript
const numbers = [1, 2, 3, 4, 5];

// Найти максимальное значение в массиве
const max = Math.max.apply(null, numbers); // 5

// С ES6 можно использовать spread
const maxES6 = Math.max(...numbers); // 5
```

### 2. Преобразование Array-like объектов
```javascript
function convertToArray() {
  // arguments - array-like объект
  return Array.prototype.slice.call(arguments);
}

const arr = convertToArray(1, 2, 3); // [1, 2, 3]
```

### 3. Проверка типов
```javascript
function getType(obj) {
  return Object.prototype.toString.call(obj);
}

getType([]); // "[object Array]"
getType({}); // "[object Object]"
getType(''); // "[object String]"
```

---

## 🚀 Современные альтернативы

### Spread оператор (ES6)
```javascript
// Вместо apply для передачи массива аргументов
const numbers = [1, 2, 3];

// Старый способ
Math.max.apply(null, numbers);

// Современный способ
Math.max(...numbers);
```

### bind()
```javascript
// Создание функции с привязанным контекстом
const boundFunction = func.bind(thisArg, arg1, arg2);
boundFunction(); // Вызов с привязанным this
```

### Arrow functions
```javascript
// Arrow функции наследуют this из лексического контекста
const obj = {
  name: 'Test',
  regularFunction() {
    return this.name; // this = obj
  },
  arrowFunction: () => {
    return this.name; // this = глобальный объект
  }
};
```

---

## ⚡ Производительность

### Benchmark сравнение
- **call()** обычно быстрее на ~10-15%
- **apply()** медленнее из-за работы с массивом
- В современных движках разница минимальна

### Рекомендации
- Используйте `call()` если знаете аргументы заранее
- Используйте `apply()` если аргументы в массиве
- В ES6+ предпочитайте spread оператор

---

## 🐛 Частые ошибки

### Ошибка с null/undefined this
```javascript
'use strict';

function test() {
  console.log(this); 
}

test.call(null); // В strict mode: null
test.call(undefined); // В strict mode: undefined

// В non-strict mode null/undefined заменяются на globalThis
```

### Потеря контекста при передаче методов
```javascript
const obj = {
  name: 'Test',
  getName() { return this.name; }
};

const fn = obj.getName;
fn(); // undefined (потеря контекста)

// Решение
const boundFn = obj.getName.bind(obj);
boundFn(); // "Test"
```

---

## ✅ Best Practices

### Выбор между call и apply
- **call()** — когда аргументы известны заранее
- **apply()** — когда аргументы в массиве
- **bind()** — для создания функции с привязанным контекстом

### Современный подход
```javascript
// Предпочтительно в ES6+
const args = [1, 2, 3];
func(...args); // вместо func.apply(null, args)

// Деструктуризация
const [first, ...rest] = args;
func.call(thisArg, first, ...rest);
```

### Проверка типов
```javascript
// Надежная проверка типа
function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

// Современная альтернativa
Array.isArray(obj);
```

---

## 🔍 Связанные концепции

### Function.prototype.bind()
- Создает новую функцию с привязанным `this`
- Позволяет частичное применение аргументов
- Возвращает функцию, не вызывает её

### Arrow Functions
- Не имеют собственного `this`
- Нельзя изменить `this` через call/apply/bind
- Наследуют `this` из лексического контекста

---

## ❓ Частые вопросы на собеседовании

- В чем разница между call, apply и bind?
- Как заимствовать метод у другого объекта?
- Зачем передавать null в качестве первого аргумента?
- Как преобразовать arguments в массив?
- Что происходит с this в strict mode при использовании call?
- Как реализовать полифилл для call или apply?
- Когда использовать call, а когда apply?
- Как call/apply работают с arrow functions?
# Что такое NaN в JavaScript

## 🎯 Определение

**NaN** (Not-a-Number) — специальное числовое значение в JavaScript, представляющее результат математической операции, которая не может быть выполнена или не дает числового результата.

---

## ❗ Основные характеристики

### Тип данных
```javascript
typeof NaN // "number" (!)
```
Парадокс: NaN имеет тип `number`, несмотря на название "Not-a-Number".

### Уникальность
- **Не равен самому себе**: `NaN === NaN // false`
- **Не равен ничему**: `NaN == anything // false`
- **Единственное значение** в JavaScript, которое не равно самому себе

---

## 🔍 Как появляется NaN

### 1. Математические операции с нечисловыми значениями
```javascript
10 / "hello"        // NaN
"text" * 5          // NaN
"abc" - 10          // NaN
undefined + 5       // NaN
```

### 2. Недопустимые математические операции
```javascript
Math.sqrt(-1)       // NaN
Math.log(-1)        // NaN
0 / 0               // NaN (но 5/0 = Infinity!)
Infinity - Infinity // NaN
Infinity / Infinity // NaN
```

### 3. Неудачное преобразование в число
```javascript
parseInt("hello")   // NaN
Number("abc")       // NaN
parseFloat("text")  // NaN
+"invalid"          // NaN
```

### 4. Операции с NaN
```javascript
NaN + 5            // NaN
NaN * 2            // NaN
Math.max(NaN, 5)   // NaN
```

---

## 🧪 Методы проверки на NaN

### ❌ Неправильные способы
```javascript
value === NaN       // Всегда false!
value == NaN        // Всегда false!
```

### ✅ Правильные способы

#### Number.isNaN() (рекомендуется)
```javascript
Number.isNaN(NaN)        // true
Number.isNaN("hello")    // false (не число, но не NaN)
Number.isNaN(undefined)  // false
```

#### isNaN() (сначала приводит аргумент к числу)
```javascript
isNaN(NaN)          // true
isNaN("hello")      // true (приводится к NaN)
isNaN(undefined)    // true (приводится к NaN)
isNaN("123")        // false (приводится к 123)
```

#### Самопроверка (хак)
```javascript
function isReallyNaN(value) {
  return value !== value;
}
```

---

## ⚖️ Number.isNaN() vs isNaN()

| Характеристика | Number.isNaN() | isNaN() |
|----------------|----------------|---------|
| **Приведение типов** | ❌ Нет | ✅ Да |
| **Точность** | ✅ Высокая | ❌ Ложные срабатывания |
| **Производительность** | ✅ Быстрее | ❌ Медленнее |
| **Рекомендация** | ✅ Используйте | ❌ Избегайте |

### Примеры различий
```javascript
Number.isNaN("hello")    // false - строка, не NaN
isNaN("hello")           // true - приводится к NaN

Number.isNaN(undefined)  // false - undefined, не NaN  
isNaN(undefined)         // true - приводится к NaN

Number.isNaN("123")      // false - строка, не NaN
isNaN("123")             // false - приводится к 123
```

---

## 🔬 Особые случаи

### Арифметические операции
```javascript
// NaN "заражает" вычисления
10 + NaN             // NaN
NaN ** 0             // 1 (исключение!)
NaN || 5             // 5 (логические операции)
NaN && 5             // NaN
```

### Массивы и объекты
```javascript
[NaN].indexOf(NaN)           // -1 (не найдет!)
[NaN].includes(NaN)          // true (найдет)
Object.is(NaN, NaN)          // true
```

### JSON
```javascript
JSON.stringify(NaN)          // "null"
JSON.parse("null")           // null (не NaN!)
```

---

## 🛡️ Защитное программирование

### Валидация входных данных
```javascript
function safeCalculation(a, b) {
  if (Number.isNaN(a) || Number.isNaN(b)) {
    throw new Error('Invalid input: NaN detected');
  }
  return a + b;
}
```

### Значения по умолчанию
```javascript
function processNumber(value) {
  const num = Number(value);
  return Number.isNaN(num) ? 0 : num; // 0 по умолчанию
}
```

### Фильтрация массивов
```javascript
const numbers = [1, NaN, 3, NaN, 5];
const validNumbers = numbers.filter(n => !Number.isNaN(n));
// [1, 3, 5]
```

---

## 🎯 Практические примеры

### Парсинг пользовательского ввода
```javascript
function parseUserInput(input) {
  const num = parseFloat(input);
  if (Number.isNaN(num)) {
    return { success: false, error: 'Invalid number' };
  }
  return { success: true, value: num };
}
```

### Математические вычисления
```javascript
function safeDivision(a, b) {
  if (b === 0) return Infinity;
  const result = a / b;
  return Number.isNaN(result) ? null : result;
}
```

### Работа с API данными
```javascript
function processApiResponse(data) {
  return data.map(item => ({
    ...item,
    price: Number.isNaN(item.price) ? 0 : item.price
  }));
}
```

---

## 🐛 Частые ошибки

### 1. Сравнение с NaN
```javascript
// ❌ Неправильно
if (result === NaN) { /* никогда не выполнится */ }

// ✅ Правильно  
if (Number.isNaN(result)) { /* корректная проверка */ }
```

### 2. Использование isNaN() вместо Number.isNaN()
```javascript
// ❌ Может дать неожиданный результат
if (isNaN(userInput)) { /* ложные срабатывания */ }

// ✅ Точная проверка
if (Number.isNaN(Number(userInput))) { /* правильно */ }
```

### 3. Забывание о "заражении" NaN
```javascript
// ❌ Игнорирование NaN в цепочке вычислений
const result = data.reduce((sum, item) => sum + item.value, 0);
// Если хотя бы один item.value = NaN, весь result = NaN

// ✅ Фильтрация NaN
const result = data
  .filter(item => !Number.isNaN(item.value))
  .reduce((sum, item) => sum + item.value, 0);
```

---

## 📚 Полифилл для старых браузеров

```javascript
if (!Number.isNaN) {
  Number.isNaN = function(value) {
    return typeof value === 'number' && value !== value;
  };
}
```

---

## ❓ Частые вопросы на собеседовании

- Что такое NaN и когда оно появляется?
- Почему `NaN === NaN` возвращает `false`?
- В чем разница между `isNaN()` и `Number.isNaN()`?
- Какой тип данных у NaN?
- Как правильно проверить значение на NaN?
- Что происходит при операциях с NaN?
- Как обрабатывать NaN в вычислениях?
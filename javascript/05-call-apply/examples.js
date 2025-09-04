// ===== БАЗОВОЕ ИСПОЛЬЗОВАНИЕ =====

function introduce(greeting, punctuation) {
  return `${greeting}, I'm ${this.name}${punctuation}`;
}

const person = { name: 'Alice' };

// call - аргументы через запятую
console.log(introduce.call(person, 'Hello', '!')); 
// "Hello, I'm Alice!"

// apply - аргументы в массиве
console.log(introduce.apply(person, ['Hi', '?'])); 
// "Hi, I'm Alice?"

// ===== ЗАИМСТВОВАНИЕ МЕТОДОВ =====

const obj1 = {
  name: 'Object1',
  greet() { return `Hello from ${this.name}`; }
};

const obj2 = { name: 'Object2' };

// Заимствуем метод greet у obj1 для obj2
console.log(obj1.greet.call(obj2)); // "Hello from Object2"

// ===== РАБОТА С МАССИВАМИ =====

const numbers = [5, 6, 2, 3, 7];

// Найти max/min в массиве через apply
const max = Math.max.apply(null, numbers); // 7
const min = Math.min.apply(null, numbers); // 2

// Современный способ с spread
const maxModern = Math.max(...numbers); // 7

// ===== ПРЕОБРАЗОВАНИЕ ARRAY-LIKE ОБЪЕКТОВ =====

function convertArguments() {
  // arguments - не настоящий массив
  console.log(typeof arguments.push); // undefined
  
  // Преобразуем в массив через call
  const arr = Array.prototype.slice.call(arguments);
  console.log(typeof arr.push); // function
  
  return arr;
}

console.log(convertArguments(1, 2, 3)); // [1, 2, 3]

// Современный способ
function modernConvert(...args) {
  return args; // уже массив
}

// ===== ПРОВЕРКА ТИПОВ =====

function getType(value) {
  return Object.prototype.toString.call(value);
}

console.log(getType([])); // "[object Array]"
console.log(getType({})); // "[object Object]"  
console.log(getType('test')); // "[object String]"
console.log(getType(42)); // "[object Number]"

// ===== ИЗМЕНЕНИЕ КОНТЕКСТА В МЕТОДАХ =====

const calculator = {
  result: 0,
  add(num) {
    this.result += num;
    return this;
  },
  multiply(num) {
    this.result *= num;
    return this;
  }
};

const myObj = { result: 10 };

// Используем методы calculator для myObj
calculator.add.call(myObj, 5); // myObj.result = 15
calculator.multiply.call(myObj, 2); // myObj.result = 30

console.log(myObj.result); // 30

// ===== ПОЛИФИЛЛ ДЛЯ CALL =====

// Упрощенная реализация call
Function.prototype.myCall = function(context, ...args) {
  // Если context null/undefined, используем globalThis
  context = context || globalThis;
  
  // Создаем уникальное свойство
  const uniqueKey = Symbol('fn');
  context[uniqueKey] = this;
  
  // Вызываем функцию и сохраняем результат
  const result = context[uniqueKey](...args);
  
  // Удаляем временное свойство
  delete context[uniqueKey];
  
  return result;
};

// Тест полифилла
function testFn(a, b) {
  return `${this.name}: ${a} + ${b} = ${a + b}`;
}

const testObj = { name: 'Calculator' };
console.log(testFn.myCall(testObj, 2, 3)); // "Calculator: 2 + 3 = 5"

// ===== ПРАКТИЧЕСКИЙ ПРИМЕР: LOGGING =====

const logger = {
  prefix: '[LOG]',
  log(level, message) {
    console.log(`${this.prefix} ${level}: ${message}`);
  }
};

const errorLogger = { prefix: '[ERROR]' };
const debugLogger = { prefix: '[DEBUG]' };

// Используем метод logger с разными контекстами
logger.log.call(errorLogger, 'ERROR', 'Something went wrong');
// [ERROR] ERROR: Something went wrong

logger.log.call(debugLogger, 'DEBUG', 'Debug info');
// [DEBUG] DEBUG: Debug info

// ===== СОЗДАНИЕ ФУНКЦИЙ-УТИЛИТ =====

// Утилита для привязки контекста
function bindContext(fn, context) {
  return function(...args) {
    return fn.apply(context, args);
  };
}

const obj = { name: 'Test' };
function getName() { return this.name; }

const boundGetName = bindContext(getName, obj);
console.log(boundGetName()); // "Test"
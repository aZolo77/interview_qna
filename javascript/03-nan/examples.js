// ===== ОСНОВЫ NaN =====

// Создание NaN
console.log(0 / 0);              // NaN
console.log(Math.sqrt(-1));      // NaN
console.log(parseInt("hello"));  // NaN
console.log(Number("abc"));      // NaN

// Тип NaN
console.log(typeof NaN);         // "number" - парадокс!

// Уникальность NaN
console.log(NaN === NaN);        // false
console.log(NaN == NaN);         // false
console.log(NaN !== NaN);        // true

// ===== СПОСОБЫ ПРОВЕРКИ НА NaN =====

// ❌ Неправильные способы
function wrongWayToCheck(value) {
  if (value === NaN) {           // Никогда не сработает!
    return "This is NaN";
  }
  
  return "Not NaN";
}

// ✅ Правильные способы
function checkNaN(value) {
  // Способ 1: Number.isNaN (рекомендуется)
  if (Number.isNaN(value)) {
    return "This is NaN";
  }
  
  // Способ 2: Самопроверка (хак)
  if (value !== value) {
    return "This is NaN";
  }
  
  return "Not NaN";
}

// Сравнение isNaN vs Number.isNaN
console.log("=== isNaN vs Number.isNaN ===");
console.log("isNaN('hello'):", isNaN("hello"));           // true
console.log("Number.isNaN('hello'):", Number.isNaN("hello")); // false

console.log("isNaN(undefined):", isNaN(undefined));       // true  
console.log("Number.isNaN(undefined):", Number.isNaN(undefined)); // false

console.log("isNaN(NaN):", isNaN(NaN));                   // true
console.log("Number.isNaN(NaN):", Number.isNaN(NaN));     // true

// ===== ОПЕРАЦИИ С NaN =====

// Арифметические операции
console.log("=== Арифметические операции с NaN ===");
console.log("10 + NaN =", 10 + NaN);        // NaN
console.log("NaN * 5 =", NaN * 5);          // NaN
console.log("NaN / 2 =", NaN / 2);          // NaN
console.log("NaN ** 0 =", NaN ** 0);        // 1 (исключение!)

// Логические операции
console.log("=== Логические операции с NaN ===");
console.log("NaN || 5 =", NaN || 5);        // 5
console.log("NaN && 5 =", NaN && 5);        // NaN
console.log("!NaN =", !NaN);                // true (NaN falsy)

// ===== ПРАКТИЧЕСКИЕ ПРИМЕРЫ =====

// Безопасное деление
function safeDivide(a, b) {
  if (b === 0) {
    return b === 0 && a === 0 ? NaN : Infinity * Math.sign(a);
  }
  
  const result = a / b;
  return Number.isNaN(result) ? 0 : result; // 0 по умолчанию
}

console.log("safeDivide(10, 2):", safeDivide(10, 2));     // 5
console.log("safeDivide(10, 0):", safeDivide(10, 0));     // Infinity
console.log("safeDivide(0, 0):", safeDivide(0, 0));       // NaN

// Парсинг пользовательского ввода
function parseUserNumber(input) {
  // Убираем пробелы
  const trimmed = String(input).trim();
  
  // Пустая строка = 0
  if (trimmed === '') return 0;
  
  // Пробуем конвертировать
  const num = Number(trimmed);
  
  if (Number.isNaN(num)) {
    throw new Error(`Invalid number: "${input}"`);
  }
  
  return num;
}

// Тесты парсера
const testInputs = ['123', '  456  ', '', 'abc', '123.45', 'Infinity'];
testInputs.forEach(input => {
  try {
    console.log(`parseUserNumber("${input}"):`, parseUserNumber(input));
  } catch (error) {
    console.log(`parseUserNumber("${input}"):`, error.message);
  }
});

// ===== ОБРАБОТКА МАССИВОВ С NaN =====

const mixedArray = [1, NaN, 3, 'hello', 5, undefined, 7];

// Фильтрация валидных чисел
function getValidNumbers(arr) {
  return arr
    .map(Number)                    // Конвертируем в числа
    .filter(num => !Number.isNaN(num)); // Убираем NaN
}

console.log("Original:", mixedArray);
console.log("Valid numbers:", getValidNumbers(mixedArray)); // [1, 3, 5, 0, 7]

// Поиск NaN в массиве
function findNaN(arr) {
  // indexOf не найдет NaN!
  console.log("indexOf(NaN):", arr.indexOf(NaN));           // -1
  
  // includes найдет NaN
  console.log("includes(NaN):", arr.includes(NaN));         // true
  
  // Ручной поиск
  const nanIndex = arr.findIndex(item => Number.isNaN(item));
  console.log("findIndex NaN:", nanIndex);                   // 1
}

findNaN([1, NaN, 3]);

// ===== МАТЕМАТИЧЕСКИЕ ФУНКЦИИ И NaN =====

// Функции, возвращающие NaN
console.log("=== Математические функции, возвращающие NaN ===");
console.log("Math.sqrt(-1):", Math.sqrt(-1));           // NaN
console.log("Math.log(-1):", Math.log(-1));             // NaN
console.log("Math.acos(2):", Math.acos(2));             // NaN (cos может быть только от -1 до 1)
console.log("Math.sin(NaN):", Math.sin(NaN));           // NaN

// Функции, обрабатывающие NaN
console.log("=== Функции с NaN ===");
console.log("Math.max(1, NaN, 3):", Math.max(1, NaN, 3)); // NaN
console.log("Math.min(1, NaN, 3):", Math.min(1, NaN, 3)); // NaN
console.log("Math.abs(NaN):", Math.abs(NaN));             // NaN

// ===== РАБОТА С JSON И NaN =====

// JSON не поддерживает NaN
const objWithNaN = { value: NaN, count: 42 };
console.log("=== JSON и NaN ===");
console.log("Original object:", objWithNaN);
console.log("JSON.stringify:", JSON.stringify(objWithNaN)); // {"value":null,"count":42}

// Восстановление NaN из JSON
function reviveNaN(key, value) {
  return value === null && key === 'value' ? NaN : value;
}

const jsonString = '{"value":null,"count":42}';
const restored = JSON.parse(jsonString, reviveNaN);
console.log("Restored:", restored);

// ===== УТИЛИТАРНЫЕ ФУНКЦИИ =====

// Проверка на "числоподобность"
function isNumeric(value) {
  return !Number.isNaN(Number(value)) && isFinite(Number(value));
}

console.log("=== isNumeric tests ===");
console.log("isNumeric('123'):", isNumeric('123'));       // true
console.log("isNumeric('123.45'):", isNumeric('123.45')); // true
console.log("isNumeric('abc'):", isNumeric('abc'));       // false
console.log("isNumeric(NaN):", isNumeric(NaN));           // false
console.log("isNumeric(Infinity):", isNumeric(Infinity)); // false

// Замена NaN значением по умолчанию
function defaultIfNaN(value, defaultValue = 0) {
  return Number.isNaN(value) ? defaultValue : value;
}

// Безопасное вычисление среднего
function safeAverage(numbers) {
  const validNumbers = numbers.filter(n => !Number.isNaN(Number(n)));
  
  if (validNumbers.length === 0) {
    return NaN; // Нет валидных чисел
  }
  
  const sum = validNumbers.reduce((acc, n) => acc + Number(n), 0);
  return sum / validNumbers.length;
}

console.log("=== safeAverage ===");
console.log("safeAverage([1, 2, NaN, 4]):", safeAverage([1, 2, NaN, 4])); // 2.33...
console.log("safeAverage([NaN, 'abc']):", safeAverage([NaN, 'abc']));      // NaN
console.log("safeAverage([1, 2, 3]):", safeAverage([1, 2, 3]));           // 2

// ===== ПОЛИФИЛЛ ДЛЯ Number.isNaN =====

// Полифилл для старых браузеров
if (!Number.isNaN) {
  Number.isNaN = function(value) {
    return typeof value === 'number' && value !== value;
  };
}

// ===== ДЕМОНСТРАЦИЯ "ЗАРАЖЕНИЯ" NaN =====

function demonstrateNaNPropagation() {
  const data = [1, 2, NaN, 4, 5];
  
  // Без защиты - NaN "заражает" результат
  const sumWithNaN = data.reduce((sum, val) => sum + val, 0);
  console.log("Sum with NaN:", sumWithNaN); // NaN
  
  // С защитой - фильтруем NaN
  const sumWithoutNaN = data
    .filter(val => !Number.isNaN(val))
    .reduce((sum, val) => sum + val, 0);
  console.log("Sum without NaN:", sumWithoutNaN); // 12
}

demonstrateNaNPropagation();
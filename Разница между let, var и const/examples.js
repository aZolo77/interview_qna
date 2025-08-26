// ===== VAR - Функциональная область видимости =====
function varExample() {
  var x = 1;
  if (true) {
    var x = 2; // переназначение той же переменной
    console.log(x); // 2
  }
  console.log(x); // 2 - изменилась!
}

// ===== LET - Блочная область видимости =====
function letExample() {
  let y = 1;
  if (true) {
    let y = 2; // новая переменная в блоке
    console.log(y); // 2
  }
  console.log(y); // 1 - не изменилась!
}

// ===== CONST - Константа =====
const PI = 3.14;
// PI = 3.14159; // TypeError: Assignment to constant variable

// ===== CONST с объектами =====
const person = { name: 'John', age: 25 };
person.age = 26; // OK - изменяем содержимое
// person = {}; // TypeError - нельзя переназначить

// ===== Temporal Dead Zone =====
console.log(a); // undefined (var hoisting)
// console.log(b); // ReferenceError (TDZ)
// console.log(c); // ReferenceError (TDZ)

var a = 1;
let b = 2;
const c = 3;

// ===== Блочная область видимости =====
{
  let blockScoped = 'inside block';
  const alsoBlockScoped = 'also inside';
}
// console.log(blockScoped); // ReferenceError
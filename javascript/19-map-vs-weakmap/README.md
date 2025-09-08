# Чем отличается `Map` от `WeakMap`

Обе структуры данных позволяют хранить пары «ключ → значение», но работают они по-разному.  

---

## 1. Ключи
- **Map**: ключом может быть **любой тип** — примитив или объект.  
- **WeakMap**: ключами могут быть **только объекты** (не примитивы).  

Пример:

```js
const map = new Map();
map.set('str', 'string key'); // ключ-строка
map.set(42, 'number key'); // ключ-число
map.set({}, 'object key');

const weakMap = new WeakMap();
const obj = {};
weakMap.set(obj, 'works'); // ок
// weakMap.set('test', 'fail'); // ❌ ошибка, ключ не объект
```

---

## 2. Сильные и слабые ссылки
- **Map**: хранит сильные ссылки. Даже если на объект-ключ больше нет других ссылок, он остаётся в памяти, пока находится в `Map`. Это может приводить к утечкам памяти.  
- **WeakMap**: хранит слабые ссылки на ключи. Если объект больше нигде не используется, сборщик мусора удаляет его и соответствующую пару автоматически.  

Пример:

```js
let john = { name: 'John' };

const map = new Map();
map.set(john, 'user data');

john = null; // объект можно было бы удалить
console.log(map.size); // 1 (объект всё ещё в памяти!)

let alice = { name: 'Alice' };
const weakMap = new WeakMap();
weakMap.set(alice, 'user data');

alice = null; 
// объект автоматически удаляется сборщиком мусора вместе с данными в WeakMap
```

---

## 3. Итерация и свойства
- **Map**: можно перебирать с помощью `for...of`, `keys()`, `values()`, `entries()`. Есть свойство `.size`.  
- **WeakMap**: **не поддерживает итерацию** и не имеет `.size`. Это связано с тем, что движок сам решает, когда удалять объекты, и нельзя предсказать, сколько элементов хранится в WeakMap.  

Пример:

```js
const map = new Map([['a', 1], ['b', 2]]);

for (let [key, value] of map) {
    console.log(key, value);
}

console.log(map.size); // 2

const weakMap = new WeakMap();
weakMap.set({}, 123);
// Нельзя перебрать или узнать размер weakMap
```

---

## 4. Методы
- **Map**: `set`, `get`, `has`, `delete`, + итерационные методы (`keys`, `values`, `entries`).  
- **WeakMap**: только `set`, `get`, `has`, `delete`.  

---

## 5. Применение
- **Map**: удобно использовать как универсальное хранилище пар «ключ → значение», если нужно работать и с примитивами, и с объектами, а также перебирать все элементы.  
- **WeakMap**: полезен для ситуаций, когда нужно хранить **дополнительные данные для объектов** и автоматически очищать их вместе с объектами.  

---

## 6. Практические кейсы

### Дополнительные данные

```js
const visitsCount = new WeakMap();

function countUser(user) {
    const count = visitsCount.get(user) || 0;
    visitsCount.set(user, count + 1);
}

let john = { name: 'John' };
countUser(john); // 1
countUser(john); // 2

john = null; // данные автоматически удалятся
```

---

### Кеширование

```js
const cache = new WeakMap();

function process(obj) {
    if (!cache.has(obj)) {
        const result = /* вычисления */ obj;
        cache.set(obj, result);
    }

    return cache.get(obj);
}

let data = {};
let result1 = process(data);
let result2 = process(data);

data = null; 
// кеш автоматически очищается
```

---

## Итог
- Используйте **Map**, когда нужны все возможности работы с коллекцией (итерация, примитивные ключи, подсчёт размера).  
- Используйте **WeakMap**, когда работаете **только с объектами** и хотите, чтобы данные автоматически очищались вместе с ними (например, кеш или скрытые метаданные).  

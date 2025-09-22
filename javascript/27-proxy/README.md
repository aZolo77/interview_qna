# Proxy и Reflect

Proxy — это «обёртка» вокруг объекта или функции, которая позволяет перехватывать базовые операции (чтение, запись, удаление, вызов функции, оператор new и т. д.) и менять их поведение. Reflect — встроенный вспомогательный объект, который даёт доступ к "внутренним методам" языка (аналог [[Get]], [[Set]] и т.п.) и удобен для перенаправления операций на оригинальный объект.

---

## Синтаксис

```
new Proxy(target, handler)
```

- target — объект или функция, которую мы оборачиваем.
- handler — объект с ловушками (traps): методами, перехватывающими операции.

Пример без ловушек — прокси прозрачен:

```jsx
let target = {};
let proxy = new Proxy(target, {});

proxy.test = 5;         // запись попадает в target
alert(target.test);     // 5
alert(proxy.test);      // 5
for (let k in proxy) alert(k); // test
```

---

## Какие операции можно перехватить (главные ловушки)

Ниже — соответствие внутренних методов и ловушек:

- [[Get]] → get (чтение свойства)
- [[Set]] → set (запись свойства)
- [[HasProperty]] → has (оператор in)
- [[Delete]] → deleteProperty (оператор delete)
- [[Call]] → apply (вызов функции)
- [[Construct]] → construct (оператор new)
- [[GetPrototypeOf]] → getPrototypeOf
- [[SetPrototypeOf]] → setPrototypeOf
- [[IsExtensible]] → isExtensible
- [[PreventExtensions]] → preventExtensions
- [[DefineOwnProperty]] → defineProperty
- [[GetOwnProperty]] → getOwnPropertyDescriptor
- [[OwnPropertyKeys]] → ownKeys (Object.keys, for..in и т.п.)

---

## Инварианты (важно)

JS налагает ограничения (инварианты) на поведение ловушек. Примеры:

- set должен вернуть true при успешной записи, иначе будет TypeError.
- deleteProperty должен вернуть true при успешном удалении.
- Ловушки не должны нарушать базовую семантику объектов (например, getPrototypeOf(proxy) должен соответствовать getPrototypeOf(target) и т. п.).

Если игнорировать инварианты — получите баги или исключения.

---

## Частые примеры и приемы

### 1) Значения по умолчанию (get)

Вернуть 0 при обращении к несуществующему элементу массива:

```jsx
let numbers = [0,1,2];

numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0;
    }
  }
});

numbers[123] // 0
```

### 2) Словарь-lookup (get)

Если в словаре нет перевода — возвращать ключ:

```jsx
let dict = { Hello: "Hola", Bye: "Adiós" };

dict = new Proxy(dict, {
  get(target, phrase) {
    return phrase in target ? target[phrase] : phrase;
  }
});

dict["Welcome"] // "Welcome"
```

### 3) Валидация при записи (set)

Сделать массив «только для чисел»:

```jsx
let numbers = [];

numbers = new Proxy(numbers, {
  set(target, prop, val) {
    if (typeof val !== "number") return false; // приведёт к TypeError
    target[prop] = val;
    return true;
  }
});

numbers.push(1);
numbers.push("test"); // TypeError
```

**Важно**: всегда возвращать true при успешной записи, иначе интерпретатор бросит ошибку.

### 4) Фильтрация свойств при перечислении (ownKeys + getOwnPropertyDescriptor)

Скрыть свойства, начинающиеся с "_":

```jsx
let user = { name: "Вася", age: 30, _password: "secret" };

user = new Proxy(user, {
  ownKeys(target) {
    return Object.keys(target).filter(k => !k.startsWith('_'));
  },
  getOwnPropertyDescriptor(target, prop) {
    if (prop.startsWith('_')) return undefined;
    return Object.getOwnPropertyDescriptor(target, prop);
  }
});

Object.keys(user) // ["name","age"]
```

Если ownKeys возвращает имена, которых нет в target, то нужно также реализовать getOwnPropertyDescriptor, чтобы обеспечить корректные флаги enumerable/configurable.

### 5) Защита «внутренних» свойств (get / set / deleteProperty / ownKeys)

Бросать ошибку при доступе к «закрытым» свойствам:

```jsx
let user = { name: "Вася", _password: "secret" };

user = new Proxy(user, {
  get(target, prop) {
    if (String(prop).startsWith('_')) throw new Error("Отказано в доступе");
    let value = target[prop];
    return (typeof value === 'function') ? value.bind(target) : value;
  },
  set(target, prop, val) {
    if (String(prop).startsWith('_')) throw new Error("Отказано в доступе");
    target[prop] = val; return true;
  },
  deleteProperty(target, prop) {
    if (String(prop).startsWith('_')) throw new Error("Отказано в доступе");
    delete target[prop]; return true;
  },
  ownKeys(target) {
    return Object.keys(target).filter(k => !k.startsWith('_'));
  }
});
```

Обратите внимание: функции мы привязываем к target через bind, чтобы методы, использующие приватные поля/слоты target, работали корректно.

### 6) Оператор in для нестандартных смыслов (has)

Сделать объект range, чтобы `5 in range` → true если 5 между start и end:

```jsx
let range = { start: 1, end: 10 };
range = new Proxy(range, {
  has(target, prop) {
    return prop >= target.start && prop <= target.end;
  }
});

5 in range // true
```

### 7) Оборачивание функций (apply)

Proxy можно применять к функциям — перехватывать вызов:

```jsx
function delay(f, ms) {
  return new Proxy(f, {
    apply(target, thisArg, args) {
      setTimeout(() => target.apply(thisArg, args), ms);
    }
  });
}

function sayHi(user) { alert(`Привет, ${user}!`); }

sayHi = delay(sayHi, 3000);
sayHi.length // 1 — прокси сохранил свойства оригинальной функции (в отличие от простого wrapper)
```

Это удобно, если вам нужно сохранить мета-информацию функции (length, name и т.д.).

---

## Reflect — зачем и как использовать

Reflect предоставляет методы с теми же именами, что и ловушки Proxy, и принимает те же аргументы. Он позволяет корректно перенаправлять операцию на оригинальный объект, сохраняя ожидаемое поведение, особенно когда важен receiver (контекст this).

Пример:

```jsx
let user = { name: "Вася" };

user = new Proxy(user, {
  get(target, prop, receiver) {
    console.log(`GET ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, val, receiver) {
    console.log(`SET ${prop}=${val}`);
    return Reflect.set(target, prop, val, receiver);
  }
});
```

Reflect.get(target, prop, receiver) корректно обрабатывает геттеры, передавая правильный this (receiver).

---

## Почему receiver важен (пример с геттером и наследованием)

Если в target есть геттер, и прокси используется в прототипной цепочке, то при чтении свойства из наследника this должен быть наследником, а не target. Именно для этого get получает третий аргумент receiver и обычно нужно использовать Reflect.get(...arguments).

Пример:

```jsx
let user = {
  _name: "Гость",
  get name() { return this._name; }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) { return Reflect.get(target, prop, receiver); }
});

let admin = { __proto__: userProxy, _name: "Админ" };
admin.name // "Админ" — благодаря корректной передаче receiver
```

Если вместо Reflect.get возвращать target[prop], то геттер выполнится с this=target и вернёт не то, что ожидается.

---

## Ограничения Proxy — важные кейсы, которые ломаются

1. **Встроенные объекты и «внутренние слоты»**
    
    Многие встроенные классы (Map, Set, Date, Promise и др.) используют внутренние слоты (например, [[MapData]]). Методы этих классов обращаются к слотам напрямую, а не через [[Get]]/[[Set]]. При проксировании этих объектов методы могут сломаться, потому что this внутри метода будет прокси (у прокси нет нужных слотов).
    Пример:
    
    ```jsx
    let map = new Map();
    let proxy = new Proxy(map, {});
    proxy.set('k', 1); // TypeError — внутренняя реализация Map ожидает настоящий Map как this
    
    **Хак-исправление** — в ловушке get возвращать методы, привязанные к оригиналу:
    get(target, prop, receiver) {
      let v = Reflect.get(target, prop, receiver);
      return typeof v === 'function' ? v.bind(target) : v;
    }
    ```
    
    Тогда map методы будут работать.
    
2. **Array — особый случай**
    
    Array не использует такие слоты, поэтому с массивами проблем обычно нет.
    
3. **Приватные поля классов (#field)**
    
    Доступ к приватным полям реализован через слоты, и если проксировать экземпляр класса, вызовы его методов, использующие приватные поля, могут вызывать ошибки. Решение такое же — биндить методы к оригинальному объекту (но это не всегда желательная операция).
    
4. **Прокси ≠ оригинальный объект**
    
    Proxy — отдельный объект. Если вы добавили оригинал в Set, а потом подменили ссылку на прокси, Set.has(proxy) вернёт false — это другой объект. То же для строгого равенства === — его нельзя перехватить.
    
5. **Проверка на строгое равенство (===) не перехватывается**
    
    Нельзя «подделать» ===. Это фундаментальное ограничение.
    

---

## Performance

Получение свойства через простой прокси может быть медленнее, чем прямой доступ — конкретные числа зависят от движка. В обычных приложениях это редко критично, но для "горячих" участков (очень частые обращения в миллионы раз) прокси могут иметь заметный overhead.

---

## Где прокси реально полезны

- Реактивность (Vue 3) — отслеживание чтений/записей, автоматический rebuild UI.
- Валидаторы / защитники — валидация данных при записи.
- API-агрегаторы / логирование — отслеживание доступа к объекту.
- Прокси-фабрики / декораторы функций — оборачивание без потери метаданных.
- Контейнеры с виртуальными свойствами (виртуальные поля, lazy-load).

---

## Итог — что сказать на собеседовании

- Proxy — мощный низкоуровневый инструмент для перехвата операций с объектом.
- Reflect — стандартный способ перенаправить операцию на target корректно (особенно важен receiver).
- Прокси позволяют: реализовывать значения по умолчанию, валидацию, защиту свойств, реактивность и т. п.
- Но есть ограничения: внутренние слоты встроенных объектов, приватные поля, строгая равенство, производительность и тот факт, что прокси — это отдельный объект.
- Для обёртывания встроенных объектов иногда приходится биндить методы к оригиналу — это ломает идею полностью прозрачного прокси, поэтому использовать нужно аккуратно.
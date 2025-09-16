**Generics** (обобщения) в TypeScript позволяют создавать параметризованные типы, которые делают код более универсальным и переиспользуемым.  
Идея проста: мы пишем функцию, класс или интерфейс один раз, а работать он может с разными типами данных, сохраняя при этом типобезопасность.

---

## Примеры

### 1. Универсальная функция

```ts
function identity<T>(arg: T): T {
  return arg;
}

const a = identity("Hello"); // тип string
const b = identity(42);      // тип number
```

Здесь `T` — это параметр типа (type parameter).  
TypeScript выводит тип автоматически на основе аргумента.

---

### 2. Работа с массивами

```ts
function getArrayLength<T>(arr: T[]): number {
  return arr.length;
}

getArrayLength([1, 2, 3]);      // number[]
getArrayLength(["a", "b", "c"]); // string[]
```

---

### 3. Класс-структура (например, стек)

```ts
class Stack<T> {
  private items: T[] = [];

  push(item: T) {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}

const numStack = new Stack<number>();
numStack.push(10);
numStack.push(20);
console.log(numStack.pop()); // 20
```

---

### 4. Интерфейсы

```ts
interface Comparable<T> {
  compareTo(other: T): number;
}

class Person implements Comparable<Person> {
  constructor(public name: string, public age: number) {}

  compareTo(other: Person): number {
    return this.age - other.age;
  }
}
```

---

## Дополнительные возможности

### Ограничения (extends)
Можно ограничивать generics с помощью других типов:

```ts
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}

getLength("hello");  // работает
getLength([1, 2, 3]); // работает
// getLength(42);     // ошибка — у числа нет length
```

---

### Несколько параметров типа

```ts
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge({ name: "Alex" }, { age: 30 });
// merged: { name: string; age: number }
```

---

## Где это полезно фронтендеру?

- **Работа с API**  
  Например, функция fetchData<T>() может возвращать разные типы данных в зависимости от запроса, при этом TS обеспечит автодополнение.

- **UI-компоненты (React/Angular/Vue)**  
  Компоненты часто делают обобщёнными, чтобы они работали с любыми данными (например, таблицы, списки, формы).

- **Хуки в React**  
  Пользовательские хуки с generics позволяют описывать возвращаемые типы динамически и сохранять типизацию.

Пример:

```ts
function useState<T>(initial: T): [T, (value: T) => void] {
  let state = initial;
  const setState = (value: T) => {
    state = value;
  };
  return [state, setState];
}

const [count, setCount] = useState<number>(0);
setCount(5);   // работает
// setCount("hi"); // ошибка
```

---

👉 На собеседовании важно подчеркнуть:
- Generics делают код универсальным и безопасным.  
- Их часто комбинируют с `extends`, `keyof` и `infer` для более сложных утилит.  
- Это мощная фича TypeScript, которая реально облегчает жизнь во фронтенд-разработке.

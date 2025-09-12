## Основная суть

**TypeScript предоставляет богатый набор встроенных типов для описания различных структур данных**

Типы делятся на примитивные, объектные и служебные (utility types).

## Примитивные типы

### Базовые

- **`number`** - числа (целые и дробные)
- **`string`** - строки
- **`boolean`** - true/false
- **`bigint`** - большие целые числа
- **`symbol`** - уникальные идентификаторы

```tsx
let age: number = 25;
let name: string = "John";
let isActive: boolean = true;
let bigNumber: bigint = 123n;
let sym: symbol = Symbol("id");
```

### Специальные значения

- **`null`** - отсутствие значения
- **`undefined`** - неинициализированное значение
- **`void`** - отсутствие возвращаемого значения (функции)
- **`never`** - значение, которое никогда не наступит

```tsx
function logMessage(): void {
  console.log("Hello");
}

function throwError(): never {
  throw new Error("Something went wrong");
}
```

## Коллекции и структуры

### Массивы

```tsx
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];
let mixed: (string | number)[] = [1, "two", 3];
```

### Кортежи (Tuples)

```tsx
let person: [string, number] = ["John", 25];
let coordinates: [number, number, number] = [1, 2, 3];

// Именованные кортежи (TS 4.0+)
let namedTuple: [name: string, age: number] = ["Alice", 30];
```

### Объекты

```tsx
let user: { name: string; age: number } = {
  name: "John",
  age: 25
};

// С опциональными свойствами
let config: { port: number; host?: string } = { port: 3000 };
```

## Продвинутые типы

### Union Types (Объединение)

```tsx
let id: string | number = "123"; // может быть строкой или числом
let status: "loading" | "success" | "error" = "loading";
```

### Intersection Types (Пересечение)

```tsx
type User = { name: string };
type Admin = { permissions: string[] };
type AdminUser = User & Admin; // содержит оба типа
```

### Literal Types (Литеральные)

```tsx
let direction: "up" | "down" | "left" | "right" = "up";
let dice: 1 | 2 | 3 | 4 | 5 | 6 = 3;
```

## Служебные типы (Utility Types)

### Для работы с объектами

- **`Partial<T>`** - все свойства опциональные
- **`Required<T>`** - все свойства обязательные
- **`Readonly<T>`** - все свойства только для чтения
- **`Pick<T, K>`** - выбрать определенные свойства
- **`Omit<T, K>`** - исключить определенные свойства

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>; // все поля опциональные
type UserName = Pick<User, "name">; // только name
type UserWithoutId = Omit<User, "id">; // без id
```

### Для работы с функциями

- **`Parameters<T>`** - типы параметров функции
- **`ReturnType<T>`** - тип возвращаемого значения
- **`ConstructorParameters<T>`** - параметры конструктора

```tsx
function createUser(name: string, age: number): User {
  return { id: 1, name, email: "" };
}

type CreateUserParams = Parameters<typeof createUser>; // [string, number]
type CreateUserReturn = ReturnType<typeof createUser>; // User
```

## Специальные типы

### Any и Unknown

```tsx
let anything: any = 42; // отключает проверку типов
let something: unknown = 42; // безопасная альтернатива any

// unknown требует проверки типа
if (typeof something === "string") {
  console.log(something.toUpperCase()); // OK
}
```

### Object Types

```tsx
let obj1: object = {}; // любой объект
let obj2: {} = {}; // любое значение кроме null/undefined
let obj3: Object = {}; // wrapper тип (не рекомендуется)
```

### Function Type

```tsx
let fn1: Function = () => {}; // любая функция (не рекомендуется)
let fn2: () => void = () => {}; // функция без параметров и возврата
let fn3: (x: number) => string = (x) => x.toString();
```

## Типы для Frontend разработки

### DOM типы

```tsx
let element: HTMLElement = document.getElementById("app")!;
let button: HTMLButtonElement = document.querySelector("button")!;
let input: HTMLInputElement = document.querySelector("input")!;
```

### Event типы

```tsx
function handleClick(event: MouseEvent) {
  console.log(event.clientX, event.clientY);
}

function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
  console.log(event.target.value);
}
```

### Promise и Async

```tsx
let promise: Promise<string> = fetch("/api").then(r => r.text());
async function fetchData(): Promise<User[]> {
  const response = await fetch("/users");
  return response.json();
}
```

## Перечисления (Enums)

### Числовые enum

```tsx
enum Status {
  Pending,    // 0
  Approved,   // 1
  Rejected    // 2
}
```

### Строковые enum

```tsx
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}
```

### Const enum (компилируются в значения)

```tsx
const enum Colors {
  Red = "red",
  Green = "green",
  Blue = "blue"
}
```

## Возможные дополнительные вопросы

**Q: В чем разница между `any`, `unknown` и `object`?**

- `any` - отключает проверку типов (небезопасно)
- `unknown` - top type, требует проверки перед использованием
- `object` - любой объект (не примитив)

**Q: Когда использовать `never`?**

- Функции, которые никогда не завершаются (бесконечный цикл)
- Функции, которые всегда выбрасывают ошибку
- Исчерпывающие проверки в switch/if

**Q: Что такое type assertion?**

```tsx
let someValue: unknown = "hello";
let strLength: number = (someValue as string).length;
// или
let strLength2: number = (<string>someValue).length;
```

**Q: Разница между `interface` и `type`?**

- `interface` можно расширять и объединять
- `type` более гибкий для union, intersection, computed types
- Для объектов чаще используют `interface`

**Q: Что такое Generic типы?**

```tsx
function identity<T>(arg: T): T {
  return arg;
}

interface Container<T> {
  value: T;
}

// Встроенные generic типы
Array<string>
Promise<User>
Map<string, number>

```

## Лучшие практики

1. **Избегайте `any`** - используйте `unknown` или конкретные типы
2. **Используйте строгие настройки** - `strict: true` в tsconfig
3. **Предпочитайте `interface` для объектов** - лучше для расширения
4. **Используйте utility types** - вместо дублирования кода
5. **Типизируйте API ответы** - создавайте интерфейсы для данных с сервера
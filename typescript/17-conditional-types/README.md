# 🎯 Условные типы (Conditional Types) в TypeScript

Условные типы в TypeScript позволяют описывать зависимости одного типа от другого. Это что-то вроде оператора if для типов. Они помогают создавать гибкие и переиспользуемые решения, уменьшают дублирование кода и позволяют лучше описывать реальные сценарии.

Общая форма:

```
T extends U ? X : Y
```

- Если T совместим с U, используется тип X.
- Иначе — тип Y.

## Простой пример

```ts
type IsString<T> = T extends string ? true : false;

let a: IsString<string>; // true
let b: IsString<number>; // false
```

---

## Использование infer

Ключевое слово infer позволяет "вывести" тип из контекста.

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Fn = (x: number) => string;

type Result = ReturnType<Fn>; // string
```

Здесь infer R вытаскивает возвращаемый тип функции.

---

## Частые кейсы в frontend-разработке

### 1. Работа с промисами

```ts
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type A = UnwrapPromise<Promise<number>>; // number
type B = UnwrapPromise<string>;          // string
```

### 2. Гибкие утилиты

```ts
type Nullable<T> = T | null | undefined;

type NonNullable<T> = T extends null | undefined ? never : T;

type A = NonNullable<string | null>; // string
```

### 3. Сужение типов по условию

```ts
type ApiResponse<T> = T extends { error: string } 
  ? { success: false; message: string }
  : { success: true; data: T };
```

---

## Где пригодится на работе

- Написание типизированных утилит (например, аналоги ReturnType, Parameters, NonNullable).
- Создание типобезопасных API-обёрток (например, извлечь Response из fetch).
- Когда нужно, чтобы тип зависел от входных данных (например, при работе с дженериками в React-хуках или utility-функциях).


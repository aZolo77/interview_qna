### Что такое Mapped Types?

**Mapped types** (отображаемые типы) в TypeScript позволяют создавать новые типы на основе существующих, изменяя или модифицируя свойства исходного типа. Это мощный инструмент для генерации производных типов без необходимости повторно описывать их вручную.

---

#### Основной синтаксис

```
type NewType = { [Property in ExistingType]: NewValueType };
```

---

#### Пример

```ts
type Person = {
  name: string;
  age: number;
};

type UpdatedPerson = {
  [Property in keyof Person]: Property extends 'name' ? string : number;
};

const person: UpdatedPerson = {
  name: 'John',
  age: 25,
};
```

---

#### Встроенные утилиты на основе Mapped Types

TypeScript предоставляет готовые utility types, которые реализованы через mapped types:

- **Partial<T>** — делает все свойства опциональными.  
  Пример: Partial<Person> → { name?: string; age?: number }

- **Required<T>** — делает все свойства обязательными.  
  Пример: Required<Person> → { name: string; age: number }

- **Readonly<T>** — делает все свойства только для чтения.  
  Пример: Readonly<Person> → { readonly name: string; readonly age: number }

- **Pick<T, K>** — выбирает подмножество свойств.  
  Пример: Pick<Person, "name"> → { name: string }

- **Record<K, T>** — создает объектный тип с ключами K и значениями T.  
  Пример: Record<string, number> → { [key: string]: number }

---

#### Когда использовать Mapped Types

- Для модификации свойств типа (например, сделать их опциональными или readonly).
- Для создания обобщённых типов, которые могут работать с любым объектом.
- Для упрощения и переиспользования типовых конструкций в больших проектах.
- Для ограничения или трансформации интерфейсов при работе с API.

---

⚡ **Итог**: Mapped types позволяют декларативно изменять структуры типов. Это фундамент для множества встроенных утилит в TypeScript и инструмент, который обязательно стоит знать frontend-разработчику, так как он часто применяется в крупных проектах для типобезопасной работы с объектами.

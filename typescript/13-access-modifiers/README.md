В TypeScript модификаторы доступа управляют тем, кто и где может использовать свойства и методы класса.  
Они помогают инкапсулировать логику и делать код более безопасным и предсказуемым.

---

## 1. public
- Используется по умолчанию.
- Доступен везде: внутри класса, в наследниках и вне класса.

```ts
class MyClass {
  public name: string;

  public greet() {
    console.log("Hello!");
  }
}

const obj = new MyClass();
obj.name = "Alex"; // доступно
obj.greet();       // доступно
```

---

## 2. private
- Доступ только внутри класса.
- Наследники и внешние объекты не видят private-поля.

```ts
class MyClass {
  private secret: string = "hidden";

  private revealSecret() {
    return this.secret;
  }
}

const obj = new MyClass();
// obj.secret; // ошибка
// obj.revealSecret(); // ошибка
```

---

## 3. protected
- Доступен внутри класса и его наследников.
- Извне экземпляра — недоступен.

```ts
class Base {
  protected value: number = 10;
}

class Derived extends Base {
  showValue() {
    console.log(this.value); // доступно
  }
}

const d = new Derived();
// d.value; // ошибка
```

---

## 4. readonly
- Свойство доступно только для чтения.
- Значение можно задать при инициализации или в конструкторе.

```ts
class MyClass {
  readonly id: number;

  constructor(id: number) {
    this.id = id;
  }
}

const obj = new MyClass(1);
console.log(obj.id); // 1
// obj.id = 2; // ошибка
```

---

## 5. static
- Статические свойства и методы принадлежат классу, а не его экземплярам.
- Можно вызывать без создания объекта.

```ts
class Counter {
  static count = 0;

  static increment() {
    Counter.count++;
  }
}

Counter.increment();
console.log(Counter.count); // 1
```

---

## 6. Дополнительно (полезно знать на собесе)

### private vs # (ECMAScript)
- В TS `private` — это **псевдо-инкапсуляция**, защита работает только на этапе компиляции. В JS коде доступ к полю останется возможным.  
- Синтаксис `#field` — это **настоящая приватность** на уровне JS-движка. TypeScript поддерживает оба подхода.

```ts
class MyClass {
  #realPrivate = 42; // реальное private (JS)
  private fakePrivate = 100; // private только в TS
}
```

---

### Модификаторы + TypeScript фичи
- Можно комбинировать `readonly` с `private` или `protected`:  
  `private readonly id: number;`  
- В конструкторах можно сразу задавать модификаторы и создавать свойства:

```ts
class User {
  constructor(public name: string, private age: number) {}
}

const u = new User("Alex", 30);
console.log(u.name); // "Alex"
// u.age // ошибка
```

---

👉 Для собеседования полезно отметить:
- **public/private/protected** управляют областью видимости.
- **readonly** защищает от изменения.
- **static** делает члены "общими" для всех экземпляров.  
- В реальном фронтенд-коде это помогает **инкапсулировать бизнес-логику** в классах (например, сервисах или утилитах), не допуская лишнего доступа к данным.

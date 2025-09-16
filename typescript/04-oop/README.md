# ООП принципы в TypeScript

## Основная суть
**TypeScript полностью поддерживает все 4 основных принципа ООП + дополнительные возможности**

TypeScript расширяет JavaScript классами, интерфейсами, модификаторами доступа и другими ООП конструкциями.

## 4 основных принципа ООП

### 1. Инкапсуляция
Сокрытие внутренней реализации и предоставление контролируемого доступа к данным.

```typescript
class BankAccount {
  private _balance: number = 0;        // Приватное свойство
  protected accountId: string;         // Доступно в наследниках
  public readonly owner: string;       // Публичное только для чтения

  constructor(owner: string, accountId: string) {
    this.owner = owner;
    this.accountId = accountId;
  }

  // Геттеры и сеттеры для контролируемого доступа
  get balance(): number {
    return this._balance;
  }

  private validateAmount(amount: number): boolean {
    return amount > 0;
  }

  public deposit(amount: number): void {
    if (this.validateAmount(amount)) {
      this._balance += amount;
    }
  }
}
```

### 2. Наследование
Создание новых классов на основе существующих.

```typescript
class Animal {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  makeSound(): void {
    console.log("Some generic sound");
  }
}

class Dog extends Animal {
  private breed: string;

  constructor(name: string, breed: string) {
    super(name); // Вызов конструктора родителя
    this.breed = breed;
  }

  // Переопределение метода
  makeSound(): void {
    console.log("Woof!");
  }

  // Дополнительный метод
  wagTail(): void {
    console.log(`${this.name} wags tail`);
  }
}
```

### 3. Полиморфизм
Использование объектов разных классов через общий интерфейс.

```typescript
interface Shape {
  calculateArea(): number;
  draw(): void;
}

class Circle implements Shape {
  constructor(private radius: number) {}

  calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }

  draw(): void {
    console.log("Drawing a circle");
  }
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}

  calculateArea(): number {
    return this.width * this.height;
  }

  draw(): void {
    console.log("Drawing a rectangle");
  }
}

// Полиморфное использование
function processShapes(shapes: Shape[]): void {
  shapes.forEach(shape => {
    shape.draw();                    // Вызовется правильная реализация
    console.log(shape.calculateArea());
  });
}
```

### 4. Абстракция
Сокрытие сложности и предоставление упрощенного интерфейса.

```typescript
abstract class Vehicle {
  protected abstract maxSpeed: number;

  constructor(protected brand: string) {}

  // Абстрактный метод - должен быть реализован в наследниках
  abstract startEngine(): void;

  // Конкретный метод - может использоваться как есть
  displayInfo(): void {
    console.log(`Brand: ${this.brand}, Max Speed: ${this.maxSpeed}`);
  }
}

class Car extends Vehicle {
  protected maxSpeed = 200;

  startEngine(): void {
    console.log("Starting car engine...");
  }
}

// Нельзя создать экземпляр абстрактного класса
// const vehicle = new Vehicle("Toyota"); // Error!
const car = new Car("Toyota"); // OK
```

## Дополнительные ООП возможности

### Интерфейсы
Определение контрактов для классов.

```typescript
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

// Класс может реализовывать несколько интерфейсов
class Duck implements Flyable, Swimmable {
  fly(): void {
    console.log("Duck is flying");
  }

  swim(): void {
    console.log("Duck is swimming");
  }
}

// Расширение интерфейсов
interface Bird extends Flyable {
  layEggs(): void;
}
```

### Статические члены
Свойства и методы, принадлежащие классу, а не экземпляру.

```typescript
class MathUtils {
  static readonly PI = 3.14159;
  private static instanceCount = 0;

  constructor() {
    MathUtils.instanceCount++;
  }

  static getInstanceCount(): number {
    return MathUtils.instanceCount;
  }

  static calculateCircleArea(radius: number): number {
    return MathUtils.PI * radius ** 2;
  }
}

// Использование без создания экземпляра
console.log(MathUtils.PI);
console.log(MathUtils.calculateCircleArea(5));
```

### Перегрузка методов (Method Overloading)
Определение нескольких сигнатур для одного метода.

```typescript
class Calculator {
  // Перегрузка - определение сигнатур
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: number[], b: number[]): number[];

  // Реализация - должна обрабатывать все случаи
  add(a: any, b: any): any {
    if (typeof a === "number" && typeof b === "number") {
      return a + b;
    }
    if (typeof a === "string" && typeof b === "string") {
      return a + b;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
      return [...a, ...b];
    }
    throw new Error("Invalid arguments");
  }
}
```

## Продвинутые концепции

### Generic классы
```typescript
class Container<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T | undefined {
    return this.items[index];
  }

  getAll(): T[] {
    return [...this.items];
  }
}

const stringContainer = new Container<string>();
const numberContainer = new Container<number>();
```

### Mixins (Примеси)
Способ добавления функциональности классам без наследования.

```typescript
// Миксин для добавления timestamp
function Timestamped<T extends Constructor>(Base: T) {
  return class extends Base {
    timestamp = Date.now();
    
    getTimestamp() {
      return this.timestamp;
    }
  };
}

// Миксин для добавления уникального ID
function Identifiable<T extends Constructor>(Base: T) {
  return class extends Base {
    id = Math.random().toString(36);
    
    getId() {
      return this.id;
    }
  };
}

class User {
  constructor(public name: string) {}
}

// Применение миксинов
const TimestampedUser = Timestamped(User);
const IdentifiableUser = Identifiable(User);
const EnhancedUser = Identifiable(Timestamped(User));

type Constructor = new (...args: any[]) => {};
```

### Декораторы (Experimental)
Аннотации для классов, методов и свойств.

```typescript
// Декоратор класса
function Component(target: any) {
  target.prototype.isComponent = true;
}

// Декоратор метода
function Log(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyName} with`, args);
    return method.apply(this, args);
  };
}

@Component
class UserService {
  @Log
  createUser(name: string): void {
    console.log(`Creating user: ${name}`);
  }
}
```

## Возможные дополнительные вопросы

**Q: В чем разница между `private`, `protected` и `public`?**
- `private` - доступно только внутри класса
- `protected` - доступно в классе и его наследниках
- `public` - доступно везде (по умолчанию)

**Q: Что такое композиция vs наследование?**
```typescript
// Наследование
class Manager extends Employee { }

// Композиция (предпочтительнее)
class Manager {
  constructor(private employee: Employee) {}
  
  delegate(): void {
    this.employee.work();
  }
}
```

**Q: Как реализовать множественное наследование?**
- TypeScript не поддерживает множественное наследование классов
- Используйте интерфейсы или миксины
- Композиция часто лучше наследования

**Q: Когда использовать классы vs интерфейсы?**
- **Интерфейсы**: для описания структуры данных, контракты
- **Классы**: когда нужна реализация, логика, состояние

**Q: Что такое SOLID принципы в TypeScript?**
- **S**ingle Responsibility - один класс, одна ответственность
- **O**pen/Closed - открыт для расширения, закрыт для модификации
- **L**iskov Substitution - объекты должны быть заменяемы наследниками
- **I**nterface Segregation - много специфичных интерфейсов лучше одного общего
- **D**ependency Inversion - зависимость от абстракций, не от конкретики

## Современные альтернативы

В современном frontend чаще используются:
- **Функциональное программирование** вместо ООП
- **Composition over inheritance** (хуки в React)
- **Utility types** вместо классов для типизации
- **Модули** для организации кода

Но знание ООП важно для:
- Legacy кодовых баз
- Сложных бизнес-моделей
- Архитектурных решений
- Паттернов проектирования
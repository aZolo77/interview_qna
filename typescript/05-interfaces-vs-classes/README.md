# Интерфейсы vs Классы в TypeScript

## Основная суть
**Интерфейс = контракт/структура данных, Класс = реализация + данные + поведение**

Интерфейсы определяют "что должно быть", классы определяют "как это работает".

## Что такое интерфейс

### Определение
Интерфейс описывает структуру объекта, определяя какие свойства и методы должны быть реализованы, но не содержит реализации.

```typescript
interface User {
  id: number;
  name: string;
  email?: string;           // Опциональное свойство
  readonly createdAt: Date; // Только для чтения
  
  greet(): void;            // Метод без реализации
  updateProfile(data: Partial<User>): void;
}

// Объект, соответствующий интерфейсу
const user: User = {
  id: 1,
  name: "John",
  createdAt: new Date(),
  
  greet() {
    console.log(`Hello, ${this.name}`);
  },
  
  updateProfile(data) {
    // реализация
  }
};
```

### Расширение интерфейсов
```typescript
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

// Множественное наследование интерфейсов
interface Pet {
  owner: string;
}

interface DomesticDog extends Dog, Pet {
  isVaccinated: boolean;
}
```

### Объединение интерфейсов (Declaration Merging)
```typescript
interface Window {
  customProperty: string;
}

interface Window {
  anotherProperty: number;
}

// Теперь Window имеет оба свойства
// window.customProperty и window.anotherProperty
```

## Ключевые различия

| Аспект | Интерфейс | Класс |
|--------|-----------|--------|
| **Назначение** | Описание структуры/контракта | Реализация и создание объектов |
| **Компиляция** | Исчезают при компиляции | Остаются в JS коде |
| **Экземпляры** | Нельзя создать экземпляр | Можно создать через `new` |
| **Реализация методов** | Только сигнатуры | Полная реализация |
| **Наследование** | Множественное (`extends`) | Одиночное (`extends`) |
| **Модификаторы доступа** | Не поддерживаются | `private`, `protected`, `public` |
| **Конструкторы** | Нет | Есть |
| **Статические члены** | Нет | Есть |

## Подробное сравнение

### Интерфейсы - структурная типизация
```typescript
interface Point {
  x: number;
  y: number;
}

// Duck typing - если объект имеет нужную структуру, он подходит
function printPoint(p: Point) {
  console.log(`(${p.x}, ${p.y})`);
}

// Работает, хотя не объявлен как Point
const myPoint = { x: 10, y: 20, z: 30 };
printPoint(myPoint); // OK - есть x и y

// Интерфейсы для функций
interface SearchFunction {
  (source: string, subString: string): boolean;
}

const mySearch: SearchFunction = (src, sub) => {
  return src.includes(sub);
};
```

### Классы - номинативная типизация + реализация
```typescript
class Rectangle {
  private _width: number;
  private _height: number;
  
  constructor(width: number, height: number) {
    this._width = width;
    this._height = height;
  }
  
  get area(): number {
    return this._width * this._height;
  }
  
  static fromSquare(side: number): Rectangle {
    return new Rectangle(side, side);
  }
  
  draw(): void {
    console.log(`Drawing ${this._width}x${this._height} rectangle`);
  }
}

const rect = new Rectangle(10, 20);
const square = Rectangle.fromSquare(15);
```

## Реализация интерфейсов классами

### Один интерфейс
```typescript
interface Drawable {
  draw(): void;
  getArea(): number;
}

class Circle implements Drawable {
  constructor(private radius: number) {}
  
  draw(): void {
    console.log("Drawing circle");
  }
  
  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
  
  // Дополнительные методы класса
  getCircumference(): number {
    return 2 * Math.PI * this.radius;
  }
}
```

### Множественная реализация
```typescript
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

class Duck implements Flyable, Swimmable {
  fly(): void {
    console.log("Duck is flying");
  }
  
  swim(): void {
    console.log("Duck is swimming");
  }
}
```

## Когда использовать что

### Используйте интерфейсы когда:
- Нужно описать структуру данных
- Типизируете props, state, API ответы
- Определяете контракты между модулями
- Нужна гибкость (structural typing)
- Работаете с внешними данными (JSON)

```typescript
// Типизация API ответа
interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

// Типизация компонента
interface TodoListProps {
  todos: TodoItem[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}
```

### Используйте классы когда:
- Нужна реализация бизнес-логики
- Требуется состояние и поведение
- Нужны приватные поля и методы
- Используете ООП паттерны
- Создаете сервисы, утилиты, модели

```typescript
// Бизнес-логика
class ShoppingCart {
  private items: CartItem[] = [];
  
  addItem(product: Product, quantity: number): void {
    // логика добавления
  }
  
  get total(): number {
    return this.items.reduce((sum, item) => 
      sum + item.product.price * item.quantity, 0
    );
  }
  
  checkout(): Promise<Order> {
    // логика оформления заказа
  }
}
```

## Возможные дополнительные вопросы

**Q: Можно ли использовать интерфейс как тип?**
```typescript
// Да, интерфейсы можно использовать как типы
function processUser(user: User): void {
  console.log(user.name);
}

const users: User[] = []; // Массив пользователей
const userMap: Record<string, User> = {}; // Карта пользователей
```

**Q: В чем разница между `interface` и `type`?**
```typescript
// Интерфейс можно расширять
interface User {
  name: string;
}
interface User {
  age: number; // Объединяется с предыдущим
}

// Type alias - более гибкий
type Status = 'loading' | 'success' | 'error';
type UserWithStatus = User & { status: Status };

// Для объектов предпочтительнее interface
// Для union types, primitives - type
```

**Q: Что такое index signature в интерфейсах?**
```typescript
interface StringDictionary {
  [key: string]: string;
}

interface NumberDictionary {
  [key: string]: number;
  length: number; // OK, number присваивается string
}
```

**Q: Как типизировать функциональные компоненты?**
```typescript
// Способ 1: React.FC
const Component1: React.FC<Props> = (props) => <div />;

// Способ 2: обычная функция (предпочтительнее)
function Component2(props: Props): JSX.Element {
  return <div />;
}

// Способ 3: стрелочная функция
const Component3 = (props: Props): JSX.Element => <div />;
```

**Q: Как работает structural vs nominal typing?**
```typescript
// Structural typing (интерфейсы)
interface Point2D { x: number; y: number; }
interface Vector2D { x: number; y: number; }

const point: Point2D = { x: 1, y: 2 };
const vector: Vector2D = point; // OK - одинаковая структура

// Nominal typing (классы)
class PointClass { constructor(public x: number, public y: number) {} }
class VectorClass { constructor(public x: number, public y: number) {} }

const pointObj = new PointClass(1, 2);
const vectorObj: VectorClass = pointObj; // Error - разные классы
```

## Лучшие практики

1. **Предпочитайте интерфейсы для объектов** - лучше для расширения
2. **Используйте классы для логики** - когда нужна реализация
3. **Именование** - интерфейсы без префикса `I` (IUser ❌, User ✅)
4. **Композиция над наследованием** - особенно в React
5. **Строгая типизация** - избегайте `any`, используйте конкретные интерфейсы

```typescript
// ❌ Плохо
interface IUser {
  data: any;
}

// ✅ Хорошо
interface User {
  id: number;
  profile: UserProfile;
  settings: UserSettings;
}

interface UserProfile {
  name: string;
  avatar?: string;
}
```
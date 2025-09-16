# Extends vs Implements в TypeScript

## Основная суть
**Extends = наследование реализации, Implements = обязательство реализовать контракт**

`extends` копирует функциональность, `implements` требует реализации.

## Ключевые различия

| Аспект | Extends | Implements |
|--------|---------|------------|
| **Назначение** | Наследование | Контракт/обязательство |
| **Что получаем** | Готовую реализацию | Только требования |
| **Количество** | Одно наследование | Множественная реализация |
| **Переопределение** | Опционально | Обязательно всё реализовать |
| **Применимо к** | Класс ← Класс, Интерфейс ← Интерфейс | Класс ← Интерфейс |

## Extends - Наследование

### Классы наследуют классы
```typescript
class Animal {
  protected name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  makeSound(): void {
    console.log("Some sound");
  }
  
  sleep(): void {
    console.log(`${this.name} is sleeping`);
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
  
  // Новый метод
  wagTail(): void {
    console.log(`${this.name} wags tail`);
  }
}

const dog = new Dog("Buddy", "Golden");
dog.sleep(); // Унаследованный метод
dog.makeSound(); // Переопределенный метод
```

### Интерфейсы наследуют интерфейсы
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

## Implements - Реализация контракта

### Класс реализует интерфейс
```typescript
interface Flyable {
  fly(): void;
  altitude: number;
}

interface Swimmable {
  swim(): void;
  depth: number;
}

// Множественная реализация
class Duck implements Flyable, Swimmable {
  altitude = 0;
  depth = 0;
  
  // ОБЯЗАТЕЛЬНО реализовать все методы
  fly(): void {
    this.altitude = 100;
    console.log("Duck is flying");
  }
  
  swim(): void {
    this.depth = 5;
    console.log("Duck is swimming");
  }
  
  // Дополнительные методы класса
  quack(): void {
    console.log("Quack!");
  }
}
```

## Применение в Frontend разработке

### React компоненты
```typescript
// Базовый класс компонента
abstract class BaseComponent<P = {}, S = {}> {
  protected props: P;
  protected state: S;
  
  constructor(props: P, initialState: S) {
    this.props = props;
    this.state = initialState;
  }
  
  abstract render(): JSX.Element;
  
  protected setState(newState: Partial<S>): void {
    this.state = { ...this.state, ...newState };
  }
}

// Наследование базового компонента
class UserCard extends BaseComponent<{ user: User }, { expanded: boolean }> {
  constructor(props: { user: User }) {
    super(props, { expanded: false });
  }
  
  render(): JSX.Element {
    return (
      <div>
        <h3>{this.props.user.name}</h3>
        {this.state.expanded && <p>{this.props.user.email}</p>}
      </div>
    );
  }
}
```

### API сервисы
```typescript
// Интерфейсы для контрактов
interface ApiService {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: any): Promise<T>;
}

interface Cacheable {
  cache: Map<string, any>;
  getCached(key: string): any;
  setCached(key: string, value: any): void;
}

// Базовый класс с общей логикой
abstract class BaseApiService {
  protected baseUrl: string;
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  
  protected async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, options);
    return response.json();
  }
}

// Реализация контрактов + наследование
class UserService extends BaseApiService implements ApiService, Cacheable {
  cache = new Map<string, any>();
  
  constructor() {
    super('/api');
  }
  
  // Реализация ApiService
  async get<T>(url: string): Promise<T> {
    return this.request<T>(url);
  }
  
  async post<T>(url: string, data: any): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
  
  // Реализация Cacheable
  getCached(key: string): any {
    return this.cache.get(key);
  }
  
  setCached(key: string, value: any): void {
    this.cache.set(key, value);
  }
}
```

## Комбинированное использование

```typescript
// Абстрактный базовый класс
abstract class Component implements Renderable {
  abstract render(): string;
  
  mount(): void {
    console.log("Component mounted");
  }
}

interface Renderable {
  render(): string;
}

interface Interactive {
  handleClick(): void;
}

// Наследование + реализация
class Button extends Component implements Interactive {
  constructor(private label: string) {
    super();
  }
  
  // Из Component (implements Renderable)
  render(): string {
    return `<button>${this.label}</button>`;
  }
  
  // Из Interactive
  handleClick(): void {
    console.log(`Button ${this.label} clicked`);
  }
}
```

## Возможные дополнительные вопросы

**Q: Можно ли extends и implements одновременно?**
```typescript
class Manager extends Employee implements Manageable {
  // Наследует от Employee + обязан реализовать Manageable
}
```

**Q: Что происходит при конфликте методов?**
```typescript
class Parent {
  method(): string { return "parent"; }
}

interface Contract {
  method(): number; // Конфликт типов!
}

// class Child extends Parent implements Contract {} // Error!
```

**Q: Можно ли класс implements класс?**
```typescript
class BaseClass {
  method(): void {}
}

// Можно, но не рекомендуется
class MyClass implements BaseClass {
  method(): void {} // Должен реализовать заново
}
```

## Практические рекомендации

### Когда использовать extends
- Есть общая реализация для переиспользования
- Нужно расширить существующий функционал
- IS-A отношение (собака - это животное)

### Когда использовать implements  
- Нужно обеспечить контракт/интерфейс
- Множественная "реализация" интерфейсов
- CAN-DO отношение (утка может летать и плавать)

```typescript
// ✅ Хорошо - IS-A отношение
class SportsCar extends Car {
  turbo(): void {}
}

// ✅ Хорошо - CAN-DO способности
class Airplane implements Flyable, Transportable {
  fly(): void {}
  transport(): void {}
}

// ❌ Плохо - принуждение к наследованию
class Square extends Rectangle {} // Нарушает принцип подстановки Лисков
```

## Современные альтернативы

В современном frontend чаще используется композиция:

```typescript
// Вместо наследования - композиция
function useApi(baseUrl: string) {
  return {
    get: <T>(url: string) => fetch(`${baseUrl}${url}`).then(r => r.json() as T),
    post: <T>(url: string, data: any) => fetch(`${baseUrl}${url}`, {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(r => r.json() as T)
  };
}

// Использование
const api = useApi('/api');
const users = await api.get<User[]>('/users');
```
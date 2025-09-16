# Type Assertions в TypeScript

## Основная суть
**Type Assertion = "я знаю тип лучше компилятора"**

Позволяет принудительно указать тип, когда TypeScript не может его вывести автоматически. Работает только на этапе компиляции!

## Синтаксис

### 1. Синтаксис `as` (предпочтительный)
```typescript
let value: unknown = "Hello";
let length: number = (value as string).length;

// Для JSX совместимости
const element = document.getElementById('app') as HTMLDivElement;
```

### 2. Угловые скобки (не работает в JSX)
```typescript
let value: unknown = "Hello";
let length: number = (<string>value).length;

// ❌ Конфликт с JSX
// let element = <HTMLDivElement>document.getElementById('app');
```

## Типичные сценарии использования

### DOM элементы
```typescript
// TypeScript не знает конкретный тип элемента
const button = document.getElementById('btn'); // HTMLElement | null
const input = document.querySelector('input'); // Element | null

// Указываем конкретные типы
const typedButton = document.getElementById('btn') as HTMLButtonElement;
const typedInput = document.querySelector('input') as HTMLInputElement;

// Теперь доступны специфичные свойства
typedButton.disabled = true;
typedInput.value = "Hello";
```

### API ответы
```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const userData = await response.json(); // any
  
  // Утверждаем, что это User
  return userData as User;
}

// С проверкой
function isUser(obj: any): obj is User {
  return obj && typeof obj.id === 'number' && typeof obj.name === 'string';
}

async function fetchUserSafely(id: number): Promise<User | null> {
  const response = await fetch(`/api/users/${id}`);
  const userData = await response.json();
  
  if (isUser(userData)) {
    return userData; // TypeScript знает, что это User
  }
  
  return null;
}
```

### Unknown и Any
```typescript
let data: unknown = JSON.parse('{"name": "John", "age": 30}');

// Нужно сначала проверить или утвердить тип
if (typeof data === 'object' && data !== null) {
  const user = data as { name: string; age: number };
  console.log(user.name);
}

// Или с type predicate
function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

if (isObject(data)) {
  // data теперь Record<string, unknown>
  const name = (data.name as string);
}
```

### Const assertions
```typescript
// Без const assertion
const colors = ['red', 'green', 'blue']; // string[]

// С const assertion
const colorsConst = ['red', 'green', 'blue'] as const; // readonly ['red', 'green', 'blue']

type Color = typeof colorsConst[number]; // 'red' | 'green' | 'blue'

// Для объектов
const config = {
  api: 'https://api.example.com',
  timeout: 5000
} as const;

type Config = typeof config; // { readonly api: 'https://api.example.com'; readonly timeout: 5000 }
```

## Опасности и ограничения

### Runtime ошибки
```typescript
let value: any = 42;
let text = value as string;

console.log(text.length); // undefined - number не имеет length!
console.log(text.toUpperCase()); // Runtime Error!
```

### Невозможные assertions
```typescript
let num = 42;
// let str = num as string; // Error: невозможно преобразовать number в string

// Через unknown можно, но опасно
let str = num as unknown as string; // Компилируется, но небезопасно
```

### Non-null assertion (!)
```typescript
// Утверждение, что значение не null/undefined
const element = document.getElementById('app')!; // HTMLElement (не null)
const user = users.find(u => u.id === 1)!; // User (не undefined)

// Опасно, если элемент действительно может быть null
// element.innerHTML = 'Hello'; // Может упасть в runtime
```

## Применение в Frontend

### React компоненты
```typescript
interface Props {
  children: React.ReactNode;
}

function MyComponent(props: Props) {
  // Assertion для ref
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Знаем, что ref будет установлен после mount
    inputRef.current!.focus();
  }, []);
  
  return <input ref={inputRef} />;
}

// Event handlers
function handleSubmit(event: React.FormEvent) {
  event.preventDefault();
  
  // Утверждаем тип target
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
}
```

### Работа с библиотеками
```typescript
// Библиотека без типов
declare const SomeLibrary: any;

interface LibraryConfig {
  apiKey: string;
  timeout: number;
}

// Создаем типизированную обертку
function initLibrary(config: LibraryConfig) {
  return SomeLibrary.init(config) as {
    request: (url: string) => Promise<any>;
    destroy: () => void;
  };
}
```

### State management
```typescript
// Redux с типизацией
interface AppState {
  user: User | null;
  posts: Post[];
}

function mapStateToProps(state: unknown) {
  const appState = state as AppState;
  
  return {
    user: appState.user,
    posts: appState.posts
  };
}

// Или с type guards
function isAppState(state: unknown): state is AppState {
  return (
    typeof state === 'object' &&
    state !== null &&
    'user' in state &&
    'posts' in state
  );
}
```

## Лучшие практики

### ✅ Безопасные паттерны
```typescript
// 1. С проверкой типа
function processData(data: unknown) {
  if (typeof data === 'string') {
    return data.toUpperCase(); // TypeScript знает, что это string
  }
  return '';
}

// 2. Type guards
function isUser(obj: any): obj is User {
  return obj && typeof obj.name === 'string' && typeof obj.id === 'number';
}

// 3. Narrow assertion
let value: string | number = getValue();
if (typeof value === 'string') {
  console.log(value.length); // Безопасно
}
```

### ❌ Опасные паттерны
```typescript
// Избегайте
let data = api.getData() as User; // Может быть не User
let element = document.getElementById('missing') as HTMLElement; // Может быть null
let result = someFunction() as any; // Теряем типизацию
```

## Возможные дополнительные вопросы

**Q: В чем разница между Type Assertion и Type Casting?**
- Type Assertion - только compile-time, не меняет runtime значение
- Type Casting - изменяет фактический тип данных (в других языках)

**Q: Когда использовать ! (non-null assertion)?**
```typescript
// Когда точно знаем, что значение не null
const config = getConfig()!; // Точно знаем, что config есть
element!.style.display = 'none'; // После проверки на существование
```

**Q: Что такое satisfies operator?**
```typescript
// TypeScript 4.9+
const config = {
  api: 'https://api.com',
  timeout: 5000
} satisfies Config; // Проверяет соответствие, но сохраняет точный тип
```

## Альтернативы

### Вместо assertion - проверка
```typescript
// ❌ Assertion
const user = data as User;

// ✅ Проверка
const user = isUser(data) ? data : null;
if (user) {
  console.log(user.name); // Безопасно
}
```

### Схемы валидации
```typescript
// С библиотеками типа zod, yup
import { z } from 'zod';

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email()
});

const user = UserSchema.parse(data); // Валидация + типизация
```
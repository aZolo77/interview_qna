# Interface vs Type в TypeScript

## Основная суть
**Interface - для описания объектов, Type - для любых типов (union, primitive, computed)**

В 90% случаев взаимозаменяемы для объектов, но имеют ключевые различия.

## Ключевые различия

| Возможность | Interface | Type |
|-------------|-----------|------|
| **Объекты** | ✅ `interface User {}` | ✅ `type User = {}` |
| **Union types** | ❌ | ✅ `type Status = 'loading' \| 'success'` |
| **Primitives** | ❌ | ✅ `type ID = string \| number` |
| **Расширение** | `extends` | `&` (intersection) |
| **Переопределение** | ✅ Declaration merging | ❌ Duplicate error |
| **Computed types** | ❌ | ✅ `keyof`, `typeof`, условные типы |
| **Реализация классами** | ✅ `implements` | ✅ `implements` |

## Когда использовать что

### Interface - для объектов и публичных API
```typescript
// ✅ Хорошо для интерфейсов объектов
interface User {
  id: number;
  name: string;
}

// Расширение
interface Admin extends User {
  permissions: string[];
}

// Declaration merging (полезно для библиотек)
interface User {
  email: string; // автоматически объединится
}
```

### Type - для всего остального
```typescript
// ✅ Union types
type Status = 'idle' | 'loading' | 'success' | 'error';
type Theme = 'light' | 'dark';

// ✅ Computed types
type UserKeys = keyof User;
type PartialUser = Partial<User>;

// ✅ Conditional types
type NonNullable<T> = T extends null | undefined ? never : T;

// ✅ Function types
type EventHandler = (event: Event) => void;
```

## Практические примеры

### React Props
```typescript
// Предпочтительно interface для props
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

// Type для состояний
type LoadingState = 'idle' | 'pending' | 'resolved' | 'rejected';
```

### API типизация
```typescript
// Interface для данных
interface Product {
  id: string;
  name: string;
  price: number;
}

// Type для вариантов
type SortOrder = 'asc' | 'desc';
type ProductField = keyof Product;
```

## Возможные дополнительные вопросы

**Q: Можно ли использовать type для объектов?**
Да, но `interface` предпочтительнее - лучше для расширения и читаемости.

**Q: Что такое Declaration Merging?**
```typescript
interface Window {
  customProp: string;
}
// В другом файле
interface Window {
  anotherProp: number;
}
// Window теперь имеет оба свойства
```

**Q: Как выбрать между ними?**
- **Interface**: объекты, публичные API, когда нужно расширение
- **Type**: union types, computed types, алиасы примитивов

## Лучшие практики

1. **Для объектов** - используйте `interface`
2. **Для union/computed** - используйте `type`  
3. **В библиотеках** - `interface` (поддержка merging)
4. **Для приватных типов** - `type` (нет случайного merging)

```typescript
// ✅ Хорошо
interface User { name: string }
type Status = 'active' | 'inactive';

// ❌ Избегайте
type User = { name: string }; // лучше interface
interface Status { value: 'active' | 'inactive' } // лучше type
```
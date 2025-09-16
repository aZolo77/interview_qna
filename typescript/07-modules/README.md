# Модули в TypeScript

Модули в TypeScript помогают разделять код на логические части, обеспечивая его изоляцию, повторное использование и удобное управление зависимостями в больших проектах.

---

## Основные особенности модулей

### 1. Использование `import` и `export`  
- `export` делает переменные, функции или классы доступными за пределами модуля.  
- `import` используется для подключения экспортированных значений из других модулей.  

Пример:

```ts
// moduleA.ts  
export const greeting = "Hello, world!";  
export function sayHello() {  
  console.log(greeting);  
}  

// moduleB.ts  
import { greeting, sayHello } from './moduleA';  

console.log(greeting); // "Hello, world!"  
sayHello(); // "Hello, world!"  
```

---

### 2. Экспорт по умолчанию (`export default`)  
Позволяет экспортировать одну сущность из модуля.  

Пример:

```ts
// mathUtils.ts  
export default function add(a: number, b: number) {  
  return a + b;  
}  

// app.ts  
import add from './mathUtils';  
console.log(add(2, 3)); // 5  
```

---

### 3. Разделение на внутренние и внешние модули  
- Внутренние модули (старый синтаксис `namespace`) почти не используются.  
- Внешние модули (через `import/export`) — современный и рекомендуемый стандарт.  

---

### 4. Дополнительно полезно знать на собеседовании  
- Модули компилируются в формат, указанный в `tsconfig.json` (`commonjs`, `esnext`, `amd`, `system`).  
- `esnext` позволяет использовать нативные ES-модули в браузерах.  
- Для работы в Node.js используется `commonjs` (или `ESM`, если проект поддерживает).  
- `barrel-файлы` (index.ts с реэкспортами) помогают упростить импорты.  

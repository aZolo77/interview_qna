Декораторы в TypeScript — это экспериментальная возможность, которая позволяет модифицировать или аннотировать классы, их методы, свойства и параметры во время компиляции. По сути, декораторы — это функции, которые принимают в качестве аргументов цель (target), к которой они применяются, и могут изменять её поведение или добавлять дополнительную логику.

⚡ Важно: декораторы включаются через настройку `experimentalDecorators: true` в tsconfig.json.

Они особенно полезны в крупных приложениях и фреймворках, например, в Angular, где активно применяются для DI (dependency injection), работы с сервисами и компонентами.

---

### Виды декораторов:

**1. Декоратор класса**
Применяется к классу и получает конструктор как аргумент.

```ts
function logClass(target: Function) {
  console.log('Class decorator called for:', target.name);
}

@logClass
class MyClass {}
```

---

**2. Декоратор метода**
Позволяет изменять или расширять поведение методов.

```ts
function logMethod(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(`Method ${key} called with`, args);
    return original.apply(this, args);
  };
}

class MyClass {
  @logMethod
  greet(name: string) {
    return `Hello, ${name}`;
  }
}
```

---

**3. Декоратор свойства**
Используется для работы с определённым свойством.

```ts
function logProperty(target: any, key: string) {
  console.log(`Property decorator applied on: ${key}`);
}

class MyClass {
  @logProperty
  myProperty: string = '';
}
```

---

**4. Декоратор параметра**
Может отслеживать использование параметров метода.

```ts
function logParameter(target: any, key: string, index: number) {
  console.log(`Parameter decorator on ${key} at position ${index}`);
}

class MyClass {
  greet(@logParameter name: string) {}
}
```

---

### Практическое применение в frontend:
- **В Angular**:  
  - `@Component` — определяет компонент.  
  - `@Injectable` — делает класс доступным для dependency injection.  
  - `@Input` и `@Output` — для обмена данными между компонентами.

- **В NestJS (бэкенд, но полезно знать)**:  
  - `@Controller`, `@Get`, `@Post` — для маршрутизации.  
  - `@UseGuards`, `@UseInterceptors` — для безопасности и обработки запросов.

---

✅ На собеседовании стоит упомянуть:
- что декораторы — это синтаксический сахар поверх функций высшего порядка;  
- они активно применяются в Angular, NestJS, TypeORM;  
- без включенной опции `experimentalDecorators` использовать их нельзя;  
- декораторы помогают уменьшить бойлерплейт и структурировать код.

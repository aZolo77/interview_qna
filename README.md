# 🚀 Frontend Interview Guide

> Структурированная подготовка к техническим собеседованиям на позицию Frontend разработчика

## 📚 Содержание

### CSS & HTML
- [01. Разница между «сбросом» и «нормализацией» CSS](./css-html/01-reset-normalize/)
- [02. Специфичность CSS-селекторов](./css-html/02-css-specificity/)
- [03. Составные части HTML5](./css-html/03-html-web-platform/)
- [04. Grid VS Flexbox](./css-html/04-grid-vs-flexbox/)
- [05. Доступность (Accessibility, A11y) в веб-разработке](./css-html/05-accessibility/)
- [06. SEO: основные инструменты и практики](./css-html/06-seo/)
- [07. Web Components и Shadow DOM](./css-html/07-web-components-shadow-dom/)
- [08. Контекст наложения (Stacking Context) в CSS](./css-html/08-stacking-context/)
- [09. Вендорные префиксы (Vendor prefixes) в CSS](./css-html/09-vendor-prefixes/)

### JavaScript Основы
- [01. Разница между let, var и const](./javascript/01-let-var-const/)
- [02. Cookie, sessionStorage и localStorage](./javascript/02-storage-comparison/)
- [03. Что такое NaN](./javascript/03-nan/)
- [04. Event Loop](./javascript/04-event-loop/)
- [05. Разница между .call() и .apply()](./javascript/05-call-apply/)
- [06. Анонимные функции](./javascript/06-anonymous-functions/)
- [07. Типы данных](./javascript/07-data-types/)
- [08. Ключевое слово `this`](./javascript/08-this-key-word/)
- [09. Наследование](./javascript/09-inheritance/)
- [10. Разница между `==` и `===`](./javascript/10-strict-loose-comparison/)
- [11. Замыкания (Closures)](./javascript/11-closures/)
- [12. Область видимости (Scope) и цепочка областей видимости (Scope Chain)](./javascript/12-scope-chain/)
- [13. Promise и его состояния](./javascript/13-promise/)
- [14. Разница и сходство между null и undefined](./javascript/14-null-undefined/)
- [15. Функции высшего порядка](./javascript/15-hof/)
- [16. Async/Await](./javascript/16-async-await/)
- [17. Spread vs Rest оператор](./javascript/17-spread-rest/)
- [18. Как определить наличие свойства в объекте](./javascript/18-has-own-property/)
- [19. Чем отличается `Map` от `WeakMap`](./javascript/19-map-vs-weakmap/)
- [20. Чем отличается `Set` от `WeakSet`](./javascript/20-set-vs-weakset/)
- [21. Как работает сборщик мусора](./javascript/21-garbage-collector/)
- [22. Что такое контекст выполнения](./javascript/22-execution-context/)
- [23. Что такое стек вызовов](./javascript/23-call-stack/)
- [24. Что такое JavaScript AST (Abstract Syntax Tree)](./javascript/24-ast/)
- [25. Web Workers](./javascript/25-web-workers/)
- [26. Service Workers](./javascript/26-service-workers/)
- [27. Объект Proxy](./javascript/27-proxy/)
- [28. Генераторы](./javascript/28-generators/)

### Производительность
- [01. Прогрессивная отрисовка](./performance/01-progressive-rendering/)
- [02. Атрибуты тега Script | Async VS Defer](./performance/02-defer-vs-async/)
- [03. Lazy Loading изображений](./performance/03-lazy-loading-images/)
- [04. Оптимизация изображений | srcset и picture](./performance/04-responsive-images/)
- [05. Web Performance и ключевые метрики](./performance/05-key-metrics/)

### Сетевое взаимодействие
- [01. Всё о REST API | базовые HTTP запросы](./networking/01-rest-api/)
- [02. Трёхстороннее рукопожатие](./networking/02-tcp-handshake/)
- [03. Реализация Long Polling, WebSockets и Server-Sent Events](./networking/03-realtime/)
- [04. Протоколы и подходы для общения клиент ↔ сервер](./networking/04-client-server/)
- [05. WebSocket](./networking/05-websocket/)
- [06. Server-Sent Events (SSE)](./networking/06-sse/)

### React
- [Скоро будет добавлено...]

### NextJS
- [01. Разница между CSR, SSR, SSG, ISR](./nextjs/01-csr-ssr-ssg-isr/)

### TypeScript
- [01. Что такое TypeScript и чем он отличается от JavaScript](./typescript/01-typescript-basics/)
- [02. Компилятор TypeScript](./typescript/02-typescript-compiler/)
- [03. Встроенные типы TypeScript](./typescript/03-built-in-types/)
- [04. ООП принципы в TypeScript](./typescript/04-oop/)
- [05. Интерфейсы vs Классы](./typescript/05-interfaces-vs-classes/)
- [06. Interface vs Type](./typescript/06-interface-vs-type/)
- [07. Модули в TypeScript](./typescript/07-modules/)
- [08. Перегрузка функций](./typescript/08-function-overload/)
- [09. Разница между типами объединения (Union) и пересечения (Intersection)](./typescript/09-union-intersection/)
- [10. Extends vs Implements](./typescript/10-extends-vs-implements/)
- [11. Type Assertions](./typescript/11-type-assertions/)
- [12. Для чего используется оператор keyof](./typescript/12-keyof-operator/)
- [13. Модификаторы Доступа](./typescript/13-access-modifiers/)
- [14. Generics](./typescript/14-generics/)
- [15. Mixins](./typescript/15-mixins/)
- [16. Enum](./typescript/16-enum/)
- [17. Conditional Types](./typescript/17-conditional-types/)
- [18. Чем отличаются any, never и unknown](./typescript/18-any-never-unknown/)
- [19. Mapped Types](./typescript/19-mapped-types/)
- [20. Декораторы](./typescript/20-decorators/)
- [21. Утилиты (Utility Types)](./typescript/21-utilities/)
- [22. Map-файлы](./typescript/22-map-files/)

### Паттерны проектирования
- [01. Паттерны проектирования: Порождающие, Структурные, Поведенческие](./patterns/01-creational-structural-behavioral/)
- [02. Порождающие паттерны: Фабричный метод и Абстрактная фабрика](./patterns/02-fabric/)
- [03. Порождающий паттерн: Singleton (Одиночка)](./patterns/03-singleton/)
- [04. Порождающий паттерн: Builder (Строитель)](./patterns/04-builder/)
- [05. Порождающий паттерн: Prototype (Прототип, Клон)](./patterns/05-prototype/)
- [06. Структурный паттерн: Adapter (Адаптер, Обёртка)](./patterns/06-adapter/)
- [07. Структурный паттерн: Bridge (Мост)](./patterns/07-bridge/)

### Тестирование
- [01. Подходы к разработке: TDD, BDD и другие](./testing/01-tdd-bdd/)
- [02. Виды тестов: Unit, Integration и E2E](./testing/02-unit-e2e-intergation/)
- [03. Прочие виды тестов](./testing/03-additional-test-types/)
- [04. Инструменты для тестирования во Frontend](./testing/04-testing-tools/)

### Инструменты и сборка
- [01. Webpack, разбиение на чанки, tree shaking, plugins. Webpack vs Vite](./tooling/01-webpack-vs-vite/)

### Общие вопросы
- [01. Как работает браузер](./common-questions/01-browser-work/)
- [02. Что такое DOM](./common-questions/02-dom/)
- [03. Что такое CI/CD](./common-questions/03-ci-cd/)


## 🎯 Как использовать этот репозиторий

### Для изучения теории:
1. Перейдите в нужную тему
2. Изучите `README.md` с теоретическими основами
3. Просмотрите практические примеры в `examples.js`

### Для подготовки к собеседованию:
- Используйте README файлы как шпаргалки
- Запускайте примеры кода для лучшего понимания
- Повторяйте ключевые моменты перед собеседованием

## 📁 Структура проекта

```
frontend-interview-guide/
├── README.md                 # Главная страница
├── javascript/              # JavaScript вопросы
│   ├── 01-let-var-const/
│   │   ├── README.md        # Теория и конспект
│   │   └── examples.js      # Практические примеры
│   ├── 02-storage-comparison/
│   │   ├── README.md
│   │   └── examples.js
│   └── ...
├── react/                   # React вопросы
├── typescript/              # TypeScript вопросы
├── css-html/               # CSS и HTML вопросы
├── algorithms/             # Алгоритмы и структуры данных
├── performance/            # Оптимизация и производительность
└── tools/                  # Инструменты разработки
```

## 🤝 Участие в развитии

Нашли ошибку или хотите добавить новый вопрос? Создайте Issue или Pull Request!

## 📝 Лицензия

MIT License - используйте свободно для подготовки к собеседованиям.

---

⭐ **Полезно?** Поставьте звездочку репозиторию!
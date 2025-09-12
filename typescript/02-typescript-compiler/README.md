## Основная суть

**tsc транспилирует TypeScript → JavaScript + проводит проверку типов**

Компилятор удаляет всю информацию о типах и преобразует современный синтаксис в совместимый JavaScript для целевой среды.

## Как работает компилятор

### Процесс компиляции

1. **Парсинг** - анализ синтаксиса и создание AST
2. **Type Checking** - проверка типов и семантики
3. **Emit** - генерация JavaScript кода
4. **Source Maps** (опционально) - связывание TS и JS для отладки

### Основные команды

```bash
# Компиляция одного файла
tsc file.ts

# Компиляция проекта
tsc

# Режим наблюдения (watch mode)
tsc --watch

# Только проверка типов без генерации JS
tsc --noEmit
```

## Конфигурация через tsconfig.json

### Основные секции

```json
{
  "compilerOptions": {
    "target": "ES2020",           // Целевая версия JavaScript
    "module": "commonjs",         // Система модулей
    "lib": ["DOM", "ES2020"],     // Доступные библиотеки
    "outDir": "./dist",           // Папка для вывода JS
    "rootDir": "./src",           // Корневая папка TS
    "strict": true,               // Строгие проверки типов
    "esModuleInterop": true,      // Совместимость с CommonJS
    "skipLibCheck": true,         // Пропуск проверки .d.ts файлов
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],        // Какие файлы включать
  "exclude": ["node_modules"]     // Какие исключать
}

```

## Режимы работы

### Development режим

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "sourceMap": true,
    "incremental": true,  // Быстрая пересборка
    "tsBuildInfoFile": ".tsbuildinfo"
  }
}
```

### Production режим

```json
{
  "compilerOptions": {
    "target": "ES5",      // Лучшая совместимость
    "minify": true,       // Минификация (через bundler)
    "removeComments": true,
    "sourceMap": false
  }
}
```

## Интеграция с инструментами

### Сборщики (Bundlers)

- **Webpack**: `ts-loader` или `babel-loader` + `@babel/preset-typescript`
- **Vite**: встроенная поддержка TypeScript
- **Rollup**: `@rollup/plugin-typescript`
- **esbuild**: нативная поддержка (быстрая альтернатива tsc)

### Различия подходов

- **tsc**: полная проверка типов + компиляция
- **Babel**: только транспиляция без проверки типов (быстрее)
- **esbuild/swc**: очень быстрая компиляция, базовая проверка типов

## Возможные дополнительные вопросы

**Q: В чем разница между компиляцией и транспиляцией?**

- **Компиляция**: высокоуровневый → машинный код
- **Транспиляция**: язык → язык того же уровня (TS → JS)
- TypeScript технически выполняет транспиляцию

**Q: Что такое incremental compilation?**

- Сохранение информации о предыдущих сборках в `.tsbuildinfo`
- Компиляция только измененных файлов
- Значительно ускоряет повторные сборки

**Q: Как настроить строгие проверки типов?**

```json
{
  "compilerOptions": {
    "strict": true,                    // Включает все строгие опции
    "noImplicitAny": true,            // Запрет implicit any
    "strictNullChecks": true,         // Строгие проверки null/undefined
    "strictFunctionTypes": true,      // Строгие типы функций
    "noImplicitReturns": true         // Все пути должны возвращать значение
  }
}
```

**Q: Что делать, если компиляция медленная?**

- Использовать `skipLibCheck: true`
- Настроить правильные `include`/`exclude`
- Включить `incremental: true`
- Рассмотреть альтернативы: esbuild, swc
- Использовать Project References для больших проектов

**Q: Как работает type checking в CI/CD?**

```bash
# В package.json
"scripts": {
  "type-check": "tsc --noEmit",
  "build": "tsc",
  "dev": "tsc --watch"
}
```
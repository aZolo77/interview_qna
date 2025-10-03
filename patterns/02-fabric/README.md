# 🎨 Порождающие паттерны: Фабричный метод и Абстрактная фабрика

# 📌 Фабричный метод (Factory Method)

### Определение

Фабричный метод — это паттерн, который определяет общий интерфейс для создания объектов, но позволяет подклассам решать, какой именно объект создавать.

### Задача

- Делегировать процесс создания объектов подклассам.
- Избавиться от жёсткой привязки к конкретным классам.

### Когда использовать

- Когда заранее неизвестно, объекты каких классов нужно будет создавать.
- Когда нужно централизовать создание объектов.

### Пример в JS

Представим, что у нас есть разные типы кнопок:

```jsx
// Продукты - разные типы логгеров
class Logger {
  log(message) {
    throw new Error("Метод log() должен быть реализован");
  }
}

class ConsoleLogger extends Logger {
  log(message) {
    console.log(`[Console] ${new Date().toISOString()}: ${message}`);
  }
}

class FileLogger extends Logger {
  constructor(filename) {
    super();
    this.filename = filename;
  }
  
  log(message) {
    console.log(`[File: ${this.filename}] ${new Date().toISOString()}: ${message}`);
    // В реальности здесь была бы запись в файл
  }
}

class DatabaseLogger extends Logger {
  constructor(connectionString) {
    super();
    this.connectionString = connectionString;
  }
  
  log(message) {
    console.log(`[DB: ${this.connectionString}] ${new Date().toISOString()}: ${message}`);
    // В реальности здесь была бы запись в БД
  }
}

// Создатели - определяют какой логгер использовать
class Application {
  constructor() {
    this.logger = this.createLogger();
  }
  
  createLogger() {
    throw new Error("Метод createLogger() должен быть реализован");
  }
  
  run() {
    this.logger.log("Приложение запущено");
    this.logger.log("Выполняется работа...");
    this.logger.log("Приложение завершено");
  }
}

class DevelopmentApp extends Application {
  createLogger() {
    return new ConsoleLogger();
  }
}

class ProductionApp extends Application {
  createLogger() {
    return new FileLogger("/var/log/app.log");
  }
}

class EnterpriseApp extends Application {
  createLogger() {
    return new DatabaseLogger("mongodb://prod-server:27017");
  }
}

// Использование
console.log("=== Development ===");
const devApp = new DevelopmentApp();
devApp.run();

console.log("\n=== Production ===");
const prodApp = new ProductionApp();
prodApp.run();

console.log("\n=== Enterprise ===");
const enterpriseApp = new EnterpriseApp();
enterpriseApp.run();
```

### Плюсы

- Избавляет от прямого создания объектов.
- Упрощает поддержку и расширяемость.

### Минусы

- Увеличивает количество классов.
- Может усложнить структуру проекта.

---

## 🏭 Абстрактная фабрика (Abstract Factory)

### Определение

Абстрактная фабрика — это паттерн, который позволяет создавать целые **семейства взаимосвязанных объектов** без указания их конкретных классов.

### Задача

- Инкапсулировать создание связанных объектов.
- Гарантировать совместимость продуктов в одном семействе.

### Когда использовать

- Когда система должна быть независимой от способа создания объектов.
- Когда нужно создавать семейства связанных объектов.

### Пример в JS

Допустим, у нас есть интерфейсы для UI под разные ОС:

```jsx
// Продукты
class WinButton {
  render() {
    console.log("Windows Button");
  }
}
class WinCheckbox {
  render() {
    console.log("Windows Checkbox");
  }
}
class MacButton {
  render() {
    console.log("MacOS Button");
  }
}
class MacCheckbox {
  render() {
    console.log("MacOS Checkbox");
  }
}

// Фабрики
class WinFactory {
  createButton() {
    return new WinButton();
  }
  createCheckbox() {
    return new WinCheckbox();
  }
}

class MacFactory {
  createButton() {
    return new MacButton();
  }
  createCheckbox() {
    return new MacCheckbox();
  }
}

// Использование
function app(factory) {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();
  button.render();
  checkbox.render();
}

app(new WinFactory());
// Windows Button
// Windows Checkbox
```

### Плюсы

- Гарантирует совместимость объектов внутри одного семейства.
- Упрощает замену целых семейств продуктов.

### Минусы

- Усложняет код из-за множества классов.
- Требует изменений при добавлении нового продукта в семейство.

---

## ⚖️ Сравнение

| Паттерн | Основная идея | Пример использования |
| --- | --- | --- |
| Фабричный метод | Делегирует создание объектов подклассам | Разные типы логгеров |
| Абстрактная фабрика | Создает целые семейства взаимосвязанных объектов | UI для разных ОС (кнопки + чекбоксы) |
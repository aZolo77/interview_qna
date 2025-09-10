# Что такое JavaScript AST (Abstract Syntax Tree)?

**AST (Абстрактное синтаксическое дерево)** — это древовидное представление структуры исходного кода программы.

**Процесс создания:**
1. **Лексический анализ** — разбиение кода на токены (ключевые слова, операторы, идентификаторы)
2. **Синтаксический анализ** — построение дерева на основе грамматики языка

**Основные узлы AST:**
- **Program** — корневой узел
- **FunctionDeclaration** — объявления функций
- **VariableDeclaration** — объявления переменных
- **ExpressionStatement** — выражения
- **IfStatement** — условные конструкции

**Популярные парсеры:**
- babel-parser
- espree
- acorn
- esprima
- cherow

**Применение AST:**
- Транспиляция кода (Babel)
- Статический анализ
- Минификация
- Создание инструментов разработки

**Пример:**
```javascript
// Код:
function add(a, b) {
    return a + b;
}

// Упрощенная структура AST:
{
  "type": "Program",
  "body": [
    {
      "type": "FunctionDeclaration",
      "id": { "name": "add" },
      "params": [
        { "name": "a" },
        { "name": "b" }
      ],
      "body": {
        "type": "BlockStatement",
        "body": [
          {
            "type": "ReturnStatement",
            "argument": {
              "type": "BinaryExpression",
              "operator": "+",
              "left": { "name": "a" },
              "right": { "name": "b" }
            }
          }
        ]
      }
    }
  ]
}
```
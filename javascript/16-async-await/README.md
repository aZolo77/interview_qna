# Async/Await

## Определение
**async/await** — это синтаксический сахар над промисами, который делает асинхронный код в JavaScript похожим на синхронный.  
- `async` перед функцией означает, что она **всегда возвращает промис**.  
- `await` приостанавливает выполнение внутри функции до тех пор, пока промис не завершится (fulfilled/rejected).  

---

## Преимущества
- Линейный, читаемый код вместо «пирамиды из then()».
- Удобная обработка ошибок через `try/catch`.
- Возможность использовать обычные управляющие конструкции (`if`, `for`, `while`).

---

## Примеры

### 1. Работа с API

```js
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        
        console.log(data);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

fetchData();
```

---

### 2. Задержка с использованием Promise

```js
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function delayedFunction() {
    console.log('Начало выполнения');
    await delay(2000);
    console.log('Задержка окончена');
}

delayedFunction();
```

---

### 3. Запрос через axios

```js
async function fetchData() {
    try {
        const response = await axios.get('https://api.example.com/data');
        console.log(response.data);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

fetchData();
```

---

## Важные моменты
- `await` можно использовать только внутри `async` функций.  
- Несколько независимых промисов лучше запускать через `Promise.all` для параллельного выполнения:

```js
async function loadData() {
    const [user, posts] = await Promise.all([
        fetch('/user').then(r => r.json()),
        fetch('/posts').then(r => r.json())
    ]);

    console.log(user, posts);
}
```

- Под капотом async/await всё равно работает через **event loop** и промисы — это не «синхронность», а просто удобный синтаксис.

---

## Итог
- `async/await` = удобная оболочка над промисами.  
- Код становится чище и понятнее, особенно при цепочках асинхронных вызовов.  
- Но важно помнить о параллельности (`Promise.all`) и не блокировать асинхронный поток.

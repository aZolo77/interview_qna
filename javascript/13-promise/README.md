# Promise и его состояния

## Что такое Promise?
**Promise** — это объект в JavaScript, представляющий результат асинхронной операции. Он позволяет «подписаться» на успешное завершение или ошибку, вместо того чтобы блокировать выполнение программы.

## Состояния Promise
1. **Pending (ожидание)** — начальное состояние, операция ещё выполняется.  
2. **Fulfilled (выполнен)** — операция завершилась успешно, есть результат.  
3. **Rejected (отклонён)** — операция завершилась с ошибкой, есть причина.

После перехода из `pending` в `fulfilled` или `rejected` состояние становится **неизменным** (promise — "immutable").

---

## Основные методы
- **then(onFulfilled, onRejected)** — обрабатывает результат или ошибку.  
- **catch(onRejected)** — обрабатывает ошибку (синтаксический сахар для `then(null, onRejected)`).  
- **finally(onFinally)** — вызывается всегда, независимо от успеха или ошибки. Удобно для "очистки" (например, спрятать спиннер).

---

## Пример использования

```js
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = 'Some data';
            // Успех:
            resolve(data);
            // Ошибка:
            // reject('Error occurred');
        }, 2000);
    });
}

fetchData()
    .then(result => {
        console.log('Результат:', result);
    })
    .catch(error => {
        console.log('Ошибка:', error);
    })
    .finally(() => {
        console.log('Операция завершена');
    });
```

---

## Статические методы Promise
- **Promise.all([p1, p2, ...])** — ждёт все промисы, если хоть один упал → `rejected`.  
- **Promise.race([p1, p2, ...])** — возвращает результат первого завершившегося (успех или ошибка).  
- **Promise.allSettled([p1, p2, ...])** — ждёт все промисы, возвращает массив статусов (`fulfilled`/`rejected`).  
- **Promise.any([p1, p2, ...])** — ждёт первый успешно выполненный промис (если все упали → `AggregateError`).

---

## Promise и async/await
`async/await` — синтаксический сахар над промисами:
- `async` функция **всегда возвращает Promise**.  
- `await` приостанавливает выполнение до завершения промиса.  

Пример:

```js
async function main() {
    try {
        const result = await fetchData();
        console.log('Результат через async/await:', result);
    } catch (error) {
        console.log('Ошибка через async/await:', error);
    } finally {
        console.log('Всегда выполняется');
    }
}

main();
```

---

## Итог для собеседования
- Promise = объект для работы с асинхронностью.  
- 3 состояния: pending → fulfilled / rejected.  
- Методы: then / catch / finally.  
- Уметь объяснить разницу между `Promise.all`, `race`, `allSettled`, `any`.  
- Async/await = удобный синтаксис работы с промисами.

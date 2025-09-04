# Реализация Long Polling, WebSockets и Server-Sent Events в JavaScript

## 📌 Связь с REST API
- **REST API** — это классический запрос-ответ: клиент отправил запрос → сервер вернул ответ.
- **Long Polling, WebSockets и SSE** решают другую задачу — обновление данных в реальном времени.
- Часто они используются **вместе**:  
  - REST для начальной загрузки данных.  
  - WebSockets/SSE/Long Polling для получения обновлений.  

---

## 🔹 Long Polling
### Как работает
1. Клиент делает `fetch` на сервер.
2. Сервер **держит соединение открытым**, пока не появятся новые данные.
3. Когда данные приходят → сервер отвечает → клиент сразу делает новый запрос.

### Пример
```js
async function longPoll() {
  try {
    const response = await fetch('/updates');
    const data = await response.json();
    console.log('Новое сообщение:', data);

    // Сразу делаем новый запрос
    longPoll();
  } catch (err) {
    console.error('Ошибка:', err);
    setTimeout(longPoll, 5000); // повторить через 5 секунд при ошибке
  }
}

longPoll();
```

---

## 🔹 WebSockets
### Как работает
- После первого соединения через HTTP открывается **постоянный канал**.
- И клиент, и сервер могут слать данные в любую сторону.

### Пример
```js
// Создаём соединение
const socket = new WebSocket('ws://localhost:8080');

// Получение сообщения
socket.onmessage = (event) => {
  console.log('Новое сообщение:', event.data);
};

// Отправка сообщения
socket.onopen = () => {
  socket.send('Привет, сервер!');
};
```

---

## 🔹 Server-Sent Events (SSE)
### Как работает
- Клиент открывает соединение через `EventSource`.
- Сервер может **стримить события** бесконечно долго.

### Пример
```js
// Создание соединения
const eventSource = new EventSource('/events');

// Обработка сообщений
eventSource.onmessage = (event) => {
  console.log('Новое событие:', event.data);
};

// Обработка ошибок
eventSource.onerror = (error) => {
  console.error('Ошибка SSE:', error);
};
```

---

## 📊 Сравнение

| Технология       | Направление         | Использование в JS |
|------------------|---------------------|--------------------|
| **Long Polling** | двусторонне (через повторные запросы) | `fetch()` в цикле |
| **WebSockets**   | двусторонне (постоянное соединение)   | `new WebSocket()` |
| **SSE**          | только сервер → клиент               | `new EventSource()` |

---

## ✅ Итог
- REST API = запрос-ответ.  
- Long Polling, WebSockets, SSE = "реальное время".  
- Обычно комбинируют: REST → для начальных данных, WebSockets/SSE → для обновлений.

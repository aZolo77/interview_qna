# 🪝 Кастомный хук `useFetch`

## ✅ Условие
Хук должен:
- Принимать **URL**.
- Возвращать **данные**, **состояние загрузки**, **ошибку**.
- Самостоятельно загружать данные при изменении URL.

---

## 💡 Решение

```js
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController(); // отмена запроса при размонтировании
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort(); // очистка при анмаунте
  }, [url]);

  return { data, loading, error };
};
```

---

## 🧩 Как использовать

```js
const Users = () => {
  const { data, loading, error } = useFetch('https://api.example.com/users');

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  return <List items={data} />;
};
```

---

## 🧠 Комментарий
- ✅ Подход верный: useState + useEffect + async fetch.
- ⚙️ Добавлен **AbortController**, чтобы избежать утечек памяти при анмаунте.
- ⚡ Проверяется `response.ok` для корректной обработки ошибок.
- ❗ Лучше не вызывать `fetchData()` без проверки `url`, чтобы избежать лишних запросов.

**Итог:** решение рабочее и подходит для реальных проектов, особенно если добавить отмену и обработку ошибок.
# 🔍 Autocomplete с debounce

## ✅ Условие
Нужно сделать поле ввода, которое отправляет запрос к API **не сразу при каждом изменении**, а **с задержкой** (debounce), чтобы не перегружать сервер.

---

## 💡 Решение

```js
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

const Autocomplete = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [debouncedQuery] = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    fetch(`/api/search?q=${debouncedQuery}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setResults(data))
      .catch((err) => {
        if (err.name !== 'AbortError') console.error(err);
      });

    return () => controller.abort();
  }, [debouncedQuery]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введите запрос..."
      />
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

---

## 🧠 Комментарий

- ✅ Подход правильный: `useDebounce` + `useEffect` для запросов.  
- ⚙️ Добавлен `AbortController` для отмены запроса при изменении ввода.  
- 🧩 Проверка на пустую строку (`if (!debouncedQuery)`) помогает очищать результаты, если пользователь стер текст.  
- ⚡ Можно вынести логику в кастомный хук `useDebouncedFetch`, если понадобится переиспользовать.

**Итог:** решение рабочее и оптимизированное для продакшена — debounce снижает нагрузку, запросы отменяются корректно, интерфейс отзывчив.
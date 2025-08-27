# Прогрессивная отрисовка (Progressive Rendering)

## 🎯 Определение

**Прогрессивная отрисовка** — это метод веб-разработки, при котором содержимое веб-страницы отображается поэтапно по мере загрузки, вместо ожидания полной загрузки всех ресурсов.

## ✅ Преимущества

### Пользовательский опыт
- **Быстрый First Paint** - пользователь видит контент раньше
- **Интерактивность** - можно взаимодействовать с частично загруженной страницей
- **Perceived Performance** - ощущение более быстрой работы

### Производительность
- **Меньше блокирующих ресурсов**
- **Оптимизация Critical Rendering Path**
- **Снижение Time to Interactive (TTI)**
- **Экономия трафика** - загружается только необходимое

## 🔧 Основные техники

### 1. Critical CSS
- Инлайн критических стилей в `<head>`
- Асинхронная загрузка остальных CSS
- Удаление неиспользуемого CSS

### 2. Lazy Loading (Ленивая загрузка)
- **Изображения** - загрузка при появлении в viewport
- **Скрипты** - загрузка по требованию
- **Компоненты** - динамическая подгрузка

### 3. Code Splitting
- Разделение JS на чанки
- Dynamic imports
- Route-based splitting

### 4. Server-Side Rendering (SSR)
- HTML генерируется на сервере
- Hydration на клиенте
- Быстрый First Contentful Paint

### 5. Streaming
- **HTML Streaming** - отправка HTML частями
- **CSS-in-JS** с streaming
- Progressive hydration

## 📊 Метрики производительности

### Core Web Vitals
- **LCP (Largest Contentful Paint)** - время загрузки основного контента
- **FID (First Input Delay)** - время до первого взаимодействия
- **CLS (Cumulative Layout Shift)** - стабильность макета

### Дополнительные метрики
- **FCP (First Contentful Paint)** - первый контент
- **TTI (Time to Interactive)** - время до интерактивности
- **FMP (First Meaningful Paint)** - значимый контент

## 🛠️ Инструменты и технологии

### Встроенные браузерные API
- `loading="lazy"` для изображений
- `Intersection Observer API`
- `link rel="preload"` и `rel="prefetch"`

### Библиотеки и фреймворки
- **React**: React.lazy, Suspense
- **Vue**: Async components
- **Next.js**: Automatic code splitting
- **Webpack**: Dynamic imports, splitChunks

### Инструменты оптимизации
- **Lighthouse** - аудит производительности
- **WebPageTest** - детальный анализ
- **Chrome DevTools** - профилирование

## 🎨 Паттерны загрузки

### 1. Above-the-fold приоритет
- Критический контент загружается первым
- Некритический контент ниже экрана - позже

### 2. Skeleton Screens
- Показ структуры до загрузки контента
- Создание ощущения мгновенной загрузки

### 3. Progressive Enhancement
- Базовая функциональность работает сразу
- Улучшения добавляются по мере загрузки

## ⚡ Best Practices

### HTML
- Минимизация DOM на старте
- Критический HTML инлайн
- Использование semantic разметки

### CSS
- Critical CSS инлайн (до 14KB)
- Асинхронная загрузка некритичных стилей
- Избегание @import в CSS

### JavaScript
- Defer/async для скриптов
- Минимизация JavaScript на старте
- Tree shaking для удаления мертвого кода

### Изображения
- WebP/AVIF форматы
- Responsive images с srcset
- Placeholder'ы во время загрузки

## 🚫 Частые ошибки

- Загрузка слишком большого количества ресурсов сразу
- Блокирующие скрипты в `<head>`
- Отсутствие fallback'ов для медленного интернета
- Игнорирование Layout Shift
- Неоптимизированные изображения

## 📝 Частые вопросы на собеседовании

- Что такое Critical Rendering Path?
- Как измерить производительность загрузки?
- В чем разница между defer и async?
- Как реализовать lazy loading изображений?
- Что такое code splitting и зачем он нужен?
- Как работает Server-Side Rendering?
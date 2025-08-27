# Responsive Images с srcset и picture

## 📷 Что такое Responsive Images
Responsive images — это подход, при котором браузер сам выбирает картинку подходящего размера и качества в зависимости от:
- ширины экрана,
- плотности пикселей (Retina/HiDPI),
- условий сети (частично).

Для этого используются атрибуты `srcset`, `sizes` и тег `<picture>`.

---

## 🔹 srcset и sizes

### Пример с разными размерами изображений
```html
<img 
  src="img-small.jpg" 
  srcset="img-small.jpg 480w, img-medium.jpg 800w, img-large.jpg 1200w"
  sizes="(max-width: 600px) 480px, (max-width: 900px) 800px, 1200px"
  alt="Картинка">
```

- `srcset` — список картинок с их шириной (`w`).
- `sizes` — подсказывает браузеру, какой размер картинки реально займёт `<img>` в вёрстке.
- Браузер сам решает, какую картинку загрузить.

---

## 🔹 Retina / HiDPI изображения
```html
<img 
  src="photo@1x.jpg" 
  srcset="photo@1x.jpg 1x, photo@2x.jpg 2x" 
  alt="Фото">
```

- `1x` — обычный дисплей.
- `2x` — Retina-дисплей, где плотность пикселей выше.

Браузер сам выберет правильный вариант.

---

## 🔹 picture для разных форматов
```html
<picture>
  <source srcset="img.avif" type="image/avif">
  <source srcset="img.webp" type="image/webp">
  <img src="img.jpg" alt="Фото">
</picture>
```

- Если браузер поддерживает AVIF → загрузит `img.avif`.
- Если не поддерживает AVIF, но есть WebP → загрузит `img.webp`.
- Если старый браузер → загрузит `img.jpg`.

---

## 🚦 Важность для оптимизации
- Экономит **трафик** (на мобильных устройствах не грузим огромные картинки).
- Ускоряет **LCP (Largest Contentful Paint)**.
- Даёт чёткие изображения на **Retina** без лишней нагрузки.

---

## 📝 Шпаргалка
- Используй `srcset + sizes`, если нужно менять **размер картинки** под экран.
- Используй `<picture>`, если нужно **поддерживать разные форматы (WebP, AVIF, JPEG)**.

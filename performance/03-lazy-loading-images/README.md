# Lazy loading изображений в HTML

## 1. Современный способ (рекомендуется)
HTML5 атрибут:
```html
<img src="big-photo.jpg" alt="Фото" loading="lazy">
```

- Браузер сам подгрузит изображение, когда оно окажется рядом с областью видимости.  
- Работает в большинстве современных браузеров.  

---

## 2. Через `IntersectionObserver`
HTML:
```html
<img data-src="big-photo.jpg" alt="Фото" class="lazy">
```

JS:
```javascript
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img.lazy");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        obs.unobserve(img);
      }
    });
  });

  images.forEach(img => observer.observe(img));
});
```

---

## 3. Старый способ (через scroll)
```javascript
function lazyLoad() {
  const images = document.querySelectorAll("img.lazy");
  const windowBottom = window.innerHeight + window.scrollY;

  images.forEach(img => {
    if (img.offsetTop < windowBottom) {
      img.src = img.dataset.src;
      img.classList.remove("lazy");
    }
  });
}

window.addEventListener("scroll", lazyLoad);
window.addEventListener("resize", lazyLoad);
document.addEventListener("DOMContentLoaded", lazyLoad);
```

---

### Итог:
- **Просто и быстро** → `loading="lazy"`.  
- **Нужна анимация/контроль** → `IntersectionObserver`.  
- **Старые браузеры** → fallback через `scroll`.  

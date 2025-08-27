// ===== LAZY LOADING ИЗОБРАЖЕНИЙ =====
// Intersection Observer для lazy loading
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ===== ДИНАМИЧЕСКИЙ ИМПОРТ КОМПОНЕНТОВ =====
// Code splitting с динамическими импортами
async function loadComponent() {
  try {
    const { default: HeavyComponent } = await import('./HeavyComponent.js');
    return HeavyComponent;
  } catch (error) {
    console.error('Ошибка загрузки компонента:', error);
  }
}

// Загрузка по клику
document.getElementById('loadBtn').addEventListener('click', async () => {
  const Component = await loadComponent();
  // Рендер компонента
});

// ===== АСИНХРОННАЯ ЗАГРУЗКА CSS =====
function loadCSS(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print'; // Не блокирует рендеринг
  link.onload = () => link.media = 'all'; // Применяем после загрузки
  document.head.appendChild(link);
}

// Загружаем некритичные стили
loadCSS('/styles/non-critical.css');

// ===== PROGRESSIVE ENHANCEMENT =====
// Базовая функциональность без JS
class ProgressiveForm {
  constructor(form) {
    this.form = form;
    this.enhance();
  }

  enhance() {
    // Добавляем улучшения только если JS доступен
    this.form.classList.add('js-enhanced');
    this.addValidation();
    this.addAutoSave();
  }

  addValidation() {
    // Клиентская валидация как улучшение
    this.form.addEventListener('input', this.validateField);
  }

  addAutoSave() {
    // Автосохранение как улучшение
    this.form.addEventListener('input', this.debounce(this.saveData, 500));
  }

  debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
}

// ===== SKELETON LOADER =====
function showSkeleton(container) {
  container.innerHTML = `
    <div class="skeleton">
      <div class="skeleton-header"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-text"></div>
    </div>
  `;
}

function loadContent(container) {
  showSkeleton(container);
  
  fetch('/api/content')
    .then(response => response.json())
    .then(data => {
      container.innerHTML = renderContent(data);
    });
}

// ===== PROGRESSIVE LOADING СТРАТЕГИЯ =====
class ProgressiveLoader {
  constructor() {
    this.loadQueue = [];
    this.loading = false;
  }

  // Загружаем критичный контент сначала
  async loadCritical() {
    await this.loadCSS('/styles/critical.css');
    await this.loadJS('/js/critical.js');
  }

  // Затем некритичный контент
  async loadNonCritical() {
    this.addToQueue('/styles/components.css');
    this.addToQueue('/js/analytics.js');
    this.addToQueue('/js/chat-widget.js');
    
    this.processQueue();
  }

  addToQueue(resource) {
    this.loadQueue.push(resource);
  }

  async processQueue() {
    if (this.loading || this.loadQueue.length === 0) return;
    
    this.loading = true;
    while (this.loadQueue.length > 0) {
      const resource = this.loadQueue.shift();
      await this.loadResource(resource);
    }
    this.loading = false;
  }

  async loadResource(url) {
    return new Promise((resolve) => {
      const isCSS = url.endsWith('.css');
      const element = isCSS 
        ? this.createLinkElement(url)
        : this.createScriptElement(url);
      
      element.onload = resolve;
      document.head.appendChild(element);
    });
  }
}

// ===== ИЗМЕРЕНИЕ ПРОИЗВОДИТЕЛЬНОСТИ =====
// Web Vitals API
function measurePerformance() {
  // First Contentful Paint
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach(entry => {
      console.log('FCP:', entry.startTime);
    });
  }).observe({ entryTypes: ['paint'] });

  // Largest Contentful Paint
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
  }).observe({ entryTypes: ['largest-contentful-paint'] });
}
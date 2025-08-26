// ===== COOKIE =====
// Установка cookie
document.cookie = "username=John; expires=Thu, 18 Dec 2025 12:00:00 UTC; path=/";
document.cookie = "theme=dark; max-age=3600"; // expire через час

// Чтение cookie (требует парсинга)
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
console.log(getCookie('username')); // "John"

// ===== SESSION STORAGE =====
// Установка данных
sessionStorage.setItem('currentStep', '3');
sessionStorage.setItem('formData', JSON.stringify({name: 'Alice', age: 25}));

// Получение данных
console.log(sessionStorage.getItem('currentStep')); // "3"
const userData = JSON.parse(sessionStorage.getItem('formData'));

// Удаление
sessionStorage.removeItem('currentStep');
sessionStorage.clear(); // очистить все

// ===== LOCAL STORAGE =====
// Установка данных
localStorage.setItem('userSettings', JSON.stringify({
  theme: 'dark',
  language: 'en'
}));

// Получение данных
const settings = JSON.parse(localStorage.getItem('userSettings'));
console.log(settings.theme); // "dark"

// Проверка существования
if (localStorage.getItem('userSettings')) {
  console.log('Настройки найдены');
}

// ===== ОБРАБОТКА ОШИБОК =====
try {
  localStorage.setItem('test', 'data');
} catch (e) {
  if (e.name === 'QuotaExceededError') {
    console.log('Хранилище переполнено');
  }
}

// ===== СОБЫТИЕ STORAGE =====
window.addEventListener('storage', (e) => {
  console.log(`Изменен ${e.key}: ${e.oldValue} → ${e.newValue}`);
});

// ===== РАЗМЕР ДАННЫХ =====
function getStorageSize() {
  let total = 0;

  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }
  
  return total;
}
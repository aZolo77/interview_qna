// ===== ПОРЯДОК ВЫПОЛНЕНИЯ =====

console.log('1'); // Синхронный код

setTimeout(() => console.log('2'), 0); // Macrotask

Promise.resolve().then(() => console.log('3')); // Microtask

console.log('4'); // Синхронный код

// Вывод: 1, 4, 3, 2

// ===== MICROTASKS VS MACROTASKS =====

setTimeout(() => console.log('setTimeout 1'), 0);
setTimeout(() => console.log('setTimeout 2'), 0);

Promise.resolve().then(() => console.log('Promise 1'));
Promise.resolve().then(() => console.log('Promise 2'));

// Вывод: Promise 1, Promise 2, setTimeout 1, setTimeout 2

// ===== БЛОКИРОВКА EVENT LOOP =====

// ❌ Блокирует Event Loop
function blockingLoop() {
  const start = Date.now();

  while (Date.now() - start < 3000) {
    // Блокируем на 3 секунды
  }

  console.log('Разблокировано');
}

// ✅ Неблокирующий подход
function nonBlockingLoop(duration, callback) {
  const start = Date.now();
  
  function check() {
    if (Date.now() - start >= duration) {
      callback();
    } else {
      setTimeout(check, 10); // Даем Event Loop поработать
    }
  }
  
  check();
}

// ===== ASYNC/AWAIT И EVENT LOOP =====

async function asyncExample() {
  console.log('1');
  
  await Promise.resolve();
  console.log('2'); // Microtask
  
  setTimeout(() => console.log('3'), 0); // Macrotask
  
  await new Promise(resolve => setTimeout(resolve, 0));
  console.log('4'); // После macrotask
}

// ===== МИКРОЗАДАЧИ МОГУТ БЛОКИРОВАТЬ =====

// ❌ Бесконечные микрозадачи блокируют макрозадачи
function infiniteMicrotasks() {
  Promise.resolve().then(infiniteMicrotasks);
}

setTimeout(() => console.log('Я никогда не выполнюсь'), 0);
// infiniteMicrotasks(); // Не запускайте!

// ===== ПРАКТИЧЕСКИЙ ПРИМЕР =====

// Симуляция загрузки данных с прогрессом
function loadDataWithProgress(callback) {
  let progress = 0;
  
  function updateProgress() {
    progress += 10;
    console.log(`Загружено: ${progress}%`);
    
    if (progress < 100) {
      setTimeout(updateProgress, 100); // Обновляем UI
    } else {
      callback('Данные загружены');
    }
  }
  
  updateProgress();
}

// ===== QUEUEMICROTASK =====

console.log('start');

setTimeout(() => console.log('timeout'), 0);

queueMicrotask(() => console.log('microtask'));

Promise.resolve().then(() => console.log('promise'));

console.log('end');

// Вывод: start, end, microtask, promise, timeout
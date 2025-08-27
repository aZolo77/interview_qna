// ===== БАЗОВЫЕ HTTP ЗАПРОСЫ =====

// GET - получение данных
async function getUsers() {
  try {
    const response = await fetch('/api/v1/users');

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const users = await response.json();

    return users;
  } catch (error) {
    console.error('Ошибка получения пользователей:', error);
  }
}

// POST - создание ресурса
async function createUser(userData) {
  try {
    const response = await fetch('/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      body: JSON.stringify(userData)
    });
    
    if (response.status === 201) {
      return await response.json();
    }

    throw new Error('Ошибка создания пользователя');
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

// PUT - полное обновление
async function updateUser(userId, userData) {
  const response = await fetch(`/api/v1/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });

  return response.json();
}

// PATCH - частичное обновление
async function updateUserEmail(userId, email) {
  const response = await fetch(`/api/v1/users/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });

  return response.json();
}

// DELETE - удаление
async function deleteUser(userId) {
  const response = await fetch(`/api/v1/users/${userId}`, {
    method: 'DELETE'
  });
  
  return response.status === 204; // No Content
}

// ===== РАБОТА С КОЛЛЕКЦИЯМИ =====

// Пагинация и фильтрация
async function getUsersWithPagination(page = 1, limit = 10, role = null) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString()
  });
  
  if (role) params.append('role', role);
  
  const response = await fetch(`/api/v1/users?${params}`);
  return response.json();
}

// Поиск и сортировка
async function searchUsers(query, sortBy = 'name', order = 'asc') {
  const params = new URLSearchParams({
    q: query,
    sort: sortBy,
    order: order
  });
  
  const response = await fetch(`/api/v1/users/search?${params}`);
  return response.json();
}

// ===== ОБРАБОТКА ОШИБОК =====

class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      // Обработка различных статус кодов
      switch (response.status) {
        case 200:
        case 201:
          return await response.json();
        case 204:
          return null; // No Content
        case 400:
          throw new Error('Неверный запрос');
        case 401:
          throw new Error('Требуется авторизация');
        case 403:
          throw new Error('Доступ запрещен');
        case 404:
          throw new Error('Ресурс не найден');
        case 409:
          throw new Error('Конфликт данных');
        case 500:
          throw new Error('Внутренняя ошибка сервера');
        default:
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // CRUD операции
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// ===== ИСПОЛЬЗОВАНИЕ API CLIENT =====
const api = new APIClient('/api/v1');

// Примеры использования
async function examples() {
  // Получить всех пользователей
  const users = await api.get('/users');
  
  // Создать пользователя
  const newUser = await api.post('/users', {
    name: 'John Doe',
    email: 'john@example.com'
  });
  
  // Обновить пользователя
  await api.patch(`/users/${newUser.id}`, {
    email: 'john.doe@example.com'
  });
  
  // Удалить пользователя
  await api.delete(`/users/${newUser.id}`);
}

// ===== КЭШИРОВАНИЕ =====
class CachedAPIClient extends APIClient {
  constructor(baseURL) {
    super(baseURL);
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 минут
  }

  async get(endpoint) {
    const cacheKey = endpoint;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    
    const data = await super.get(endpoint);
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  }

  invalidateCache(pattern) {
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }
}

// ===== INTERCEPTORS =====
class APIClientWithInterceptors extends APIClient {
  constructor(baseURL) {
    super(baseURL);
    this.requestInterceptors = [];
    this.responseInterceptors = [];
  }

  addRequestInterceptor(interceptor) {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor(interceptor) {
    this.responseInterceptors.push(interceptor);
  }

  async request(endpoint, options = {}) {
    // Применяем request interceptors
    let config = { ...options };
    for (const interceptor of this.requestInterceptors) {
      config = interceptor(config);
    }

    let response = await super.request(endpoint, config);

    // Применяем response interceptors
    for (const interceptor of this.responseInterceptors) {
      response = interceptor(response);
    }

    return response;
  }
}

// Добавление токена авторизации
const apiWithAuth = new APIClientWithInterceptors('/api/v1');
apiWithAuth.addRequestInterceptor(config => ({
  ...config,
  headers: {
    ...config.headers,
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
}));
// ===== ИЗМЕРЕНИЕ ВРЕМЕНИ HANDSHAKE =====

// Performance API для измерения времени установки соединения
function measureConnectionTime() {
  const startTime = performance.now();
  
  fetch('https://api.example.com/data')
    .then(response => {
      const endTime = performance.now();
      console.log(`Total time: ${endTime - startTime}ms`);
      return response.json();
    })
    .catch(error => console.error('Connection failed:', error));
}

// Resource Timing API - более детальная информация
function analyzeConnectionTiming() {
  // Получаем информацию о последнем запросе
  const entries = performance.getEntriesByType('navigation');
  const entry = entries[0];
  
  console.log('DNS lookup:', entry.domainLookupEnd - entry.domainLookupStart);
  console.log('TCP handshake:', entry.connectEnd - entry.connectStart);
  console.log('TLS handshake:', entry.secureConnectionStart > 0 ? 
    entry.connectEnd - entry.secureConnectionStart : 'No HTTPS');
  console.log('Total connection:', entry.connectEnd - entry.domainLookupStart);
}
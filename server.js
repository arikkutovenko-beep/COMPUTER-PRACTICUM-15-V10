const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Локальна база даних країн (Варіант 10)
const countries = [
  { code: 'UA', name: 'Ukraine', capital: 'Kyiv', population: 41000000, flag: '🇺🇦' },
  { code: 'FR', name: 'France', capital: 'Paris', population: 67000000, flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', capital: 'Rome', population: 59000000, flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', capital: 'Madrid', population: 47000000, flag: '🇪🇸' },
  { code: 'AT', name: 'Austria', capital: 'Vienna', population: 9000000, flag: '🇦🇹' },
  { code: 'JP', name: 'Japan', capital: 'Tokyo', population: 125000000, flag: '🇯🇵' }
];

// Роздача статичних файлів застосунку (HTML, CSS, JS, картинки)
app.use(express.static(__dirname));

// ПРАКТИКУМ №14: Ендпоінт списку всіх країн
app.get('/api/countries', (req, res) => {
  res.json(countries);
});

// ПРАКТИКУМ №14: Ендпоінт деталей країни за кодом/назвою з обробкою 404
app.get('/api/countries/:code', (req, res) => {
  const query = req.params.code.toLowerCase();
  const country = countries.find(
    c => c.code.toLowerCase() === query || c.name.toLowerCase() === query
  );

  if (!country) {
    return res.status(404).json({ error: 'Країну з таким кодом чи назвою не знайдено' });
  }

  res.json(country);
});

app.listen(PORT, () => {
  console.log(`Локальний сервер запущено: http://localhost:${PORT}`);
});
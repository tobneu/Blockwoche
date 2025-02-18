const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Statische Dateien aus dem "public"-Ordner bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API-Endpunkt, der die Events aus groupA.json lädt
app.get('/api/events', (req, res) => {
  fs.readFile(path.join(__dirname, 'data/groupA.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading groupA.json:', err);
      return res.status(500).json({ error: 'Unable to load events data' });
    }
    try {
      const events = JSON.parse(data);
      res.json(events);
    } catch (e) {
      console.error('Error parsing groupA.json:', e);
      res.status(500).json({ error: 'Invalid JSON data' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});

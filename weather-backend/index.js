const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

// Servir arquivos estáticos do front-end
app.use(express.static(path.join(__dirname, "../weather-frontend")));

// Rota base para verificar se o servidor está funcionando
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../weather-frontend", "index.html"));
});

// Rota para buscar o clima
app.get("/api/weather", (req, res) => {
  const cityName = req.query.city;
  const API_KEY = process.env.WEATHER_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "API key is missing in the environment variables" });
  }

  if (!cityName) {
    return res.status(400).json({ error: "City name is required in the query parameter" });
  }

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(cityName)}&days=2`;

  fetch(url)
    .then(resObj => resObj.json())
    .then(data => res.json(data))
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar dados do clima" });
    });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


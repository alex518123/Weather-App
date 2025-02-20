const express = require("express");
const fetch = require("node-fetch"); // Para chamadas HTTP
const cors = require("cors"); // Permitir requisições do front-end
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));


// Rota para buscar o clima
app.get("/api/weather", async (req, res) => {
  const cityName = req.query.city;
  const API_KEY = process.env.WEATHER_API_KEY; 

  // Verifica se a chave da API está configurada corretamente
  if (!API_KEY) {
    return res.status(500).json({ error: "API key is missing in the environment variables" });
  }

  // Verifica se o nome da cidade foi fornecido ANTES de fazer a requisição externa
  if (!cityName) {
    return res.status(400).json({ error: "City name is required in the query parameter" });
  }

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=2`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      // Se a resposta não for ok (por exemplo, 404 ou 500)
      return res.status(response.status).json({ error: "Failed to fetch weather data from external API" });
    }

    const data = await response.json();
    res.json(data); // Retorna os dados de clima para o front-end
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar dados do clima" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

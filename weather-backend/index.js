const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Usando a porta fornecida pelo Render ou 3000 se estiver localmente
const PORT = process.env.PORT || 3000;

app.use(cors());

// Rota para a raiz (mensagem explicativa)
app.get('/', (req, res) => {
  res.send('API de clima funcionando. Use o endpoint /?city={nome-da-cidade} para obter o clima.');
});

// Endpoint para obter dados climáticos
app.get('/', async (req, res) => {
  const { city } = req.query;  // Obtém a cidade da consulta
  if (!city) {
    return res.status(400).json({ error: 'Por favor, forneça o nome da cidade na query, por exemplo: ?city=Londres' });
  }
  
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    // Requisição para a API do clima
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json`, {
      params: {
        key: apiKey,
        q: city
      }
    });

    // Retorna os dados do clima
    res.json(response.data);
  } catch (error) {
    // Caso ocorra algum erro na requisição
    res.status(500).json({ error: 'Erro ao buscar dados do clima' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


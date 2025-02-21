# 🌦️ Weather App

Uma aplicação web moderna para consultar informações climáticas em tempo real, utilizando a WeatherAPI. Desenvolvida com HTML, CSS, JavaScript puro no front-end e Node.js com Express no back-end.

### 🔗 Acesse o projeto: [Weather-App](https://weather-application-pedb.onrender.com/)

---

## 📸 Demonstração

![Preview do projeto](.github/preview.png)

---

## 📋 Funcionalidades

🔍 Busca por cidade: Digite o nome da cidade para obter informações climáticas.

📍 Localização atual: Utilize o botão para buscar o clima da sua localização.

🌡️ Informações exibidas:

- Temperatura atual

- Sensação térmica

- Umidade

- Precipitação

- Condição do tempo (ex.: Ensolarado, Chuvoso)

- Indicador de dia/noite

---

## 🛠️ Tecnologias Utilizadas

Front-end

HTML5

CSS3

JavaScript (Vanilla)

Back-end

Node.js

Express.js

node-fetch

CORS

dotenv

API

WeatherAPI

---

## 📁 Estrutura do Projeto
```
Weather-App/
├── weather-frontend/
│   ├── icons/
│   ├── videos/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── weather-backend/
    ├── index.js
    ├── package.json
    ├── package-lock.json
    └── .env (contém a chave API)
```
---

## ⚙️ Configuração Local

➡️ Clone o repositório:
```
git clone https://github.com/seu-usuario/weather-app.git

cd weather-app/weather-backend
```

➡️ Instale as dependências:
```
npm install
```

➡️ Configure o arquivo .env:

WEATHER_API_KEY=suachavedaapi

➡️ Execute o servidor:
```
node index.js
```

➡️ Abra o front-end:
Basta abrir o index.html no navegador.

---

## 🔐 Segurança

A chave da API está protegida no back-end usando variáveis de ambiente.

As requisições do front-end são feitas ao servidor Express, evitando expor a chave diretamente.

---

## 🤝 Contribuições

Sinta-se à vontade para abrir issues ou pull requests! Qualquer ajuda é bem-vinda. 😄

---

## 📬 Contato

📧 **E-mail:** alexresende675@gmail.com

🐙 **GitHub:** [alex518123](https://github.com/alex518123)

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

---

Desenvolvido por: Alexander Resende [Dê uma olhada no meu portfólio!]()
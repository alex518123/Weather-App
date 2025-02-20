// Seleção de Elementos do DOM
// Obtém referências dos elementos HTML para manipulação posterior.
// searchInput: campo de busca onde o usuário digita a cidade.
// locationButton: botão para buscar a localização atual do usuário.
// currentWeatherDiv: div que exibe as informações do clima atual.
// hourlyWeather: lista onde será mostrada a previsão por hora.

const searchInput = document.querySelector(".search-input");
const locationButton = document.querySelector(".location-button");
const currentWeatherDiv = document.querySelector(".current-weather");
const hourlyWeather = document.querySelector(".hourly-weather .weather-list");


// Mapeamento de Códigos Meteorológicos
// Associa códigos de condições climáticas a categorias como "clear" (limpo), "clouds" (nublado), "rain" (chuva), etc.
// Isso é usado para exibir os ícones corretos.

const weatherCodes = {
  clear: [1000],
  clouds: [1003, 1006, 1009],
  mist: [1030, 1135, 1147],
  rain: [1063, 1150, 1153, 1168, 1171, 1180, 1183, 1198, 1201, 1240, 1243, 1246, 1273, 1276],
  moderate_heavy_rain: [1186, 1189, 1192, 1195, 1243, 1246],
  snow: [1066, 1069, 1072, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264, 1279, 1282],
  thunder: [1087, 1279, 1282],
  thunder_rain: [1273, 1276],
}

// Exibição da Previsão por Hora
// Define o horário atual, arredondando para o início da hora.
// Calcula o timestamp para as próximas 24 horas.

const displayHourlyForecast = (hourlyData) => {
  const currentHour = new Date().setMinutes(0, 0, 0);
  const next24Hours = currentHour + 24 * 60 * 60 * 1000;

  // Filtra os dados para manter apenas as previsões das próximas 24 horas.
  const next24HoursData = hourlyData.filter(({ time }) => {
    const forecastTime = new Date(time).getTime();
    return forecastTime >= currentHour && forecastTime <= next24Hours;
  });

  // Gera e insere o HTML para exibir a previsão por hora
  hourlyWeather.innerHTML = next24HoursData.map((item) => {
    const temperature = Math.floor(item.temp_c);
    const time = item.time.split(' ')[1].substring(0, 5);
    const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(item.condition.code));

    return `<li class="weather-item">
            <p class="time">${time}</p>
            <img src="icons/${weatherIcon}.svg" class="weather-icon">
            <p class="temperature">${temperature}°</p>
          </li>`;
  }).join('');
};

// Buscar e Exibir os Detalhes do Clima
const getWeatherDetails = async (API_URL) => {
  window.innerWidth <= 768 && searchInput.blur();
  document.body.classList.remove("show-no-results");

  try {
    // Faz uma requisição assíncrona à API.
    // Converte a resposta para JSON.
    const response = await fetch(API_URL);
    const data = await response.json();
  
    // Quantidade de precipitação em milímetros
    const precipAmount = data.current.precip_mm !== undefined ? data.current.precip_mm : 0; // Verifica se precip_mm está presente
  
    // Seleciona o elemento e insere o ícone de precipitação junto com o valor
    const precipElement = currentWeatherDiv.querySelector(".precipitation-amount");
    precipElement.innerHTML = `<span class="material-symbols-rounded precip-icon">water_drop</span> Precipitation: ${precipAmount} mm`;
  
    // Sensação térmica (feels-like)
    const feelsLike = data.current.feelslike_c !== undefined ? data.current.feelslike_c : 0;
  
    currentWeatherDiv.querySelector(".feels-like").innerHTML = 
      `<span class="material-symbols-rounded feels-like-icon">thermometer</span> Feels Like: ${feelsLike}°C`;

     // Verifica se é dia ou noite (is_day)
    const isDay = data.current.is_day;
    const dayNightElement = currentWeatherDiv.querySelector(".day-night");

    // Se for dia, mostra o ícone de sol, caso contrário, lua.
    if (isDay) {
      dayNightElement.innerHTML = 
        `<span class="material-symbols-rounded day-night-icon">sunny</span> It's Day`;
    } else {
      dayNightElement.innerHTML = 
        `<span class="material-symbols-rounded day-night-icon">nightlight_round</span> It's Night`;
    }

    // Umidade (humidity)
    const humidity = data.current.humidity !== undefined ? data.current.humidity : '--';
    const humidityElement = currentWeatherDiv.querySelector(".humidity");
    humidityElement.innerHTML = `<span class="material-symbols-rounded humidity-icon">humidity_percentage</span> Humidity: ${humidity}%`;
  
    // Extrai dados da API
    const temperature = Math.floor(data.current.temp_c);
    const description = data.current.condition.text;
  
    // Determina o ícone do clima
    const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(data.current.condition.code));
  
    // Atualiza os elementos HTML com os dados meteorológicos.
    currentWeatherDiv.querySelector(".weather-icon").src = `icons/${weatherIcon}.svg`;
    currentWeatherDiv.querySelector(".temperature").innerHTML = `${temperature}<span>°C</span>`;
    currentWeatherDiv.querySelector(".description").innerText = description;


    // Combina as previsões de hoje e amanhã.
    // Exibe o nome da cidade na barra de pesquisa.
    // Chama displayHourlyForecast para exibir a previsão por hora
    const combinedHourlyData = [...data.forecast?.forecastday[0]?.hour, ...data.forecast?.forecastday[1]?.hour];

    searchInput.value = data.location.name;
    displayHourlyForecast(combinedHourlyData);
  } catch (error) {
    document.body.classList.add("show-no-results");
  }
}

// Configurar a Requisição do Clima
const setupWeatherRequest = (cityName) => {
  const API_URL = `https://weather-application-pedb.onrender.com/weather?city=${cityName}`;
  getWeatherDetails(API_URL);
}

// Capturar Entrada do Usuário (Escuta o evento keyup) 
searchInput.addEventListener("keyup", (e) => {
  const cityName = searchInput.value.trim();

  if (e.key == "Enter" && cityName) {
    setupWeatherRequest(cityName);
  }
});

// Capturar Localização do Usuário
locationButton.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const API_URL = `https://weather-application-pedb.onrender.com/weather?city=${latitude},${longitude}`;
      getWeatherDetails(API_URL);
      window.innerWidth >= 768 && searchInput.focus();
    },
    () => {
      alert("Location access denied. Please enable permissions to use this feature.");
    }
  );
});

// Busca o clima para Londres ao carregar a página (default)
setupWeatherRequest("London");

// Definie Vídeo de Fundo e garante que o vídeo toque automaticamente
const bgVideo = document.getElementById("bg-video");

document.addEventListener("DOMContentLoaded", () => {
  const bgVideo = document.getElementById("bg-video");

const setVideoBackground = () => {
  bgVideo.src = "videos/clear.mp4";
  bgVideo.play();
};
  
setVideoBackground();
});


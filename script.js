const apiKey = "d8c2bdc5fdf8c3f347ed4633c7d4e1ac";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherBox = document.getElementById("weatherBox");

searchBtn.addEventListener("click", getWeather);

function getWeather() {
  const input = cityInput.value.trim();
  if (!input) {
    weatherBox.innerHTML = "<p class='placeholder'>Please enter a city name.</p>";
    return;
  }

  const [city, country] = input.split(',').map(str => str.trim());
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}${country ? ',' + country : ''}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      const { name } = data;
      const { country } = data.sys;
      const { temp, humidity } = data.main;
      const { icon, description } = data.weather[0];
      const wind = data.wind.speed;

      weatherBox.innerHTML = `
        <h2>${name}, ${country}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        <p><strong>${temp}°C</strong> - ${description}</p>
        <p>💧 Humidity: ${humidity}%</p>
        <p>🌬️ Wind: ${wind} m/s</p>
      `;

      const weatherType = description.toLowerCase();

      // 🌈 Gradient background for weather types
      if (weatherType.includes("cloud")) {
        document.body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
      } else if (weatherType.includes("rain")) {
        document.body.style.background = "linear-gradient(to right, #314755, #26a0da)";
      } else if (weatherType.includes("snow")) {
        document.body.style.background = "linear-gradient(to right, #e6dada, #274046)";
      } else if (weatherType.includes("storm") || weatherType.includes("thunder")) {
        document.body.style.background = "linear-gradient(to right, #232526, #414345)";
      } else if (weatherType.includes("clear")) {
        document.body.style.background = "linear-gradient(to right, #56ccf2, #2f80ed)";
      } else {
        document.body.style.background = "linear-gradient(to right, #74ebd5, #acb6e5)";
      }
    })
    .catch(error => {
      weatherBox.innerHTML = `<p class='placeholder'>${error.message}. Please try again later.</p>`;
    });
}

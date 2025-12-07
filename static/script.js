const API =
  "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,weathercode,relativehumidity_2m,windspeed_10m,precipitation_probability&daily=weathercode,temperature_2m_max,temperature_2m_min,uv_index_max&current_weather=true&timezone=auto";

async function loadWeather(city = null, lat = null, lon = null) {
  let latitude, longitude, displayName;

  // If city is searched
  if (city !== null) {
    city = city.trim();
    if (!city) return;
    
    const geo = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5`
    );
    const geoData = await geo.json();

    if (!geoData.results || geoData.results.length === 0) {
      return alert(`City "${city}" not found!\n\nTry: Delhi, Mumbai, Bangalore, London, New York, Tokyo`);
    }

    latitude = geoData.results[0].latitude;
    longitude = geoData.results[0].longitude;
    displayName = geoData.results[0].name + (geoData.results[0].country ? ', ' + geoData.results[0].country : '');
  } else {
    // If GPS used - get city name via reverse geocoding
    latitude = lat;
    longitude = lon;
    
    const reverseGeo = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=&latitude=${lat}&longitude=${lon}&count=1`
    );
    const reverseData = await reverseGeo.json();
    
    if (reverseData.results && reverseData.results.length > 0) {
      displayName = reverseData.results[0].name;
    } else {
      // Fallback: try alternative reverse geocoding
      const altGeo = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      const altData = await altGeo.json();
      displayName = altData.city || altData.locality || "Your Location";
    }
  }

  // Main weather API fetch
  const res = await fetch(`${API}&latitude=${latitude}&longitude=${longitude}`);
  const data = await res.json();

  updateUI(data, displayName);
}

function updateUI(data, cityName) {
  document.getElementById("city").innerText = cityName;
  document.getElementById("temp").innerText =
    data.current_weather.temperature + "°C";
  document.getElementById("condition").innerText = weatherCodeToText(
    data.current_weather.weathercode
  );
  document.getElementById("date").innerText = new Date().toDateString();

  // Main Icon
  document.getElementById("main-icon").src = getIcon(
    data.current_weather.weathercode
  );

  // Highlights
  document.getElementById("humidity").innerText =
    data.hourly.relativehumidity_2m[0] + "%";
  document.getElementById("wind").innerText =
    data.current_weather.windspeed + " km/h";
  document.getElementById("rain").innerText =
    (data.hourly.precipitation_probability[0] || 0) + "%";
  document.getElementById("uv").innerText =
    data.daily.uv_index_max[0] ? data.daily.uv_index_max[0].toFixed(1) : "--";

  // SUNNY GLOW FIX
  const mainCard = document.getElementById("weatherMain");
  mainCard.classList.remove("sunny");
  if (data.current_weather.weathercode === 0) {
    mainCard.classList.add("sunny");
  }

  // HOURLY
  const hourly = document.getElementById("hourly-container");
  hourly.innerHTML = "";

  for (let i = 0; i < 6; i++) {
    hourly.innerHTML += `
      <div class="hour-card">
        <p>${new Date(data.hourly.time[i]).getHours()}:00</p>
        <img src="${getIcon(data.hourly.weathercode[i])}">
        <p>${data.hourly.temperature_2m[i]}°C</p>
      </div>`;
  }

  // WEEKLY
  const week = document.getElementById("week-container");
  week.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    week.innerHTML += `
      <div class="week-card">
        <h4>${new Date(data.daily.time[i]).toLocaleDateString("en-US", {
          weekday: "short",
        })}</h4>
        <img src="${getIcon(data.daily.weathercode[i])}">
        <p>${data.daily.temperature_2m_max[i]}° / 
           ${data.daily.temperature_2m_min[i]}°</p>
      </div>`;
  }
}

// ICON MAPPING
function getIcon(code) {
  const map = {
    0: "01d",
    1: "02d",
    2: "03d",
    3: "04d",
    45: "50d",
    48: "50d",
    51: "09d",
    61: "10d",
    71: "13d",
    95: "11d",
  };
  return `https://openweathermap.org/img/wn/${map[code] || "01d"}@2x.png`;
}

function weatherCodeToText(code) {
  const map = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Cloudy",
    45: "Fog",
    48: "Foggy",
    51: "Drizzle",
    61: "Rain",
    71: "Snow",
    95: "Thunderstorm",
  };
  return map[code] || "Unknown";
}

// ENTER TO SEARCH
document.getElementById("searchCity").addEventListener("keydown", (e) => {
  if (e.key === "Enter") loadWeather(e.target.value);
});

// HOME BUTTON – DEFAULT CITY
document.querySelector(".home-btn").onclick = () => loadWeather("Delhi");

// GPS BUTTON FIXED
document.querySelector(".gps-btn").onclick = () => {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      loadWeather(null, pos.coords.latitude, pos.coords.longitude);
    },
    () => alert("Location access denied.")
  );
};

loadWeather("Delhi");

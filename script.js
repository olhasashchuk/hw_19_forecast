async function getData() {
    try {
        const res = await fetch(
            'http://api.openweathermap.org/data/2.5/weather?q=COPENHAGEN&units=metric&appid=5d69a5c9c332a27fb4d4dd7950e4ee9e',
            {
                method: "GET"
            })
        const data = await res.json();
        updateWeather(data);
    } catch (error) {
        console.log(error);
    }
}
function updateWeather(data) {
    const currentDate = new Date();
    const tempData = data.main.temp;
    const tempFeelsData = data.main.feels_like;
    const humidityData = data.main.humidity;
    const pressureData = data.main.pressure;
    const windData = data.wind.speed;
    const descripData = data.weather[0].description;
    const dateData = new Date(data.dt * 1000);

    const wrapper = document.querySelector('#contentImg');
    const imgWeather = new Image(150, 150);
    imgWeather.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    wrapper.innerHTML = '';
    wrapper.appendChild(imgWeather);

    document.querySelector('#date').innerHTML = `${currentDate.toLocaleDateString()}`;
    document.querySelector('#time').innerHTML = `${currentDate.toLocaleTimeString()}`;
    document.querySelector('#descrip').innerHTML = `${descripData.split(/\s+/).map(word =>
        word[0].toUpperCase() + word.substring(1)).join(' ')}`;
    document.querySelector('#temp').innerHTML = `${Math.floor(tempData)} °C`;
    document.querySelector('#tempFeels').innerHTML = `Feels like: ${Math.floor(tempFeelsData)} °C`;
    document.querySelector('#humidity').innerHTML = `Humidity: ${humidityData} %`;
    document.querySelector('#pressure').innerHTML = `Pressure: ${pressureData} hPa`;
    document.querySelector('#wind').innerHTML = `Wind: ${windData} km/h SSE`;
    document.querySelector('#dateGetWeather').innerHTML = `${dateData.toDateString()+' '
                                                                    + dateData.getHours()+':'
                                                                    + dateData.getMinutes()}`;
}

getData()

document.querySelector('button').addEventListener('click', getData);


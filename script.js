// ================================
// Access Elements
// ================================

const startBtn = document.querySelector("#btnOne")
const search = document.querySelector("#inputField")
const searchIcon = document.querySelector("#searchIcon")

const icon = document.querySelector("#icon")
const description = document.querySelector("#des")
const temprature = document.querySelector("#temp")
const cityName = document.querySelector("#city")
const windSpeed = document.querySelector("#windSpeed")
const humidity = document.querySelector("#humidityType")

const homeBtn = document.querySelector("#secondBtn")

const box1 = document.querySelector(".mainBox1")
const box2 = document.querySelector(".mainBox2")
const box3 = document.querySelector(".mainBox3")


// ================================
// Start Screen
// ================================

startBtn.addEventListener("click", () => {

    // First screen hide
    box1.classList.add("inactive");

    // Second screen show
    box2.classList.remove("inactive");

    // Default city show
    getWeather("New York");
});


// ================================
// Go Home Screen
// ================================

homeBtn.addEventListener("click", () => {

    box2.classList.add("inactive");
    box3.classList.add("inactive");

    box1.classList.remove("inactive");
});


// ================================
// Search Button
// ================================

searchIcon.addEventListener("click", () => {
    const nameOfTheCity = search.value.trim();
    // Empty input check
    if(nameOfTheCity === "") {
        alert("Please Enter City Name");
        return;
    }

    getWeather(nameOfTheCity);
});


// ================================
// Enter Key Search
// ================================

search.addEventListener("keydown", (event) => {
    if(event.key === "Enter") {
        const nameOfTheCity = search.value.trim();
        //Empty input check
        if(nameOfTheCity === "") {
            alert("Please Enter City Name");
            return;
        }

        getWeather(nameOfTheCity);
    }
});


// ================================
// Change Weather Icons
// ================================

function changeIcon(weatherCondition) {
    let icons = {
        Clouds : "Images/clouds.png",
        Rain : "Images/rain.png",
        Mist : "Images/mist.png",
        Haze : "Images/haze.png",
        Snow : "Images/snow.png",
        Clear : "Images/clear.png"
    };
    // Agar icon na mile toh default clouds
    icon.src = icons[weatherCondition] || "Images/clouds.png";
}


// ================================
// API
// ================================
const url = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "4fe65b57e8aa307a8b7e8fe0c3ceeba7";


async function getWeather(city) {
    const urlPath = `${url}q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(urlPath);
        const data = await response.json();
        console.log(data);

        // Invalid City
        if (data.cod == "404") {
            box1.classList.add("inactive");
            box2.classList.add("inactive");

            box3.classList.remove("inactive");
            return;
        }


        // Show Weather Data 
        cityName.innerHTML = data.name;

        description.innerHTML = data.weather[0].description;

        temprature.innerHTML = `${Math.round(data.main.temp)}°C`;

        windSpeed.innerHTML = `${data.wind.speed} km/h`;
        
        humidity.innerHTML = `${data.main.humidity} %`;

        // Change Weather Icon
        changeIcon(data.weather[0].main);
    }  
    catch(error) {
        console.log("Error: ",error);
    }
}

getWeather("New York");   
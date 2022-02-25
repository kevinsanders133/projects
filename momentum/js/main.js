const body = document.querySelector('body');
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greetingContainer = document.querySelector('.greeting-container');
const greeting = document.querySelector('.greeting');
const greetingInput = document.querySelector('.greeting-container input');
const settingsButton = document.querySelector('.settings-button');
const settings = document.querySelector('.settings');
const weatherBtn = document.querySelector('.settings-weather');
const greetingBtn = document.querySelector('.settings-greeting');
const playerBtn = document.querySelector('.settings-player');
const quotesBtn = document.querySelector('.settings-quotes');
const dateBtn = document.querySelector('.settings-date');
const timeBtn = document.querySelector('.settings-time');
const greetingTranslation = {
    ru: {
        morning: "Доброе утро,",
        afternoon: "Добрый день,",
        evening: "Добрый вечер,",
        night: "Доброй ночи,"
    },
    en: {
        morning: "Good morning,",
        afternoon: "Good afternoon,",
        evening: "Good evening,",
        night: "Good night,"
    }
};
let language = localStorage.getItem('language') || "en";
let settingsClosed = localStorage.getItem('settingsClosed') == 'false' ? false : true;
let bgCollection = localStorage.getItem('bgCollection') || "Github";
let bgNum = getRandomNum();

function setLocalStorage() {
    localStorage.setItem('name', greetingInput.value);
    localStorage.setItem('language', language);
    localStorage.setItem('bgCollection', bgCollection);
    localStorage.setItem('settingsClosed', settingsClosed);
    localStorage.setItem('weatherContainer', window.getComputedStyle(weatherContainer).getPropertyValue("opacity"));
    localStorage.setItem('greetingContainer', window.getComputedStyle(greetingContainer).getPropertyValue("opacity"));
    localStorage.setItem('player', window.getComputedStyle(player).getPropertyValue("opacity"));
    localStorage.setItem('date', window.getComputedStyle(date).getPropertyValue("opacity"));
    localStorage.setItem('time', window.getComputedStyle(time).getPropertyValue("opacity"));
}
function getLocalStorage() {
    if (localStorage.getItem('name')) {
        greetingInput.value = localStorage.getItem('name');
    }
    if (localStorage.getItem('language')) {
        document.querySelector(`input[name="language"][value="${language}"]`).checked = true;
        if (language === 'en') {
            greetingInput.placeholder = "[ Your name ]";
            weatherBtn.textContent = 'Show/hide weather';
            greetingBtn.textContent = 'Show/hide greeting';
            playerBtn.textContent = 'Show/hide audio player';
            quotesBtn.textContent = 'Show/hide quotes';
            dateBtn.textContent = 'Show/hide date';
            timeBtn.textContent = 'Show/hide time';
        } else {
            greetingInput.placeholder = "[ Ваше имя ]";
            weatherBtn.textContent = 'Скрыть/показать погоду';
            greetingBtn.textContent = 'Скрыть/показать приветствие';
            playerBtn.textContent = 'Скрыть/показать плеер';
            quotesBtn.textContent = 'Скрыть/показать цитаты';
            dateBtn.textContent = 'Скрыть/показать дату';
            timeBtn.textContent = 'Скрыть/показать время';
        }
    }
    if (localStorage.getItem('bgCollection')) {
        document.querySelector(`input[name="background"][value="${bgCollection}"]`).checked = true;
    }
    if (localStorage.getItem('settingsClosed')) {
        if (settingsClosed == false) {
            settings.style.opacity = 1;
        }
    }
    if (localStorage.getItem('weatherContainer')) {
        weatherContainer.style.opacity = localStorage.getItem('weatherContainer');
    }
    if (localStorage.getItem('greetingContainer')) {
        greetingContainer.style.opacity = localStorage.getItem('greetingContainer');
    }
    if (localStorage.getItem('player')) {
        player.style.opacity = localStorage.getItem('player');
    }
    if (localStorage.getItem('quotesContainer')) {
        quotesContainer.style.opacity = localStorage.getItem('quotesContainer');
    }
    if (localStorage.getItem('date')) {
        date.style.opacity = localStorage.getItem('date');
    }
    if (localStorage.getItem('time')) {
        time.style.opacity = localStorage.getItem('time');
    }
}
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

function showTime() {
    const currentDate = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    time.textContent = currentDate.toLocaleTimeString(language);
    date.textContent = currentDate.toLocaleDateString(language, options);

    showGreeting();

    setTimeout(showTime, 1000);
}
showTime();

function getTimeOfDay() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    if (hours >= 6 && hours < 12) {
        return "morning";
    } else if (hours >= 12 && hours < 17) {
        return "afternoon";
    } else if (hours >= 17 && hours < 20) {
        return "evening";
    } else {
        return "night";
    }
}
function showGreeting() {
    const greetingText = greetingTranslation[language][getTimeOfDay()];
    greeting.textContent = greetingText;
}

function getRandomNum() {
    return Math.floor(Math.random() * 20) + 1;
}
async function setBg() {
    const timeOfDay = getTimeOfDay();
    const img = new Image();
    const imgName = String(bgNum).padStart(2, '0');

    if (bgCollection == "Unsplash") {
        const res = await fetch(`https://api.unsplash.com/photos/random?orientation=landscape&client_id=JQd4WJAA_OAfJNKo_hHl0YB8jXNmgF-RMkkqiwIHrts&query=${timeOfDay}`);
        const data = await res.json();
        img.src = data.urls.regular;
    } else if (bgCollection == "Flickr") {
        const res = await fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=941da2eb0d9c8a9fe92743462ac3b69c&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1&per_page=1&page=1`);
        const data = await res.json();
        const photos = data.photos.photo;
        console.log(photos);
        img.src = photos[0].url_l;
    } else {
        img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${imgName}.jpg`;
    }

    img.onload = () => {
        body.style.backgroundImage = `url("${img.src}")`;
    }
}
setBg();

settingsButton.addEventListener('click', () => {
    if (settingsClosed) {
        settings.style.opacity = "1";
        settingsClosed = false;
    } else {
        settings.style.opacity = "0";
        settingsClosed = true;
    }
});

weatherBtn.addEventListener('click', () => {
    blockToggle(weatherContainer);
});
greetingBtn.addEventListener('click', () => {
    blockToggle(greetingContainer);
});
playerBtn.addEventListener('click', () => {
    blockToggle(player);
});
quotesBtn.addEventListener('click', () => {
    blockToggle(quotesContainer);
});
dateBtn.addEventListener('click', () => {
    blockToggle(date);
});
timeBtn.addEventListener('click', () => {
    blockToggle(time);
});

function blockToggle(element) {
    if (window.getComputedStyle(element).getPropertyValue("opacity") == "1") {
        element.style.opacity = "0";
    } else {
        element.style.opacity = "1";
    }
}

function langChange(element) {
    language = element.value;
    window.location.reload(false); 
}

function bgCollChange(element) {
    bgCollection = element.value;
    window.location.reload(false);
}
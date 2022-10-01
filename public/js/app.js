console.log('Clientside java script file is loaded');

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const messageFour = document.querySelector('#message-4');
const messageFive = document.querySelector('#message-5');
const messageSix = document.querySelector('#message-6');

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault();
    const location = searchElement.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    messageThree.textContent = '';
    messageFour.textContent = '';
    messageFive.textContent = '';
    messageSix.textContent = '';
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = `Location: ${data.location} `;
                messageTwo.textContent = `Forecast: ${data.temperature} and ${data.description}. It currently feels like ${data.feelsLike} outside`;
                messageThree.textContent = `Wind Speed: ${data.windSpeed}`;
                messageFour.textContent = `Precipitation: ${data.precip}`;
                messageFive.textContent = `Humidity: ${data.humidity}`;
                messageSix.textContent = `UV Index: ${data.uvIndex}`;
            }
        })
    })
})
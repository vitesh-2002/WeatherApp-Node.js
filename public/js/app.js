console.log('Clientside java script file is loaded');

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchElement.value;
    //console.log(location);
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                console.log(data.error);
            } else {
                messageOne.textContent = `Location: ${data.location} `;
                messageTwo.textContent = `Forecast: ${data.temperature} and ${data.description}. It currently feels like ${data.feelsLike} outside`;
                console.log(`Location: ${data.location}\nForecast: ${data.temperature} and ${data.description}`);
            }
        })
    })
})
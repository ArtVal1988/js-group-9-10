/*
 * Geolocation
 * https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
 */
import getLocation from './js/get-location';
import fetchWeather from './js/fetch-weather';

const run = async () => {
  if (!navigator.geolocation) {
    return console.log('Geolocation is not available in your browser!');
  }

  try {
    const location = await getLocation();
    const weather = await fetchWeather(location.coords);
    const daily = weather.daily.data;
    console.log(daily);
    const daysInfo = daily.reduce((acc, { time, summary, icon }) => {
      // document.body.insertAdjacentElement('beforeend', `${summary}`);
    });
  } catch (error) {
    console.log(error);
  }
};

run();

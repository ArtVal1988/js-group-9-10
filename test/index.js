/*
 * Geolocation
 * https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
 */
// import getLocation from './js/get-location';
// import fetchWeather from './js/fetch-weather';

// const run = async () => {
//   if (!navigator.geolocation) {
//     return console.log('Geolocation is not available in your browser!');
//   }

//   try {
//     const location = await getLocation();
//     const weather = await fetchWeather(location.coords);

//     console.log(weather);
//   } catch (error) {
//     console.log(error);
//   }
// };

// run();

const PROXY = 'https://cors-anywhere.herokuapp.com';

const onGetPositionSuccess = position => {
  console.log(position);
  document.body.innerHTML = `<h1>Accuracy: ${position.coords.accuracy}</h1>`;
  fetchWeather(position.coords);
};

const onGetPositionError = err => {
  console.log(err);
};

const fetchWeather = async ({ latitude, longitude }) => {
  try {
    const response = await fetch(
      `${PROXY}/https://api.darksky.net/forecast/2780cc20ca5b934556e1392cb44f4723/${latitude},${longitude}?units=si`,
    );
    const weather = await response.json();
    console.log(weather);
  } catch (err) {
    console.log(err);
  }
};

if (!navigator.geolocation) {
  console.log('Geolocation is not available in your browser!');
} else {
  const opts = {
    enableHighAccuracy: true,
    timeout: 30 * 1000,
    maximumAge: 5 * 60 * 1000,
  };

  navigator.geolocation.getCurrentPosition(
    onGetPositionSuccess,
    onGetPositionError,
    opts,
  );
}

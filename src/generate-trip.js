import {tripsData} from './trips-data';
import {makeStringFromData, getRandomNumber} from './helpers';


const getOffersLayout = (offers) => offers.map((offer) => {
  return `
  <li>
      <button class="trip-point__offer">${offer}</button>
  </li>
  `;
});

const makeTrip = (acc, trip) => {
  acc += `
  <article class="trip-point">
    <i class="trip-icon">${trip.icon}</i>
    <h3 class="trip-point__title">${trip.title}</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">10:00&nbsp;— 11:00</span>
      <span class="trip-point__duration">1h 30m</span>
    </p>
    <p class="trip-point__price">${trip.price}</p>
    <ul class="trip-point__offers">
      ${getOffersLayout(trip.offers).join(``)}
    </ul>
  </article>
  `;
  return acc;
};

export const trips = makeStringFromData(tripsData, makeTrip);

const getRandomTrips = (trip) => {
  return `<article class="trip-point">
    <i class="trip-icon">${trip.icon}</i>
    <h3 class="trip-point__title">${trip.title}</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">10:00&nbsp;— 11:00</span>
      <span class="trip-point__duration">1h 30m</span>
    </p>
    <p class="trip-point__price">${trip.price}</p>
    <ul class="trip-point__offers">
      ${getOffersLayout(trip.offers).join(``)}
    </ul>
  </article>`;
};

export const insertRandomTripsToHtml = (tripsWrapper, tripsAmount) => {
  let renderedTrips = ``;
  for (let i = 0; i < tripsAmount; i++) {
    renderedTrips += getRandomTrips(Object.assign({}, tripsData[getRandomNumber(0, tripsData.length - 1)]));
  }
  tripsWrapper.insertAdjacentHTML(`afterbegin`, renderedTrips);
};

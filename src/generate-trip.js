import {tripsData} from './trips-data';
import {makeStringFromData} from './helpers';

const getOffer = (offers) => offers.map((offer) =>
  `
   <li>
      <button class="trip-point__offer">${offer}</button>
   </li>
  `)
;

console.log(getOffer([1, 2, 3]));


const makeTrip = (trip) =>
  `
  <article class="trip-point">
    <i class="trip-icon">${trip.icon}</i>
    <h3 class="trip-point__title">${trip.title}</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">10:00&nbsp;— 11:00</span>
      <span class="trip-point__duration">1h 30m</span>
    </p>
    <p class="trip-point__price">${trip.price}</p>
    <ul class="trip-point__offers">
      ${getOffer(trip.offers)}
    </ul>
  </article>
  `
;

console.log(makeTrip);

export const trips = makeStringFromData(tripsData, makeTrip);



// import {getRandomNumber} from './helpers';
// import {tripsData} from './mock-data/initial-trips-data';
import {mockTrip} from './mock-data/generate-mock-trips';
import {getOffersLayout} from './format-offers';
import {formatTimeOutput} from './mock-data/generate-time';

/**
 * Формируем разметку для 1ого случайного путешествия
 * @param {Object} trip - текущий элемент массива
 * @return {String} - готовая разметка с данными для 1ого путешествия
 */
const getRandomTrips = (trip) => {
  return `<article class="trip-point">
    <i class="trip-icon">${trip.icon}</i>
    <h3 class="trip-point__title">${trip.title}</h3>
    <p class="trip-point__schedule">
    <span class="trip-point__timetable">
      ${formatTimeOutput(trip.time.start.getHours())}:${formatTimeOutput(trip.time.start.getMinutes())}
        &nbsp;&mdash;
      ${formatTimeOutput(trip.time.end.getHours())}:${formatTimeOutput(trip.time.end.getMinutes())}
    </span>
      <span class="trip-point__duration">
        ${trip.time.interval.hours}h ${trip.time.interval.minutes}m
      </span>
    </p>
    <p class="trip-point__price">${trip.price}</p>
    <ul class="trip-point__offers">
      ${getOffersLayout(trip.offers).join(``)}
    </ul>
  </article>`;
};

/**
 * Добавляем разметку нескольких (сучайное кол-во) путешествий
 * @param {HTMLElement} tripsWrapper - элемент разметки, в который мы вставим разметку из данных массива случайной длины
 * @param {Number} tripsAmount - рандомное число - случайное кол-во путешествий
 */
const insertRandomTripsToHtml = (tripsWrapper, tripsAmount) => {
  let renderedTrips = ``;
  for (let i = 0; i < tripsAmount; i++) {
    // копируем рандомный обьект из массива путешествий и прибавляем его к renderedTrips
    // renderedTrips += getRandomTrips(Object.assign({}, tripsData[getRandomNumber(0, tripsData.length - 1)]));
    renderedTrips += getRandomTrips(mockTrip());
  }
  tripsWrapper.insertAdjacentHTML(`afterbegin`, renderedTrips);
};

export {insertRandomTripsToHtml};

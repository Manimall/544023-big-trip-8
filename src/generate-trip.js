import {mockTrip} from './mock-data/generate-mock-trips';
import {getOffersLayout} from './format-offers';
import {formatTimeOutput} from './mock-data/generate-time';

/**
 * Создаем массив, превращаем (мапируем) его в массив путешествий
 * @param {Number} tripQuantity - необзодимое по ТЗ изначальное кол-во путешествий
 * @return {Array} - массив путешествий с заполненными данными
 */
const generateFullTrip = (tripQuantity) => {
  return new Array(tripQuantity)
      .fill()
      .map(mockTrip);
};

/**
 * Формируем разметку для 1ого путешествия
 * @param {Object} trip - текущий (обрабатываемый) элемент массива (в данном случае объект)
 * @return {String} - готовая разметка (с заполненными данными) для 1ого путешествия
 */
const makeTrip = (trip) => {
  return `
    <article class="trip-point">
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
    </article>
    `;
};

export {generateFullTrip, makeTrip};

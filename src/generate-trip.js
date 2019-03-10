import {getRandomNumber} from './helpers';
import {tripsData} from './trips-data';
// import {mockTrip} from './mock-data/generate-mock-trips';
import {getOffersLayout} from './format-offers';

/**
 * Формируем разметку для 1ого путешествия
 * @param {String} acc - аккумулирующий значение, которое возвращает функция cb
 * (в данном случаем строка, изначально пустая)
 * @param {Object} trip - текущий (обрабатываемый) элемент массива (в данном случае объект)
 * @return {String} - готовая разметка (с заполненными данными) для 1ого путешествия
 */
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
      <span class="trip-point__timetable">10:00&nbsp;— 11:00</span>
      <span class="trip-point__duration">1h 30m</span>
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
    renderedTrips += getRandomTrips(Object.assign({}, tripsData[getRandomNumber(0, tripsData.length - 1)]));
  }
  tripsWrapper.insertAdjacentHTML(`afterbegin`, renderedTrips);
};

export {makeTrip, insertRandomTripsToHtml};

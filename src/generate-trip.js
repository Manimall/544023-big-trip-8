import {tripsData} from './trips-data';
import {makeStringFromData, getRandomNumber} from './helpers';

/**
 * Отрисовываем каждое предложение из массива offers (в обьекте trip)
 * @param {Array} offers - массив предложений
 * @return {String} - разметка 1ого предложения с заполненными данными
 */
const getOffersLayout = (offers) => offers.map((offer) => {
  return `
  <li>
      <button class="trip-point__offer">${offer}</button>
  </li>
  `;
});

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

// Генерируем разметку для всех путешествий (элементов массива tripsData)
// документация к функции описана в helpers.js
const trips = makeStringFromData(tripsData, makeTrip);

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

export {trips, insertRandomTripsToHtml};

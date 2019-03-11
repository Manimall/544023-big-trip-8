import {mockTrip} from './mock-data/generate-mock-trips';
import {getOffersLayout} from './format-offers';

const generateFullTrip = (tripQuantity) => {
  // const tripArr = [];
  // for (let i = 0; i < tripQuantity; i++) {
  //   const singleTrip = mockTrip();
  //   tripArr.push(singleTrip);
  // }
  // return tripArr;

  return new Array(tripQuantity)
        .fill()
        .map(mockTrip);
};

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

export {makeTrip, generateFullTrip};

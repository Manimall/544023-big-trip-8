// import {getRandomNumber} from './helpers';
// import {tripsData} from './mock-data/initial-trips-data';
import {makeTrip} from './generate-trip';
import {mockTrip} from '../mock-data/generate-mock-trips';

/**
 * Добавляем разметку нескольких (сучайное кол-во) путешествий
 * @param {HTMLElement} tripsWrapper - элемент разметки, в который мы вставим разметку из данных массива случайной длины
 * @param {Number} tripsAmount - рандомное число - случайное кол-во путешествий
 */
const insertRandomTripsToHtml = (tripsWrapper, tripsAmount) => {
  let renderedTrips = ``;
  for (let i = 0; i < tripsAmount; i++) {
    // копируем рандомный обьект из массива путешествий и прибавляем его к renderedTrips
    // renderedTrips += makeTrip(Object.assign({}, tripsData[getRandomNumber(0, tripsData.length - 1)]));
    renderedTrips += makeTrip(mockTrip());
  }
  tripsWrapper.insertAdjacentHTML(`afterbegin`, renderedTrips);
};

export {insertRandomTripsToHtml};

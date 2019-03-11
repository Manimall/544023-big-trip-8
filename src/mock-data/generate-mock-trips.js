import {tripIcons, tripCities, tripDescription} from './trip-constants';
import {getRandomElementFromArr, getFewRandomItemsFromArr} from '../helpers';
import {generateOffers} from './generate-offers';

const MIN_DESCRIPTION_SENTENCE_QUANTITY = 1;
const MAX_DESCRIPTION_SENTENCE_QUANTITY = 3;

const MAX_PRICE = 200;
const MIN_PRICE = 20;
const PRICE_STEP = 10;

let prices = [];
for (let currentPrice = MIN_PRICE; currentPrice <= MAX_PRICE; currentPrice += PRICE_STEP) {
  prices.push(currentPrice);
}

/**
 * Создаем объект (уникальное путешествие)
 * @return {Object} - путешествие с определенными полями, заполенными данными по ТЗ
 */
export const mockTrip = () => {
  const tripType = getRandomElementFromArr(Object.keys(tripIcons)); // ищем первую часть названия - ключ
  const tripIcon = tripIcons[tripType]; // привязываем к ней иконку - значение

  return {
    title: `${tripType} to ${getRandomElementFromArr([...tripCities])}`,
    icon: tripIcon,
    description: getFewRandomItemsFromArr(tripDescription, MIN_DESCRIPTION_SENTENCE_QUANTITY, MAX_DESCRIPTION_SENTENCE_QUANTITY),
    picture: `http://picsum.photos/300/150?r=${Math.random()}`,
    price: getRandomElementFromArr(prices),
    offers: new Set(generateOffers()),
  };
};

import * as constants from './trip-constants';
import {getRandomElementFromArr, getFewRandomItemsFromArr, returnTrueOrFalse} from '../helpers';
import {generateOffers} from './generate-offers';
import {generateTime} from './generate-time';

const MIN_DESCRIPTION_SENTENCE_QUANTITY = 1;
const MAX_DESCRIPTION_SENTENCE_QUANTITY = 3;

const MIN_OFFERS = 0;
const MAX_OFFERS = 2;

const MAX_PRICE = 200;
const MIN_PRICE = 20;
const PRICE_STEP = 10;

let prices = [];
for (let currentPrice = MIN_PRICE; currentPrice <= MAX_PRICE; currentPrice += PRICE_STEP) {
  prices.push(currentPrice);
}

/**
 * Создаем объект (уникальное путешествие)
 * @param {Number} id - id путешествия
 * @return {Object} - путешествие с определенными полями, заполенными данными по ТЗ
 */
const mockTrip = (id) => {
  const tripType = getRandomElementFromArr(Object.keys(constants.tripIcons)); // ищем первую часть названия - ключ
  const tripIcon = constants.tripIcons[tripType]; // привязываем к ней иконку - значение по ключу
  const city = getRandomElementFromArr([...constants.tripCities]);

  const InitialOffers = getFewRandomItemsFromArr(constants.tripOffers, MIN_OFFERS, MAX_OFFERS);

  return {
    city,
    type: getRandomElementFromArr(constants.tripTypes),
    title: `${tripType} to ${city}`,
    icon: tripIcon,
    description: getFewRandomItemsFromArr(constants.tripDescription, MIN_DESCRIPTION_SENTENCE_QUANTITY, MAX_DESCRIPTION_SENTENCE_QUANTITY),
    picture: `http://picsum.photos/300/150?r=${Math.random()}`,
    pictures: constants.tripAllPictures,
    price: `${getRandomElementFromArr(prices)}`,
    fullPrice: `${getRandomElementFromArr(prices)} ${constants.tripPriceCurrency}`,
    priceCurrency: constants.tripPriceCurrency,
    offers: new Set(generateOffers(InitialOffers)), // изначальное кол-во оффер по заданию
    allOffers: new Set(generateOffers(constants.tripOffers)), // все офферы
    time: generateTime(),
    isFavorite: returnTrueOrFalse(),
    types: constants.tripTypes,
    cities: constants.tripCities,
    id,
  };
};

export {mockTrip};

import * as constants from './trip-constants';
import {getRandomNumber, getRandomElementFromArr, getFewRandomItemsFromArr, returnTrueOrFalse} from '../helpers';
import {generateOffers} from './generate-offers';
import {generateTime} from './generate-time';

import moment from 'moment';

const MIN_DESCRIPTION_SENTENCE_QUANTITY = 1;
const MAX_DESCRIPTION_SENTENCE_QUANTITY = 3;

const MIN_OFFERS = 0;
const MAX_OFFERS = 3;

const MAX_PRICE = 500;
const MIN_PRICE = 20;
const PRICE_STEP = 10;

let prices = [];
for (let currentPrice = MIN_PRICE; currentPrice <= MAX_PRICE; currentPrice += PRICE_STEP) {
  prices.push(currentPrice);
}

// генерируем время
const generateNewTime = () => {
  const dayNow = moment().valueOf();
  const timeStart = getRandomNumber(dayNow - generateTime().timeConstants.MS_IN_WEEK, dayNow + generateTime().timeConstants.MS_IN_WEEK);
  const timeEnd = getRandomNumber(timeStart, timeStart + generateTime().timeConstants.MAX_TRIP_DURATION);

  const tripTime = {
    dayNow,
    timeStart,
    timeEnd,
  };

  return tripTime;
};

/**
 * Создаем объект (уникальное путешествие)
 * @param {Number} id - id путешествия
 * @return {Object} - путешествие с определенными полями, заполенными данными по ТЗ
 */
const mockTrip = (id) => {
  // const tripType = getRandomElementFromArr(Object.keys(constants.tripIcons)); // ищем первую часть названия - ключ

  const tripInfo = getRandomElementFromArr(constants.tripTypes);
  const tripType = tripInfo.transport ? `${tripInfo.name} to` : `${tripInfo.name} at`;

  const tripIcon = tripInfo.icon; // привязываем к ней иконку - значение по ключу
  const city = getRandomElementFromArr([...constants.tripCities]);

  const allOffers = generateOffers(constants.tripOffers);
  const InitialOffers = getFewRandomItemsFromArr(allOffers, MIN_OFFERS, MAX_OFFERS);

  const tripPrice = getRandomElementFromArr(prices);

  return {
    city,
    type: tripType,
    title: `${tripType} ${city}`,
    icon: tripIcon,
    tripInfo,
    description: getFewRandomItemsFromArr(constants.tripDescription, MIN_DESCRIPTION_SENTENCE_QUANTITY, MAX_DESCRIPTION_SENTENCE_QUANTITY),
    picture: `http://picsum.photos/300/150?r=${Math.random()}`,
    pictures: constants.tripAllPictures,
    price: `${tripPrice}`,
    fullPrice: `${tripPrice} ${constants.tripPriceCurrency}`,
    priceCurrency: constants.tripPriceCurrency,
    offers: new Set(InitialOffers), // изначальное кол-во оффер по заданию
    allOffers: new Set(allOffers), // все офферы
    time: generateTime().timeObj,
    isFavorite: returnTrueOrFalse(),
    tripTime: generateNewTime(),
    id,
  };
};

export {mockTrip, MIN_PRICE, MAX_PRICE, generateNewTime};

import {tripIcons, tripCities, tripDescription, tripOffers, tripPriceCurrency, tripAllPictures} from './trip-constants';
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
  const tripType = getRandomElementFromArr(Object.keys(tripIcons)); // ищем первую часть названия - ключ
  const tripIcon = tripIcons[tripType]; // привязываем к ней иконку - значение по ключу

  const InitialOffers = getFewRandomItemsFromArr(tripOffers, MIN_OFFERS, MAX_OFFERS);

  return {
    title: `${tripType} to ${getRandomElementFromArr([...tripCities])}`,
    icon: tripIcon,
    description: getFewRandomItemsFromArr(tripDescription, MIN_DESCRIPTION_SENTENCE_QUANTITY, MAX_DESCRIPTION_SENTENCE_QUANTITY),
    picture: `http://picsum.photos/300/150?r=${Math.random()}`,
    allPictures: tripAllPictures,
    price: `${getRandomElementFromArr(prices)}`,
    fullPrice: `${getRandomElementFromArr(prices)} ${tripPriceCurrency}`,
    priceCurrency: tripPriceCurrency,
    offers: new Set(generateOffers(InitialOffers)),
    allOffers: new Set(generateOffers(tripOffers)),
    time: generateTime(),
    isFavorite: returnTrueOrFalse(),
    id,
  };
};

export {mockTrip, tripPriceCurrency};

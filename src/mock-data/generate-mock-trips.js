import {tripIcons, tripCities, tripDescription} from './trip-constants';
import {getRandomElementFromArr, getFewRandomItemsFromArr} from '../helpers';
import {generateOffers} from './generate-offers';

const minDescriptionSentenceQuantity = 1;
const maxDescriptionSentenceQuantity = 3;

const MAX_PRICE = 200;
const MIN_PRICE = 20;
const step = 10;

let prices = [];
for (let currentPrice = MIN_PRICE; currentPrice <= MAX_PRICE; currentPrice += step) {
  prices.push(currentPrice);
}

export const mockTrip = () => {
  const tripType = getRandomElementFromArr(Object.keys(tripIcons)); // ищем первую часть названия - ключ
  const tripIcon = tripIcons[tripType]; // привязываем к ней иконку - значение

  return {
    title: `${tripType} to ${getRandomElementFromArr([...tripCities])}`,
    icon: tripIcon,
    description: getFewRandomItemsFromArr(tripDescription, minDescriptionSentenceQuantity, maxDescriptionSentenceQuantity),
    picture: `http://picsum.photos/300/150?r=${Math.random()}`,
    price: getRandomElementFromArr(prices),
    offers: new Set(generateOffers()),
  };
};

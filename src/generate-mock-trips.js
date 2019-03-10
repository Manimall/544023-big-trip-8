import {tripIcons, tripCities, tripOffers, tripDescription} from './mock-data';
import {getRandomItemFromArr, getFewRandomItemsFromArr} from './helpers';

const minDescriptionSentenceQuantity = 1;
const maxDescriptionSentenceQuantity = 3;

const MAX_PRICE = 200;
const MIN_PRICE = 20;
const step = 10;

let prices = [];
for (let currentPrice = MIN_PRICE; currentPrice <= MAX_PRICE; currentPrice += step) {
  prices.push(currentPrice);
};

export const mockTrip = () => {
  return {
    title: `${getRandomItemFromArr(Object.keys(tripIcons))} to ${getRandomItemFromArr(tripCities)}`,
    icon: Object.keys(tripIcons).value,
    description: getFewRandomItemsFromArr(tripDescription, minDescriptionSentenceQuantity, maxDescriptionSentenceQuantity),
    picture: `http://picsum.photos/300/150?r=${Math.random()}`,
    price: getRandomItemFromArr(prices),
  };
};

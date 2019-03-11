import {getRandomNumber, getFewRandomItemsFromArr} from '../helpers';
import {tripOffers} from './trip-constants';

const MAX_OFFER_PRICE = 100;
const MAX_OFFERS = 2;
const MIN_OFFER_PRICE = 20;
const MIN_OFFERS = 0;

/**
 * Генерируем спецпредложения:
 * массив из обьектов (от нуля до двух по ТЗ)
 * с полями: 1) Название оффера и 2) цена оффера
 * @return {Array} - Массив из необходимого по ТЗ кол-ва объектов
 */
export const generateOffers = () => {
  const offers = getFewRandomItemsFromArr(tripOffers, MIN_OFFERS, MAX_OFFERS);
  return offers.reduce((acc, offer) => {
    acc.push({
      name: offer,
      price: getRandomNumber(MIN_OFFER_PRICE, MAX_OFFER_PRICE),
    });
    return acc;
  }, []);
};

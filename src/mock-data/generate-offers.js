import {getRandomNumber} from '../utils/helpers';
import {tripPriceCurrency} from './trip-constants';

const MAX_OFFER_PRICE = 100;
const MIN_OFFER_PRICE = 20;

/**
 * Генерируем спецпредложения:
 * массив из обьектов (от нуля до двух по ТЗ)
 * с полями: 1) Название оффера и 2) цена оффера
 * @param {Array} offers - массив предложений
 * @return {Array} - Массив из необходимого по ТЗ кол-ва объектов
 */
export const generateOffers = (offers) => {
  return offers.reduce((acc, offer) => {
    acc.push({
      name: offer,
      price: getRandomNumber(MIN_OFFER_PRICE, MAX_OFFER_PRICE),
      currency: tripPriceCurrency,
    });
    return acc;
  }, []);
};

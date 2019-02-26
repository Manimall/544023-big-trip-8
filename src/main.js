// проверяем работает ли все корректно в консоли
let add = (a, b) => a + b;

add(4, 1);


import {getRandomNumber, addToHtml} from './helpers';
import {filters} from './generate-filter';
import {trips} from './generate-trip';

// const INITIAL_TRIP_COUNT = 7; // необходимое по заданию кол-во событий

const filterListWrapper = document.querySelector(`.trip-filter`); // контэйнер для вставки фильтров
const tripListWrapper = document.querySelector(`.trip-day__items`); // контэйнер для вставки событий

// добавляем на страницу фильтры
addToHtml(filters, filterListWrapper);

// добавляем на страницу маршруты путешествий
addToHtml(trips, tripListWrapper);


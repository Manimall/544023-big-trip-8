import {makeStringFromData, getRandomNumber} from './helpers';
import {filtersData} from './mock-data/filters-data';
import {makeFilter} from './generate-filter';
import {makeTrip, generateFullTrip} from './generate-trip';
import {insertRandomTripsToHtml} from './render-random-trips';

const INITIAL_TRIP_COUNT = 7; // необходимое по заданию кол-во событий

const filterListWrapper = document.querySelector(`.trip-filter`); // контэйнер для вставки фильтров
const tripListWrapper = document.querySelector(`.trip-day__items`); // контэйнер для вставки событий

// Генерируем разметку для всех путешествий
// документация к функции makeStringFromData описана в helpers.js
const trips = makeStringFromData(generateFullTrip(INITIAL_TRIP_COUNT), makeTrip);

// добавляем на страницу маршруты путешествий
tripListWrapper.insertAdjacentHTML(`afterbegin`, trips);


// Заполняем разметку фильтра данными из массива фильтров
const filters = makeStringFromData(filtersData, makeFilter);

// добавляем на страницу фильтры
filterListWrapper.insertAdjacentHTML(`afterbegin`, filters);

/**
 * Добавляем функцию-обработчик события для переключения фильтров,
 * удаляем все ранее созданные путешествия и добавляем случайное кол-во новых
 * @param {evt} evt - событие, на котором ловим клик
 */
const addFilterClickHandler = (evt) => {
  const clickedFilter = evt.target.classList.contains(`trip-filter__item`);
  if (clickedFilter) {
    tripListWrapper.innerHTML = ``;
    insertRandomTripsToHtml(tripListWrapper, getRandomNumber(undefined, INITIAL_TRIP_COUNT));
  }
};

// устанавливаем обработчик события на контейнер секции с фильтрами
filterListWrapper.addEventListener(`click`, addFilterClickHandler);


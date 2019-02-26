import {getRandomNumber, addToHtml} from './helpers';
import {filters} from './generate-filter';
import {trips, insertRandomTripsToHtml} from './generate-trip';

const INITIAL_TRIP_COUNT = 7; // необходимое по заданию кол-во событий

const filterListWrapper = document.querySelector(`.trip-filter`); // контэйнер для вставки фильтров
const tripListWrapper = document.querySelector(`.trip-day__items`); // контэйнер для вставки событий

// добавляем на страницу фильтры
addToHtml(filters, filterListWrapper);

// добавляем на страницу маршруты путешествий
addToHtml(trips, tripListWrapper);

/**
 * Добавляем функцию-обработчик события для переключения фильтров,
 * удаляем все ранее созданные путешествия и добавляем случайное кол-во новых
 * @param {evt} evt - событие, на котором ловим клик
 */
const addFilterClickHandler = (evt) => {
  const clickedFilter = evt.target.classList.contains(`trip-filter__item`);
  if (clickedFilter) {
    tripListWrapper.innerHTML = ``;
    insertRandomTripsToHtml(tripListWrapper, getRandomNumber(INITIAL_TRIP_COUNT));
  }
};

// устанавливаем обработчик события на контейнер секции с фильтрами
filterListWrapper.addEventListener(`click`, addFilterClickHandler);


import {getRandomNumber, makeStringFromData} from './helpers';
import {filtersData} from './mock-data/filters-data';
import {makeFilter} from './generate-filter';
// import {generateFullTrip, makeTrip} from './generate-trip';
// import {generateFullTrip} from './generate-trip';
import {insertRandomTripsToHtml} from './render-random-trips';

import {TripEdit} from './trip-edit';
import {Trip} from './trip';
import {mockTrip} from './mock-data/generate-mock-trips';

const INITIAL_TRIP_COUNT = 7; // необходимое по заданию кол-во событий
const MIN_TRIP_COUNT = 3; // необходимое по заданию кол-во событий

const filterListWrapper = document.querySelector(`.trip-filter`); // контэйнер для вставки фильтров
const tripListWrapper = document.querySelector(`.trip-day__items`); // контэйнер для вставки путешествий

// Генерируем разметку для всех путешествий
// документация к функции makeStringFromData описана в helpers.js

// const trips = makeStringFromData(generateFullTrip(INITIAL_TRIP_COUNT), makeTrip);

// const makeStringFromData = (layoutData, generateFn) => layoutData.reduce((acc, el) => acc + generateFn(el), ``);

const genArr = (amount) => {
  const points = new Array(amount)
                      .fill(null)
                      .map((el, id) => mockTrip(id));

  points.forEach((item) => {

    const trip = new Trip(item);
    const tripEdit = new TripEdit(item);

    trip.onEdit = () => {
      tripEdit.render();
      tripListWrapper.replaceChild(tripEdit.element, trip.element);
      trip.unrender();
    };

    tripEdit.onSubmit = () => {
      trip.render();
      tripListWrapper.replaceChild(trip.element, tripEdit.element);
      tripEdit.unrender();
    };

    tripListWrapper.appendChild(trip.render());
  });
};

genArr(INITIAL_TRIP_COUNT);


// добавляем на страницу маршруты путешествий
// tripListWrapper.insertAdjacentHTML(`afterbegin`, trips);


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
    insertRandomTripsToHtml(tripListWrapper, getRandomNumber(MIN_TRIP_COUNT, INITIAL_TRIP_COUNT));
  }
};

// устанавливаем обработчик события на контейнер секции с фильтрами
filterListWrapper.addEventListener(`click`, addFilterClickHandler);


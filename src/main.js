import {getRandomNumber, makeStringFromData} from './helpers';
import {filtersData} from './mock-data/filters-data';
import {makeFilter} from './generate-filter';
import {TripEdit} from './trip-edit';
import {Trip} from './trip';
import {mockTrip} from './mock-data/generate-mock-trips';

const INITIAL_TRIP_COUNT = 7; // необходимое по заданию кол-во событий
const MIN_TRIP_COUNT = 3; // необходимое по заданию кол-во событий

const filterListWrapper = document.querySelector(`.trip-filter`); // контэйнер для вставки фильтров
const tripListWrapper = document.querySelector(`.trip-day__items`); // контэйнер для вставки путешествий


const generateTrips = (amount) => {
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

    tripEdit.onSubmit = (newObj) => {
      Object.assign(item, newObj);

      trip.update(item);

      trip.render();
      tripListWrapper.replaceChild(trip.element, tripEdit.element);
      tripEdit.unrender();
    };

    tripEdit.onKeyEsc = () => {
      trip.render();
      tripListWrapper.replaceChild(trip.element, tripEdit.element);
      tripEdit.unrender();
    };

    tripListWrapper.appendChild(trip.render());
  });
};

generateTrips(INITIAL_TRIP_COUNT);


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
    const randomTripsNumber = getRandomNumber(MIN_TRIP_COUNT, INITIAL_TRIP_COUNT);
    generateTrips(randomTripsNumber);
  }
};

// устанавливаем обработчик события на контейнер секции с фильтрами
filterListWrapper.addEventListener(`click`, addFilterClickHandler);


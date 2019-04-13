import {getRandomNumber} from './helpers';
import {filtersData, sortingData, statData} from './mock-data/trip-constants';
import {TripEdit} from './view/trip-edit';
import {Trip} from './view/trip';
// import {Sorting} from './view/sorting';
import {Filter} from './view/filter';
import {mockTrip} from './mock-data/generate-mock-trips';

const INITIAL_TRIP_COUNT = 7; // необходимое по заданию кол-во событий
const MIN_TRIP_COUNT = 3; // необходимое по заданию кол-во событий

const controls = document.querySelector(`.trip-controls`);

const filterListWrapper = controls.querySelector(`.trip-filter`); // контэйнер для вставки фильтров

const tripListWrapper = document.querySelector(`.trip-day__items`); // контэйнер для вставки путешествий

// const boardsBtn = controls.querySelector(`a[href*=table]`); // борд с путешествиями
// const statBtn = controls.querySelector(`a[href*=stats]`); // борд со статистикой

const boardTable = document.querySelector(`#table`);
const boardDays = boardTable.querySelector(`.trip-points`);
// const formSorting = boardTable.querySelector(`.trip-sorting`);


const generateTrips = (amount) => {
  return new Array(amount).fill(null).map((el, id) => mockTrip(id));
};

const generatedTrips = generateTrips(INITIAL_TRIP_COUNT); // необходимое кол-во сгенерированных путешествий

const renderTrips = (pointsArr) => {
  pointsArr.forEach((item) => {

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

renderTrips(generatedTrips); // отренедеренные путешествия


const getFilterEvents = (filterName, trips) => {
  const fnFilter = {
    'filter-everything': () => {
      return trips;
    },
    'filter-future': () => {
      return trips.filter((it) => it.tripTime.timeStart > Date.now());
    },
    'filter-past': () => {
      return trips.filter((it) => it.tripTime.timeEnd < Date.now());
    }
  };

  return fnFilter[filterName]();
};

const renderFilters = (filterArr) => {
  return filterArr.map((item) => {
    const filter = new Filter(item);
    filterListWrapper.appendChild(filter.render());

    filter.onFilter = () => {
      const filteredEvents = getFilterEvents(filter.id, generatedTrips);
      renderTrips(filteredEvents);
    };
  });
};

renderFilters(filtersData); // отрендеренные фильтры


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


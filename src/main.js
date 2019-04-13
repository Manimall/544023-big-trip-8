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
    'filter-everything': (data) => {
      return data;
    },
    'filter-future': (data) => {
      return data.filter((el) => el.tripTime.timeStart > Date.now());
    },
    'filter-past': (data) => {
      return data.filter((el) =>el.tripTime.timeEnd < Date.now());
    },
    'filter-in-descending': (data) => {
      return data.sort((a, b) => a.tripTime.timeStart - b.tripTime.timeStart);
    },
    'filter-in-ascending': (data) => {
      return data.sort((a, b) => a.tripTime.timeStart - b.tripTime.timeStart).reverse();
    }
  };

  return fnFilter[filterName]([...trips]);
};

const renderFilters = (filterArr) => {
  return filterArr.map((item) => {
    const filter = new Filter(item);
    filterListWrapper.appendChild(filter.render());

    filterListWrapper.addEventListener(`click`, filter.onFilter);

    filter.onFilter = () => {
      filter._checked = !filter._checked;
    };
  });
};

renderFilters(filtersData); // отрендеренные фильтры


/**
 * Добавляем функцию-обработчик события для переключения фильтров,
 * Меняем данные на основании функции getFilterEvents и заново рендерим их
 * @param {target} evt - событие, на котором ловим клик
 */
const addFilterClickHandler = ({target}) => {
  const clickedFilter = target.classList.contains(`trip-filter__item`);
  if (clickedFilter) {
    tripListWrapper.innerHTML = ``;
    const filteredEvents = getFilterEvents(target.previousElementSibling.id, generatedTrips);
    renderTrips(filteredEvents);
  }
};

// устанавливаем обработчик события на контейнер секции с фильтрами
filterListWrapper.addEventListener(`click`, addFilterClickHandler);


import {filtersData, sortingData} from './mock-data/trip-constants';
import {TripEdit} from './view/trip-edit';
import {Trip} from './view/trip';
import {TotalCost} from './view/total-cost';
import {Filter} from './view/filter';
import {mockTrip} from './mock-data/generate-mock-trips';
import {Sorting} from './view/sorting';
import {Api} from './data/api';
import moment from 'moment';

const INITIAL_TRIP_COUNT = 7; // необходимое по заданию кол-во событий

const controls = document.querySelector(`.trip-controls`);

const filterListWrapper = controls.querySelector(`.trip-filter`); // контэйнер для вставки фильтров

const tripListWrapper = document.querySelector(`.trip-day__items`); // контэйнер для вставки путешествий

const boardsBtn = controls.querySelector(`a[href*=table]`); // борд с путешествиями
const statBtn = controls.querySelector(`a[href*=stats]`); // борд со статистикой

const boardTable = document.querySelector(`#table`);
const boardStat = document.querySelector(`#stats`);

const board = boardTable.querySelector(`.trip-points`);

const sortingListWrapper = boardTable.querySelector(`.trip-sorting`); // контэйнер для вставки элементов сортировки

let offers = [];
let destinations = [];
let points = [];


const ServerConfig = {
  AUTHORIZATION: `Basic dXNfckBgtXuzd27yZAo=${Math.random()}`,
  MAIN_URL: `https://es8-demo-srv.appspot.com/big-trip`,
};

const api = new Api({mainUrl: ServerConfig.MAIN_URL, authorization: ServerConfig.AUTHORIZATION});


// чекаем данные
api.getOffers()
  .then((offers) => {
    console.log(offers);
  });

// console.log(offers);

const makeRequest = async () => {
  board.textContent = `Loading route...`;
  try {
    [offers, destinations, points] =
    await Promise.all([api.getOffers(), api.getDestinations(), api.getPoints()]);
    console.log([offers, destinations, points]);
    await initApp();
  } catch (err) {
    board.textContent = `Something went wrong while loading your route info. Check your connection or try again later`;
  }
};

const initApp = () => {
  board.textContent = ``;
  // renderTotalCost(model.events);
  renderFilters(filtersData);
  renderSorting(sortingData);
  renderTrips(points);
};

makeRequest();

// компонент с данными
// const tripPointsData = new TripsModelData(ServerConfig);

statBtn.addEventListener(`click`, (etv) => {
  etv.preventDefault();
  statBtn.classList.add(`view-switch__item--active`);
  boardsBtn.classList.remove(`view-switch__item--active`);
  boardTable.classList.add(`visually-hidden`);
  boardStat.classList.remove(`visually-hidden`);
});

boardsBtn.addEventListener(`click`, (etv) => {
  etv.preventDefault();
  boardsBtn.classList.add(`view-switch__item--active`);
  statBtn.classList.remove(`view-switch__item--active`);
  boardStat.classList.add(`visually-hidden`);
  boardTable.classList.remove(`visually-hidden`);
});

// const generateTrips = (amount) => {
//   return new Array(amount).fill(null).map((el, id) => mockTrip(id));
// };

// const generatedTrips = generateTrips(INITIAL_TRIP_COUNT); // необходимое кол-во сгенерированных путешествий


const renderTrips = (pointsArr) => {
  tripListWrapper.innerHTML = ``;

  pointsArr.forEach((item) => {

    const trip = new Trip(item);
    const tripEdit = new TripEdit(offers, destinations, item);

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

    tripEdit.onDelete = ({id}) => {
      const newTripPoints = pointsArr.filter((el) => el.id !== id);
      renderTrips(newTripPoints);
    };

    tripListWrapper.appendChild(trip.render());
  });
};

// renderTrips(generatedTrips); // отренедеренные путешествия


const getFilterEvents = (filterName, trips) => {
  const fnFilter = {
    'filter-everything': (data) => {
      return data;
    },
    'filter-future': (data) => {
      return data.filter((el) => el.tripTime.timeStart > Date.now());
    },
    'filter-past': (data) => {
      return data.filter((el) => el.tripTime.timeEnd < Date.now());
    },
  };

  return fnFilter[filterName]([...trips]);
};

const removeCheckedInput = (elem, parentWrapper, inputClass) => {
  const allInputs = parentWrapper.querySelectorAll(inputClass);
  [...allInputs].forEach((item) => {
    if (elem !== item) {
      item.removeAttribute(`checked`);
    }
  });
};

const renderFilters = (filterArr) => {
  return filterArr.forEach((item) => {
    const filter = new Filter(item);
    filterListWrapper.appendChild(filter.render());

    filter.onFilter = ({target}) => {
      const clickedFilter = target.classList.contains(`trip-filter__item`);
      if (clickedFilter && !target.previousElementSibling.disabled) {
        tripListWrapper.innerHTML = ``;
        const filteredEvents = getFilterEvents(target.previousElementSibling.id, generatedTrips);
        renderTrips(filteredEvents);

        removeCheckedInput(target, sortingListWrapper, `input[name="sorting"]`);
        removeCheckedInput(target.previousElementSibling, filterListWrapper, `input[name="filter"]`);
      }
    };
  });
};

// renderFilters(filtersData); // отрендеренные фильтры

const renderSorting = (sortingArr) => {
  return sortingArr.forEach((item) => {
    const sortingEl = new Sorting(item);
    sortingListWrapper.appendChild(sortingEl.render());

    sortingEl.onSorting = ({target}) => {
      if (target.name === `sorting` && !target.disabled) {

        tripListWrapper.innerHTML = ``;

        const sortedEvents = sortingEl.isAsc ?
          getSortingEvents(target.id, generatedTrips).reverse() :
          getSortingEvents(target.id, generatedTrips);

        renderTrips(sortedEvents);

        removeCheckedInput(target, sortingListWrapper, `input[name="sorting"]`);
      }
    };

  });
};

// renderSorting(sortingData); // отрендеренные элементы сортировки


const getDuration = (obj) => {
  return moment.duration(moment(obj.timeEnd).diff(moment(obj.timeStart)));
};

const getSortingEvents = (sortingName, trips) => {
  let tripsCopyArr = [...trips];
  const fnSorting = {
    'sorting-event': () => {
      return tripsCopyArr;
    },
    'sorting-time': () => {
      return tripsCopyArr.sort((a, b) => getDuration(a.tripTime) - getDuration(b.tripTime));
    },
    'sorting-price': () => {
      return tripsCopyArr.sort((a, b) => a.price - b.price);
    },
    'sorting-favorite': () => {
      return tripsCopyArr.sort((a, b) => a.isFavorite - b.isFavorite);
    },
    'sorting-offers': () => {
      return tripsCopyArr.sort((a, b) => a.offers.size - b.offers.size);
    },
  };
  return fnSorting[sortingName]();
};



import {filtersData, sortingData} from './mock-data/trip-constants';
import {TripEdit} from './view/trip-edit';
import {Trip} from './view/trip';
import {TotalCost} from './view/total-cost';
import {Filter} from './view/filter';
import {Adapter} from './data/adapter';
// import {mockTrip} from './mock-data/generate-mock-trips';
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
// api.getOffers()
//   .then((offers) => {
//     console.log(offers);
//   });

// console.log(offers);

const makeRequest = async () => {
  tripListWrapper.textContent = `Loading route...`;
  try {
    [offers, destinations, points] =
    await Promise.all([api.getOffers(), api.getDestinations(), api.getPoints()]);
    console.log([offers, destinations, points]);
    await initApp();
  } catch (err) {
    tripListWrapper.textContent = `Something went wrong while loading your route info. Check your connection or try again later`;
  }
};

const initApp = () => {
  tripListWrapper.textContent = ``;
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

const updatePoint = (pointToUpdate, newPoint) => {
  const index = pointToUpdate.id;
  points[index] = Object.assign({}, newPoint);
}

const makeRequestUpdateData = async (newDataPoint, trip, tripEdit, container) => {
  try {
    tripEdit.blockToSave();
    const newPoint = await api.updatePoint({id: newDataPoint.id, data: Adapter.toRAW(newDataPoint)});
    updatePoint(newDataPoint, newPoint);
    tripEdit.element.style.border = ``;
    trip.update(newPoint);
    trip.render();
    container.replaceChild(trip.element, tripEdit.element);
    tripEdit.unrender();
    // updateTotalCost();
  } catch (err) {
    respondToError(tripEdit);
  }
};

const respondToError = (elem) => {
  elem.element.style.border = `2px solid rgb(191, 38, 65)`;
  elem.shake();
  elem.unblockToSave();
};


const renderTrips = (pointsArr) => {
  tripListWrapper.innerHTML = ``;

  pointsArr.forEach((item) => {

    const trip = new Trip(item);
    const tripEdit = new TripEdit(offers, destinations, item);

    // открываем карточку редактирования маршрута
    trip.onEdit = () => {
      tripEdit.render();
      tripListWrapper.replaceChild(tripEdit.element, trip.element);
      trip.unrender();
    };

    // режактируем маршрут и сохраняем изменения
    tripEdit.onSubmit = (newObj) => {
      makeRequestUpdateData(newObj, trip, tripEdit, tripListWrapper);
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
      return data.filter((el) => el.newTime.timeStart > Date.now());
    },
    'filter-past': (data) => {
      return data.filter((el) => el.newTime.timeEnd < Date.now());
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
        const filteredEvents = getFilterEvents(target.previousElementSibling.id, points);
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
          getSortingEvents(target.id, points).reverse() :
          getSortingEvents(target.id, points);

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
      return tripsCopyArr.sort((a, b) => getDuration(a.newTime) - getDuration(b.newTime));
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



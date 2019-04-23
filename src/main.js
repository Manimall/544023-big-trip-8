import {filtersData, sortingData, statData, STORE_KEYS} from './mock-data/trip-constants';
import {TripEdit} from './view/trip-edit';
import {Trip} from './view/trip';
import {Stat} from './view/stat';
import {TotalCost} from './view/total-cost';
import {Filter} from './view/filter';
import {Store} from './data/store';
import {Provider} from './data/provider';
import {Adapter} from './data/adapter';
import {Sorting} from './view/sorting';
import {Api} from './data/api';
import moment from 'moment';

const boardTotalCost = document.querySelector(`.trip`);
const controls = document.querySelector(`.trip-controls`);
const filterListWrapper = controls.querySelector(`.trip-filter`); // контэйнер для вставки фильтров
const tripListWrapper = document.querySelector(`.trip-day__items`); // контэйнер для вставки путешествий
const boardsBtn = controls.querySelector(`a[href*=table]`); // борд с путешествиями
const statBtn = controls.querySelector(`a[href*=stats]`); // борд со статистикой
const boardTable = document.querySelector(`#table`);
const boardStat = document.querySelector(`#stats`);
const buttonNewEvent = controls.querySelector(`.trip-controls__new-event`);
const sortingListWrapper = boardTable.querySelector(`.trip-sorting`); // контэйнер для вставки элементов сортировки


const stat = new Stat();
const cost = new TotalCost();

const ServerConfig = {
  AUTHORIZATION: `Basic dXNfckBgtXuzd27yZAo=${Math.random()}`,
  MAIN_URL: `https://es8-demo-srv.appspot.com/big-trip`,
};

const api = new Api({mainUrl: ServerConfig.MAIN_URL, authorization: ServerConfig.AUTHORIZATION});

const store = new Store({key: STORE_KEYS.points, storage: localStorage});
const storeOffers = new Store({key: STORE_KEYS.offers, storage: localStorage});
const storeDestinations = new Store({key: STORE_KEYS.destinations, storage: localStorage});

const provider = new Provider({api, store, generateId: () => String(Date.now())});
const providerOffers = new Provider({api, store: storeOffers, generateId: () => String(Date.now())});
const providerDestinations = new Provider({api, store: storeDestinations, generateId: () => String(Date.now())});


// переключаемся с данных на статистику
const toggleToStat = () => {
  statBtn.classList.add(`view-switch__item--active`);
  boardsBtn.classList.remove(`view-switch__item--active`);
  boardTable.classList.add(`visually-hidden`);
  boardStat.classList.remove(`visually-hidden`);
};

const toggleToTable = () => {
  boardsBtn.classList.add(`view-switch__item--active`);
  statBtn.classList.remove(`view-switch__item--active`);
  boardStat.classList.add(`visually-hidden`);
  boardTable.classList.remove(`visually-hidden`);
};

statBtn.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  filterListWrapper.classList.add(`visually-hidden`);
  if (!evt.target.classList.contains(`view-switch__item--active`)) {
    toggleToStat();
  }
});

boardsBtn.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  filterListWrapper.classList.remove(`visually-hidden`);
  if (!evt.target.classList.contains(`view-switch__item--active`)) {
    toggleToTable();
  }
});


let offers = [];
let destinations = [];
let points = [];

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
      tripEdit.resetTrip(trip);
      tripEdit.unrender();
    };

    tripEdit.onDelete = ({id}) => {
      makeRequestDeleteData(id, tripEdit);
    };

    tripListWrapper.appendChild(trip.render());
  });
};

const makeRequestGetData = async () => {
  tripListWrapper.textContent = `Loading route...`;
  try {
    [offers, destinations, points] =
    await Promise.all([providerOffers.getOffers(), providerDestinations.getDestinations(), provider.getPoints()]);
    initApp();
    initStat();
  } catch (err) {
    tripListWrapper.textContent = `Something went wrong while loading your route info. Check your connection or try again later`;
  }
};

const renderTotalCost = (arrPoints) => {
  cost.getCostTrip(arrPoints);
  boardTotalCost.appendChild(cost.render());
};

const updateTotalCost = () => {
  cost.unrender();
  renderTotalCost(points);
};

const initApp = () => {
  tripListWrapper.textContent = ``;
  renderTotalCost(points);
  renderFilters(filtersData);
  renderSorting(sortingData);
  renderTrips(points);
};

const initStat = () => {
  const data = {
    events: points,
    stat: statData
  };
  stat.config = data;
  stat.render();
};

makeRequestGetData(); // получаем данные с сервера


const makeRequestUpdateData = async (newData, trip, tripEdit, container) => {
  try {
    tripEdit.blockToSave();
    const newPoint = await provider.updatePoint({id: newData.id, data: Adapter.toRAW(newData)});
    points[newPoint.id] = newPoint;
    tripEdit.element.style.border = ``;
    trip.update(newPoint);
    trip.render();
    container.replaceChild(trip.element, tripEdit.element);
    tripEdit.unrender();
    updateTotalCost();
  } catch (err) {
    respondToError(tripEdit);
  }
};


const makeRequestDeleteData = async (id, tripEdit) => {
  try {
    tripEdit.blockToDelete();
    await provider.deletePoint({id});
    const newTrips = await provider.getPoints();
    tripEdit.unrender();
    renderTrips(newTrips);
    updateTotalCost();
  } catch (err) {
    respondToError(tripEdit);
  }
};


const makeRequestInsertData = async (newDataPoint, newTripToRender) => {
  try {
    newTripToRender.blockToSave();
    await provider.createPoint({point: Adapter.toRAW(newDataPoint)});
    const newTrips = await provider.getPoints();
    newTripToRender.unrender();
    renderTrips(newTrips);
    updateTotalCost();
  } catch (err) {
    respondToError(newTripToRender);
  }
};

buttonNewEvent.addEventListener(`click`, () => {
  toggleToTable();
  const newPoint = new TripEdit(offers, destinations);

  tripListWrapper.insertBefore(newPoint.render(), tripListWrapper.firstChild);

  newPoint.onSubmit = (newObj) => {
    makeRequestInsertData(newObj, newPoint);
  };

  newPoint.onKeyEsc = () => {
    newPoint.unrender();
  };
});


const respondToError = (elem) => {
  elem.element.style.border = `2px solid rgb(191, 38, 65)`;
  elem.shake();
  elem.unblockToSave();
};


const getFilterEvents = (filterName, trips) => {
  const fnFilter = {
    'filter-everything': (obj) => {
      return obj;
    },
    'filter-future': (obj) => {
      return obj.filter((el) => el.newTime.timeStart > Date.now());
    },
    'filter-past': (obj) => {
      return obj.filter((el) => el.newTime.timeEnd < Date.now());
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

window.addEventListener(`offline`, () => {
  document.title = `${document.title}[OFFLINE]`;
});

window.addEventListener(`online`, () => {
  document.title = document.title.split(`[OFFLINE]`)[0];
  provider.syncPoints();
});

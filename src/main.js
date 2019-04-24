import {filtersData, sortingData, statData, STORE_KEYS} from './mock-data/trip-constants';
import {TripEdit} from './view/trip-edit';
import {Trip} from './view/trip';
import {TripDay} from './view/trip-day';
import {Stat} from './view/stat';
import {TotalCost} from './view/total-cost';
import {Filter} from './view/filter';

import {Store} from './data/store';
import {Provider} from './data/provider';
import {Adapter} from './data/adapter';
import {Sorting} from './view/sorting';
import {Api} from './data/api';

import {removeCheckedInput, getFilterSortingEvents, elementName} from './sorting-filtering-controller';

import moment from 'moment';


const boardTotalCost = document.querySelector(`.trip`);
const controls = document.querySelector(`.trip-controls`);
const filterListWrapper = controls.querySelector(`.trip-filter`); // контэйнер для вставки фильтров
const tripListWrapper = document.querySelector(`.trip-points`); // контэйнер для вставки путешествий вместе с датами
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


let offers = [];
let destinations = [];
let points = [];
let data = {
  events: points,
  stat: statData
};


const createArrDays = (arrPoints) => {
  const arrDays = [];
  arrPoints.forEach((point) => {
    const day = moment(point.newTime.timeStart).format(`DD MMM YY`);
    if (arrDays.indexOf(day) === -1) {
      arrDays.push(day);
    }
  });
  return arrDays;
  // return arrDays.sort((a, b) => +moment(a).format(`YYYYMMDD`) - +moment(b).format(`YYYYMMDD`));
};

const renderDays = (arrPoints) => {
  tripListWrapper.innerHTML = ``;
  const arrDays = createArrDays(arrPoints);
  arrDays.forEach((day) => {
    const boardDay = new TripDay(day).render();
    const pointsPerDay = arrPoints.filter((el) => moment(el.newTime.timeStart).format(`DD MMM YY`) === day);
    const distEvents = boardDay.querySelector(`.trip-day__items`);
    tripListWrapper.appendChild(boardDay);
    renderTrips(pointsPerDay, distEvents);
  });
};

const renderOneDay = (arrPoints) => {
  let minDay = Date.now();
  arrPoints.forEach((elem) => {
    minDay = elem.newTime.timeStart < minDay ? elem.newTime.timeStart : minDay;
  });
  minDay = moment(minDay).format(`DD MMM YY`);
  tripListWrapper.innerHTML = ``;
  const boardDay = new TripDay(minDay).render();
  const distEvents = boardDay.querySelector(`.trip-day__items`);
  tripListWrapper.appendChild(boardDay);
  renderTrips(arrPoints, distEvents);
};

const renderTargetEvents = (isInAscOrder = true) => {
  if (elementName.nameSorting === `sorting-event`) {
    if (isInAscOrder) {
      renderDays(getFilterSortingEvents(points));
    } else {
      renderDays(getFilterSortingEvents(points).reverse());
    }
  } else {
    if (isInAscOrder) {
      renderOneDay(getFilterSortingEvents(points));
    } else {
      renderOneDay(getFilterSortingEvents(points).reverse());
    }
  }
};


const renderTrips = (pointsArr, dist) => {
  dist.innerHTML = ``;

  pointsArr.forEach((item) => {

    const trip = new Trip(item);
    const tripEdit = new TripEdit(offers, destinations, item);

    // открываем карточку редактирования маршрута
    trip.onEdit = () => {
      tripEdit.render();
      dist.replaceChild(tripEdit.element, trip.element);
      trip.unrender();
    };

    // режактируем маршрут и сохраняем изменения
    tripEdit.onSubmit = (newObj) => {
      makeRequestUpdateData(newObj, trip, tripEdit, dist);
    };

    // отмена изменений в карточке
    tripEdit.onKeyEsc = () => {
      trip.render();
      dist.replaceChild(trip.element, tripEdit.element);
      tripEdit.resetTrip(trip);
      tripEdit.unrender();
    };

    // удаление карточки
    tripEdit.onDelete = ({id}) => {
      makeRequestDeleteData(id, tripEdit);
    };

    dist.appendChild(trip.render());
  });
};

const makeRequestGetData = async () => {
  tripListWrapper.textContent = `Loading route...`;
  try {
    [offers, destinations, points] =
    await Promise.all([providerOffers.getOffers(), providerDestinations.getDestinations(), provider.getPoints()]);
    data = {
      events: points,
      stat: statData
    };
    initApp();
    initStat(data);
  } catch (err) {
    tripListWrapper.textContent = `Something went wrong while loading your route info. Check your connection or try again later`;
  }
};

const renderTotalCost = () => {
  cost.getCostTrip(points);
  boardTotalCost.appendChild(cost.render());
};

const updateTotalCost = (pointsArr) => {
  cost.unrender();
  renderTotalCost(pointsArr);
};

const initApp = () => {
  tripListWrapper.textContent = ``;
  renderTotalCost(points);
  renderFilters(filtersData);
  renderSorting(sortingData);
  renderDays(points);
};

const initStat = () => {
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
    data = {
      events: points,
      stat: statData
    };
    renderTargetEvents();
    updateTotalCost();
  } catch (err) {
    respondToError(tripEdit);
  }
};


const makeRequestDeleteData = async (id, tripEdit) => {
  try {
    tripEdit.blockToDelete();
    await provider.deletePoint({id});
    points = await provider.getPoints();
    tripEdit.unrender();
    renderTargetEvents();
    data = {
      events: points,
      stat: statData
    };
    updateTotalCost();
  } catch (err) {
    respondToError(tripEdit);
  }
};


const makeRequestInsertData = async (newDataPoint, newTripToRender) => {
  try {
    newTripToRender.blockToSave();
    await provider.createPoint({point: Adapter.toRAW(newDataPoint)});
    points = await provider.getPoints();
    newTripToRender.unrender();
    tripListWrapper.innerHTML = ``;
    renderTargetEvents();
    data = {
      events: points,
      stat: statData
    };
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


const renderFilters = (filterArr) => {
  return filterArr.forEach((item) => {
    const filter = new Filter(item);
    filterListWrapper.appendChild(filter.render());

    filter.onFilter = ({target}) => {
      const clickedFilter = target.classList.contains(`trip-filter__item`);
      if (clickedFilter && !target.previousElementSibling.disabled) {
        tripListWrapper.innerHTML = ``;

        elementName.nameFilter = target.previousElementSibling.id;
        renderTargetEvents();

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

        elementName.nameSorting = target.id;
        renderTargetEvents(sortingEl.isAsc);

        removeCheckedInput(target, sortingListWrapper, `input[name="sorting"]`);
      }
    };

  });
};


statBtn.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  filterListWrapper.classList.add(`visually-hidden`);
  if (!evt.target.classList.contains(`view-switch__item--active`)) {
    toggleToStat();
  }
  stat.update(data);
});

boardsBtn.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  filterListWrapper.classList.remove(`visually-hidden`);
  if (!evt.target.classList.contains(`view-switch__item--active`)) {
    toggleToTable();
  }
});


window.addEventListener(`offline`, () => {
  document.title = `${document.title}[OFFLINE]`;
});

window.addEventListener(`online`, () => {
  document.title = document.title.split(`[OFFLINE]`)[0];
  provider.syncPoints();
});

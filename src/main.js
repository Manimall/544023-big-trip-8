import {filtersData, sortingData} from './mock-data/trip-constants';
import {TripEdit} from './view/trip-edit';
import {Trip} from './view/trip';
// import {Sorting} from './view/sorting';
import {Filter} from './view/filter';
import {mockTrip} from './mock-data/generate-mock-trips';
import {Sorting} from './view/sorting';
import moment from 'moment';

const INITIAL_TRIP_COUNT = 7; // необходимое по заданию кол-во событий

const controls = document.querySelector(`.trip-controls`);

const filterListWrapper = controls.querySelector(`.trip-filter`); // контэйнер для вставки фильтров

const tripListWrapper = document.querySelector(`.trip-day__items`); // контэйнер для вставки путешествий

// const boardsBtn = controls.querySelector(`a[href*=table]`); // борд с путешествиями
// const statBtn = controls.querySelector(`a[href*=stats]`); // борд со статистикой

const boardTable = document.querySelector(`#table`);
// const boardDays = boardTable.querySelector(`.trip-points`);

const sortingListWrapper = boardTable.querySelector(`.trip-sorting`); // контэйнер для вставки элементов сортировки


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
  };

  return fnFilter[filterName]([...trips]);
};

const renderFilters = (filterArr) => {
  return filterArr.map((item) => {
    const filter = new Filter(item);
    filterListWrapper.appendChild(filter.render());

    filter.onFilter = ({target}) => {
      const clickedFilter = target.classList.contains(`trip-filter__item`);
      if (clickedFilter && !target.previousElementSibling.disabled) {
        tripListWrapper.innerHTML = ``;
        const filteredEvents = getFilterEvents(target.previousElementSibling.id, generatedTrips);
        renderTrips(filteredEvents);
      }
    };
  });
};

renderFilters(filtersData); // отрендеренные фильтры

const renderSorting = (sortingArr) => {
  return sortingArr.map((item) => {
    const sortingEl = new Sorting(item);
    sortingListWrapper.appendChild(sortingEl.render());

    sortingEl.onSorting = ({target}) => {
      if (target.name === `sorting` && !target.disabled) {
        tripListWrapper.innerHTML = ``;
        if (target.checked) {
          sortingEl.changeChecked();
          sortingEl.correctTemplate();

          sortingEl.element.replaceWith(sortingEl.updatedElement);

          sortingEl.unrender();
        }
        const sortingEvents = getSortingEvents(target.id, generatedTrips);
        renderTrips(sortingEvents);
      }
    };
  });
};

renderSorting(sortingData); // отрендеренные элементы сортировки


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
      return tripsCopyArr.sort((a, b) => getDuration(a.tripTime) - getDuration(b.tripTime)).reverse();
    },
    'sorting-price': () => {
      return tripsCopyArr.sort((a, b) => a.price - b.price).reverse();
    },
    'sorting-favorite': () => {
      return tripsCopyArr.sort((a, b) => b.isFavorite - a.isFavorite);
    },
    'sorting-offers': () => {
      return tripsCopyArr.sort((a, b) => b.offers.size - a.offers.size);
    },
  };
  return fnSorting[sortingName]();
};

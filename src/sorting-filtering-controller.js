import moment from 'moment';

import {TotalCost} from './view/total-cost';


let elementName = {
  nameFilter: `filter-everything`,
  nameSorting: `sorting-event`
};


const getFilterSortingEvents = (trips) => {

  const getDuration = (obj) => {
    return moment.duration(moment(obj.timeEnd).diff(moment(obj.timeStart)));
  };

  let tripsCopyArr = [...trips];

  const fnFilter = {
    'filter-everything': () => {
      return tripsCopyArr;
    },
    'filter-future': () => {
      return tripsCopyArr.filter((el) => el.newTime.timeStart > Date.now());
    },
    'filter-past': () => {
      return tripsCopyArr.filter((el) => el.newTime.timeEnd < Date.now());
    },
  };

  const fnSorting = {
    'sorting-event': () => {
      return tripsCopyArr;
    },
    'sorting-time': () => {
      return tripsCopyArr.sort((a, b) => getDuration(a.newTime) - getDuration(b.newTime));
    },
    'sorting-price': () => {
      return tripsCopyArr.sort((a, b) => TotalCost.getPricePoint(a) - TotalCost.getPricePoint(b));
    },
    'sorting-favorite': () => {
      return tripsCopyArr.sort((a, b) => a.isFavorite - b.isFavorite);
    },
    'sorting-offers': () => {
      return tripsCopyArr.sort((a, b) => a.offers.filter((offer) => offer.accepted).length - b.offers.filter((offer) => offer.accepted).length);
    },
  };

  tripsCopyArr = fnFilter[elementName.nameFilter]();
  tripsCopyArr = fnSorting[elementName.nameSorting]();
  return tripsCopyArr;
};


const removeCheckedInput = (elem, parentWrapper, inputClass) => {
  const allInputs = parentWrapper.querySelectorAll(inputClass);
  [...allInputs].forEach((item) => {
    if (elem !== item) {
      item.removeAttribute(`checked`);
    }
  });
};

export {removeCheckedInput, getFilterSortingEvents, elementName};

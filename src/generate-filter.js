import {makeStringFromData} from './helpers';
import {filtersData} from './filters-data';

/**
 * Отрисовываем отдельный фильтр
 * @param {Object} filter - Объект с данными
 * @return {String}  - строку с заполненными данными фильтра
 */
const makeFilter = (filter) =>
  `
  <input type="radio" id="filter-${filter.name}" name="filter" value="${filter.name}" ${filter.checked ? `checked` : ``}>
  <label class="trip-filter__item" for="filter-${filter.name}">${filter.name.charAt(0).toUpperCase() + filter.name.substr(1)}</label>
  `
;

// заполняем разметку фильтра данными из массива фильтров
export const filters = makeStringFromData(filtersData, makeFilter);

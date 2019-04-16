/**
 * Устранение дребезка
 * @param {Function} cb - вызываемая функция
 * @param {Number} interval - задержка вызова
 * @return {Function} - функция фильтрующая частый вызов
 */
const DEFAULT_DEBOUNCE_TIME = 1000; // 1s

const debounce = (cb, interval = DEFAULT_DEBOUNCE_TIME) => {
  let lastTimeout = null;

  return (...args) => {
    if (lastTimeout) {
      clearTimeout(lastTimeout); // перезапускаем функцию, если 1s не прошла
    }

    lastTimeout = setTimeout(() => {
      cb(...args);
    }, interval);
  };
};

export {debounce};

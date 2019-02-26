/**
 * Ищем случайное число (от включительно и до включительно)
 * @param {number} [min=0] - минимальное кол-во задач
 * @param {number} [max=10] - максимальное кол-во задач
 * @return {number} - случайное число - (кол-во тасков у любого фультра)
 */
const getRandomNumber = (min = 0, max = 10) => Math.floor(min + Math.random() * (max + 1 - min));

/**
 * Генерируем Строку из массива данных
 * @param {Array} layoutData - исходный массив данныx
 * @param {cb-function} cb - функция-коллбэк, изменяем исходный массив с данными
 * @return {String} - строка с заполненными данными
 */
const makeStringFromData = (layoutData, cb) => layoutData.reduce(cb, ``);

/**
 * Добавляем элементы в разметку
 * @param {String} fragment - фрагмент, который нужно вставить в разметку
 * @param {HTMLElemen} fragmentWrapper - элемент для вставки фрагмента
 * @param {boolean} [addToStart=false] - куда именно вставляем (если true - вначало fragmentWrapper)
 */
const addToHtml = (fragment, fragmentWrapper, addToStart = true) => {
  fragmentWrapper.insertAdjacentHTML(addToStart ? `afterbegin` : `beforeend`, fragment);
};

export {getRandomNumber, makeStringFromData, addToHtml};

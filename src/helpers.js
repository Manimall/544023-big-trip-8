/**
 * Ищем случайное число (от включительно и до включительно)
 * @param {number} [min=0] - минимальное кол-во задач
 * @param {number} [max=10] - максимальное кол-во задач
 * @return {number} - случайное число - (кол-во тасков у любого фультра)
 */
const getRandomNumber = (min = 1, max = 10) => Math.floor(min + Math.random() * (max + 1 - min));

/**
 * Берем случайный индекс элемента из массива
 * @param {Array} arr - исходный массив
 * @return {Number} - индекс случайного элемента из массива
 */
const getRandomArrayIndex = (arr) => getRandomNumber(0, arr.length - 1);

/**
 * Выбираем случайный элемент из массива
 * @param {Array} arr - исходный массив
 * @return {ElementFromArray} - элемент массива
 */
const getRandomElementFromArr = (arr) => arr[getRandomArrayIndex(arr)];

/**
 * Получаем массив с несколькими рандомными элементами из имеющегося массива
 * @param {Array} arr - исходный массив
 * @param {Number} minItemsQuantity - минимальное кол-во элементов, которые нужно взять (не включая это значение)
 * @param {Number} maxItemsQuantity - максимальное кол-во элементов, которые нужно взять (не включая это значение)
 * @return {Array} - массив с нужным кол-вом элементов
 */
const getFewRandomItemsFromArr = (arr, minItemsQuantity, maxItemsQuantity) => {
  // let copyArr = arr.slice(); // копируем массив
  let copyArr = [...arr]; // копируем массив
  return copyArr
      .sort(() => Math.random() - 0.5) // сортируем его в случайном порядке
      .slice(0, getRandomNumber(minItemsQuantity, maxItemsQuantity)); // возьмем необходимое кол-во элементов (от min до max)
};

/**
 * Возвращаем true или false от функции getRandomNumber и сравниваем с медианой
 * @return {boolean} - true или false
 */
const returnTrueOrFalse = () => Math.random() > 0.5;


/**
 * Генерируем Строку из массива данных, который создаем с помощью функции
 * @param {Array} layoutData - исходный массив данныx
 * @param {function} generateFn - функция, изменяющая каждый элемент массива
 * @return {String} - строка с заполненными и измененными с помощью функции данными
 */
const makeStringFromData = (layoutData, generateFn) => layoutData.reduce((acc, el) => acc + generateFn(el), ``);


const createElement = (template) => {
  const newEl = document.createElement(`div`);
  newEl.innerHTML = template;
  return newEl.firstChild;
};

const KeyCodes = {
  ESC: 27,
  ENTER: 13
};

export {getRandomNumber, getRandomElementFromArr, getFewRandomItemsFromArr, makeStringFromData, createElement, returnTrueOrFalse, KeyCodes};

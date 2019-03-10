/**
 * Ищем случайное число (от включительно и до включительно)
 * @param {number} [min=0] - минимальное кол-во задач
 * @param {number} [max=10] - максимальное кол-во задач
 * @return {number} - случайное число - (кол-во тасков у любого фультра)
 */
const getRandomNumber = (min = 1, max = 10) => Math.floor(min + Math.random() * (max + 1 - min));

/**
 * Берем Случайное значение из массива
 * @param {Array} arr - исходный массив
 * @return {ElementFromArray} - случайный элемент из массива
 */
const getRandomItemFromArr = (arr) => getRandomNumber(0, arr.length - 1);

/**
 * Получаем массив с несколькими рандомными элементами из имеющегося массива
 * @param {Array} arr - исходный массив
 * @param {Number} minItemsQuantity - минимальное кол-во элементов, которые нужно взять (не включая это значение)
 * @param {Number} maxItemsQuantity - максимальное кол-во элементов, которые нужно взять (не включая это значение)
 * @return {Array} - массив с нужным кол-вом элементов
 */
const getFewRandomItemsFromArr = (arr, minItemsQuantity, maxItemsQuantity) => {
  let copyArr = arr.slice(); // копируем массив
  const resultArr = copyArr.sort(() => Math.random() - 0.5) // сортируем его в случайном порядке
                    .slice(0, getRandomNumber(minItemsQuantity, maxItemsQuantity)); // возьмем необходимое кол-во элементов (от min до max)
  return resultArr;
};

/**
 * Генерируем Строку из массива данных
 * @param {Array} layoutData - исходный массив данныx
 * @param {cb-function} cb - функция-коллбэк, изменяем исходный массив с данными
 * @return {String} - строка с заполненными данными
 */
const makeStringFromData = (layoutData, cb) => layoutData.reduce(cb, ``);

export {getRandomNumber, getRandomItemFromArr, getFewRandomItemsFromArr, makeStringFromData};

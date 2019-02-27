/**
 * Ищем случайное число (от включительно и до включительно)
 * @param {number} [min=0] - минимальное кол-во задач
 * @param {number} [max=10] - максимальное кол-во задач
 * @return {number} - случайное число - (кол-во тасков у любого фультра)
 */
const getRandomNumber = (min = 1, max = 10) => Math.floor(min + Math.random() * (max + 1 - min));

/**
 * Генерируем Строку из массива данных
 * @param {Array} layoutData - исходный массив данныx
 * @param {cb-function} cb - функция-коллбэк, изменяем исходный массив с данными
 * @return {String} - строка с заполненными данными
 */
const makeStringFromData = (layoutData, cb) => layoutData.reduce(cb, ``);

export {getRandomNumber, makeStringFromData};

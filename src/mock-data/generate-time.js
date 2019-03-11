// генерируем время для путешествий
import {getRandomNumber} from '../helpers';

/**
 * Рассчитываем разницу между началом и концом путешествия
 * @return {Object} - объект, в котором хранятся:
 * 1) дата и время начала; 2) дата и время завершения события;
 * 3) разница между началом и завершением в часах и минутах
 */
const generateTime = () => {

  const MS_IN_MINUTE = 60 * 1000;
  const MS_IN_HOUR = 60 * MS_IN_MINUTE;
  const MS_IN_DAY = 24 * MS_IN_HOUR;
  const MS_IN_WEEK = 7 * MS_IN_DAY;

  const MINUTES_IN_HOUR = 60;

  // максимальная продолжительность путешествия равна одному дню
  const MAX_TRIP_DURATION = MS_IN_DAY;

  // возвращаем кол-во миллисекунд указанной даты (с текущего момента)
  const dateNow = new Date();

  // дата начала события и окончания события
  const timeStart = new Date(getRandomNumber(dateNow.getTime(), dateNow.getTime() + MS_IN_WEEK));
  const timeEnd = new Date(getRandomNumber(timeStart.getTime(), timeStart.getTime() + MAX_TRIP_DURATION)); // от 1часа до 24 часов

  // разница между start и end в миллисекундах
  const difference = timeEnd - timeStart;
  const minutes = difference / MS_IN_MINUTE;

  const resultHours = Math.floor(minutes / MINUTES_IN_HOUR);
  const resultMinutes = Math.round(minutes % MINUTES_IN_HOUR);

  const interval = {
    hours: resultHours,
    minutes: resultMinutes
  };

  return {
    start: timeStart,
    end: timeEnd,
    interval
  };
};

/**
 * Форматируем время - если цифры меньше 10 - добавляем перед цифрой 0
 * @param {Number} number - часы или минуты путешествия
 * @return {formatMinutes} - в засисимости от числа возвращаем или само это число или 0 + число
 */
const formatTimeOutput = (number) => (number < 10) ? `0` + `${number}` : number;

export {generateTime, formatTimeOutput};

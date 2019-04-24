// генерируем время для путешествий
import {getRandomNumber} from '../utils.js/helpers';

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

  const timeConstants = {
    MS_IN_MINUTE,
    MS_IN_HOUR,
    MS_IN_DAY,
    MS_IN_WEEK,
    MINUTES_IN_HOUR,
    MAX_TRIP_DURATION,
  };

  // возвращаем кол-во миллисекунд указанной даты (с текущего момента)
  const dateNow = new Date();

  // дата начала события и окончания события
  const timeStart = new Date(getRandomNumber(dateNow.getTime(), dateNow.getTime() + timeConstants.MS_IN_WEEK));
  const timeEnd = new Date(getRandomNumber(timeStart.getTime(), timeStart.getTime() + timeConstants.MAX_TRIP_DURATION)); // + (от 1 часа до 24 часов) от timeSatrt

  // устанавливаем секунды указанных дат
  const formatedTimeStart = timeStart.setSeconds(0, 0);
  const formatedTimeEnd = timeEnd.setSeconds(0, 0);

  // разница между start и end в миллисекундах
  const difference = formatedTimeEnd - formatedTimeStart;
  const minutes = difference / timeConstants.MS_IN_MINUTE;

  const resultHours = Math.floor(minutes / timeConstants.MINUTES_IN_HOUR);
  const resultMinutes = minutes % timeConstants.MINUTES_IN_HOUR;

  const interval = {
    hours: resultHours,
    minutes: resultMinutes
  };

  const timeObj = {
    start: timeStart,
    end: timeEnd,
    interval,
  };

  return {timeObj, timeConstants};
};

/**
 * Форматируем время - если цифры меньше 10 - добавляем перед цифрой 0
 * @param {Number} number - часы или минуты путешествия
 * @return {formatMinutes} - в засисимости от числа возвращаем или само это число или 0 + число
 */
const formatTimeOutput = (number) => (number < 10) ? `0` + `${number}` : number;

export {generateTime, formatTimeOutput};

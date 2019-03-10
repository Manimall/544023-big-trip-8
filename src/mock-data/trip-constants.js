// данные для путешествий
// иконки для путешествий
const tripIcons = {
  taxi: `🚕`,
  bus: `🚌`,
  train: `🚂`,
  ship: `🛳️`,
  transport: `🚊`,
  drive: `🚗`,
  flight: `✈️`,
  checkIn: `🏨`,
  sightseeing: `🏛️`,
  restaurant: `🍴`
};

// способы путешествий
const tripTypes = new Set([
  `travel`,
  `flight`,
  `drive`,
  `train`,
  `ship`
]);

// Названия городов для путешествий
const tripCities = new Set([
  `Moscow`,
  `Geneva`,
  `Milan`,
  `Madrid`,
  `Amsterdam`,
  `Barcelona`,
  `Paris`
]);

// все возможные доп. предложения
const tripOffers = [
  `Add luggage`,
  `Switch to comfort class`,
  `Add meal`,
  `Choose seats`
];

// описание для путешествий
// разбиваем эту большую строку на массив элементов по разделютелю (по точке)
const tripDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Cras aliquet varius magna, non porta ligula feugiat eget.
  Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit,
  eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
  Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.
  Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`.split(`.`);

export {tripIcons, tripTypes, tripCities, tripOffers, tripDescription};

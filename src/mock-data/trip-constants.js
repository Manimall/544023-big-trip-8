// данные для путешествий

// иконки для путешествий
const tripIcons = {
  [`Taxi`]: `🚕`,
  [`Bus`]: `🚌`,
  [`Train`]: `🚂`,
  [`Ship`]: `🛳️`,
  [`Transport`]: `🚊`,
  [`Drive`]: `🚗`,
  [`Flight`]: `✈️`,
  [`Check-in`]: `🏨`,
  [`Sightseeing`]: `🏛️`,
  [`Restaurant`]: `🍴`
};

// Названия городов для путешествий
const tripCities = new Set([
  `Moscow`,
  `Geneva`,
  `Milan`,
  `Madrid`,
  `Amsterdam`,
  `Barcelona`,
  `Paris`,
  `Ivanovo`,
  `Novosibirsk`
]);

// все возможные доп. предложения
const tripOffers = [
  `Add luggage`,
  `Switch to comfort class`,
  `Add meal`,
  `Choose seats`,
  `Extend for a few days`,
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


// данные для trip-edit
const tripTypes = [
  {icon: `🏨`, name: `Check-in`, transport: false, place: true},
  {icon: `🚗`, name: `Drive`, transport: true, place: true},
  {icon: `🚌`, name: `Bus`, transport: true, place: true},
  {icon: `🚂`, name: `Train`, transport: true, place: true},
  {icon: `🛳️`, name: `Ship`, transport: true, place: true},
  {icon: `🚊`, name: `Transport`, transport: true, place: true},
  {icon: `🏛️`, name: `Sightseeing`, transport: false, place: true},
  {icon: `🍴`, name: `Restaurant`, transport: false, place: false},
  {icon: `🚕`, name: `Taxi`, transport: true, place: true},
  {icon: `✈️`, name: `Flight`, transport: true, place: true}
];

const tripAllPictures = new Set([
  `http://picsum.photos/300/150?r=${Math.random()}`,
  `http://picsum.photos/300/150?r=${Math.random()}`,
  `http://picsum.photos/300/150?r=${Math.random()}`,
  `http://picsum.photos/300/150?r=${Math.random()}`,
  `http://picsum.photos/300/150?r=${Math.random()}`,
]);

// валюта для путешествий
const tripPriceCurrency = `€`;

export {tripIcons, tripCities, tripOffers, tripDescription, tripTypes, tripPriceCurrency, tripAllPictures};

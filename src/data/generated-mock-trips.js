import {mockTrip} from '../mock-data/generate-mock-trips';

const INITIAL_TRIP_COUNT = 7; // необходимое по заданию кол-во событий

const generateTrips = (amount) => {
  return new Array(amount).fill(null).map((el, id) => mockTrip(id));
};

const generatedTrips = generateTrips(INITIAL_TRIP_COUNT); // необходимое кол-во сгенерированных путешествий

export {generatedTrips};

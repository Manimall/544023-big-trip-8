export class Model {
  constructor(points, offers, destinations) {
    this._points = points;
    this._offers = offers;
    this._destinations = destinations;
  }

  get points() {
    return this._points;
  }

  get offers() {
    return this._offers;
  }

  get destinations() {
    return this._destinations;
  }

  set points(data) {
    this._points = data;
  }

  set destinations(data) {
    this._destinations = data;
  }

  set offers(data) {
    this._offers = data;
  }

  update(newPoints) {
    this._points = newPoints;
  }
}

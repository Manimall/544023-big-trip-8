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

  update(newPoints) {
    this._points = newPoints;
  }
}

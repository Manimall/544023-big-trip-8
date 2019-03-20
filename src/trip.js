import {getOffersLayout} from './format-offers';
import {formatTimeOutput} from './mock-data/generate-time';
import {createElement} from './helpers';

export class Trip {
  constructor(obj) {
    this._title = obj.title;

    this._id = obj.id;

    this._icon = obj.icon;
    this._description = obj.description;
    this._picture = obj.picture;

    this._price = obj.price;
    this._priceCurrency = obj.priceCurrency;
    this._fullPrice = obj.fullPrice;

    this._offers = obj.offers;
    this._time = obj.time;

    this._state = {};
    this._element = null;

  }

  get template() {
    return (
      `<article class="trip-point" id="${this._id}">
        <i class="trip-icon">${this._icon}</i>
        <h3 class="trip-point__title">${this._title}</h3>
        <p class="trip-point__schedule">
          <span class="trip-point__timetable">
            ${formatTimeOutput(this._time.start.getHours())}:${formatTimeOutput(this._time.start.getMinutes())}
              &nbsp;&mdash;
            ${formatTimeOutput(this._time.end.getHours())}:${formatTimeOutput(this._time.end.getMinutes())}
          </span>
          <span class="trip-point__duration">
            ${this._time.interval.hours}h ${this._time.interval.minutes}m
          </span>
        </p>
        <p class="trip-point__price">${this._fullPrice}</p>
        <ul class="trip-point__offers">
          ${getOffersLayout(this._offers).join(``)}
        </ul>
      </article>`
    );
  }

  get element() {
    return this._element;
  }

  onEdit() {

  }

  bind() {
    this.element.addEventListener(`click`, this.onEdit);
  }

  unbind() {
    this._element.addEventListener(`click`, this.onEdit);
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }
}

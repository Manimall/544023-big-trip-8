import {getOffersLayout} from './parts-of-trip-template/format-offers';
import {formatTimeOutput} from './mock-data/generate-time';

import {Component} from './component';


export class Trip extends Component {
  constructor(obj) {
    super();

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

  onEdit() {

  }

  bind() {
    this.element.addEventListener(`click`, this.onEdit);
  }

  unbind() {
    this._element.addEventListener(`click`, this.onEdit);
  }
}

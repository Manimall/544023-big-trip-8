import {getOffersLayout} from '../parts-of-trip-template/format-offers';

import moment from 'moment';

import {Component} from './component';


export class Trip extends Component {
  constructor(obj) {
    super();
    this._title = obj.title;
    this._id = obj.id;
    this._icon = obj.icon;
    this._description = [...obj.description];
    this._picture = obj.picture;
    this._price = obj.price;
    this._priceCurrency = obj.priceCurrency;
    this._fullPrice = obj.fullPrice;
    this._isFavorite = obj.isFavorite;
    this._offers = new Set([...obj.offers]);
    this._time = obj.time;

    this._newTime = obj.tripTime;

    this._state = {};
  }

  update(obj) {
    this._title = obj.title;
    this._icon = obj.icon;
    this._description = obj.description;
    this._picture = obj.picture;
    this._price = obj.price;
    this._priceCurrency = obj.priceCurrency;
    this._fullPrice = obj.fullPrice;
    this._offers = obj.offers;
    this._time = obj.time;
    this._isFavorite = obj.isFavorite;

    this._newTime = obj.tripTime;
  }

  _getTripDuration() {
    let duration = moment.duration(moment(this._newTime.timeEnd).set({second: 0, millisecond: 0}).diff(moment(this._newTime.timeStart).set({second: 0, millisecond: 0})));
    const days = duration.days();
    if (days > 0) {
      this._newTime.timeEnd = moment(moment(this._newTime.timeEnd).subtract(days, `days`)).valueOf();
      duration = moment.duration(moment(this._newTime.timeEnd).set({second: 0, millisecond: 0}).diff(moment(this._newTime.timeStart).set({second: 0, millisecond: 0})));
    }
    return duration.days() > 0 ? `${days}D ${duration.hours()}H ${duration.minutes()}M` : `${duration.hours()}H ${duration.minutes()}M`;
  }

  _getTimeStr() {
    return `${moment(this._newTime.timeStart).set({second: 0, millisecond: 0}).format(`H:mm`)}&nbsp;&mdash;&nbsp;${moment(this._newTime.timeEnd).set({second: 0, millisecond: 0}).format(`H:mm`)}`;
  }

  _getTripTimeLayout() {
    return (
      `<span class="trip-point__timetable">
        ${this._getTimeStr()}
      </span>
      <span class="trip-point__duration">
        ${this._getTripDuration()}
      </span>`
    );
  }

  get template() {
    return (
      `<article class="trip-point" id="${this._id}">
        <i class="trip-icon">${this._icon}</i>
        <h3 class="trip-point__title">${this._title}</h3>
        <p class="trip-point__schedule">
          ${this._getTripTimeLayout()}
        </p>
        <div class="trip-point__favorite-wrap">
          <span class="trip-point__favorite ${this._isFavorite ? `trip-point__favorite--active` : ``}">${this._isFavorite}</span>
        </div>
        <p class="trip-point__price">${this._fullPrice}</p>
        ${this._offers.size !== 0 ?
        `<ul class="trip-point__offers">
          ${getOffersLayout(this._offers).join(``)}
        </ul>` : ``}
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

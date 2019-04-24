import {getOffersLayout} from '../parts-of-trip-template/format-offers';
import {tripTypes} from '../mock-data/trip-constants';

import moment from 'moment';

import {Component} from './component';


export class Trip extends Component {
  constructor(obj) {
    super();
    this.data = obj;

    this._id = obj.id;
    this._type = obj.type;
    this._city = obj.destination;
    this._newTime = obj.newTime;
    this._priceCurrency = `€`;
    this._price = obj.price;
    this._fullPrice = `${this._price} ${this._priceCurrency}`;
    this._isFavorite = obj.isFavorite;
    this._offers = new Set([...obj.offers]);

    this._tripInfo = Object.assign({}, this._findTripByTripName());
    this._icon = this._tripInfo.icon;
  }

  get template() {
    return (
      `<article class="trip-point" id="${this._id}">
        <i class="trip-icon">${this._icon}</i>
        <h3 class="trip-point__title">${this._getTripTitle()}</h3>
        <p class="trip-point__schedule">
          ${this._getTripTimeLayout()}
        </p>
        <div class="trip-point__favorite-wrap">
          <span class="trip-point__favorite ${this._isFavorite ? `trip-point__favorite--active` : ``}">${this._isFavorite}</span>
        </div>
        <p class="trip-point__price">${this._fullPrice}</p>
        ${this._offers.size !== 0 ?
        `<ul class="trip-point__offers">
          ${getOffersLayout(this._filterOffers()).join(``)}
        </ul>` : ``}
      </article>`
    );
  }

  onEdit() {

  }

  update(obj) {
    this._id = obj.id;
    this._city = obj.destination;
    this._type = obj.type;
    this._description = obj.description;
    this._pictures = new Set([...obj.pictures]);
    this._isFavorite = obj.isFavorite;
    this._newTime = obj.newTime;
    this._price = obj.price;
    this._fullPrice = `${obj.price} ${this._priceCurrency}`;
    this._offers = new Set([...obj.offers]);
    this._tripInfo = this._findTripByTripName();
    this._icon = this._tripInfo.icon;
  }

  _findTripByTripName() {
    return tripTypes.find((el) => el.name.toLowerCase() === this._type);
  }

  _filterOffers() {
    this._offers = [...this._offers].filter((item) => item.accepted);
    return this._offers;
  }

  _getTripTitle() {
    const tripType = this._tripInfo.transport ? `${this._tripInfo.name} to` : `${this._tripInfo.name} at`;
    const tripDestination = this._city;
    return `${tripType} ${tripDestination}`;
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

  _bind() {
    this.element.addEventListener(`click`, this.onEdit);
  }

  _unbind() {
    this._element.addEventListener(`click`, this.onEdit);
  }
}

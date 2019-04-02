import {formatTimeOutput} from './mock-data/generate-time';
import {formatTravelWay} from './parts-of-trip-edit-template/format-travel-ways';
import {makeDestination} from './parts-of-trip-edit-template/format-destination';
import {formatEditOffers} from './parts-of-trip-edit-template/format-edit-offers';
import {getAllImages} from './parts-of-trip-edit-template/format-pictures';

import {Component} from './component';


export class TripEdit extends Component {
  constructor(obj) {
    super();

    this._title = obj.title;

    this._id = obj.id;

    this._cities = obj.cities;
    this._city = obj.city;

    this._icon = obj.icon;
    this._description = obj.description;

    this._picture = obj.picture;
    this._pictures = obj.pictures;

    this._price = obj.price;
    this._priceCurrency = obj.priceCurrency;
    this._fullPrice = obj.fullPrice;

    this._isFavorite = obj.isFavorite;

    this._offers = obj.offers;
    this._allOffers = obj.allOffers;

    this._time = obj.time;

    this._type = obj.type;
    this._types = obj.types;

    // непонятная хрень
    this._element = null;

    // привязка методов
    this.onSubmit = this.onSubmit.bind(this);
    this._onPriceChange = this._onPriceChange.bind(this);
  }

  update(obj) {
    this._title = obj.title;
    this._city = obj.city;
    this._icon = obj.icon;
    this._description = obj.description;
    this._picture = obj.picture;
    this._price = obj.price;
    this._priceCurrency = obj.priceCurrency;
    this._fullPrice = obj.fullPrice;
    this._isFavorite = obj.isFavorite;
    this._offers = obj.offers;
    this._time = obj.time;
    this._type = obj.type;
  }

  _onPriceChange(evt) {
    evt.preventDefault();

    const priceEntered = evt.target.value;
    if (priceEntered.match(/^\d{2,3}$/)) {
      this._price = priceEntered;
    }
  }

  _getNewTripData() {
    return {
      title: this._title,
      city: this._city,
      icon: this._icon,
      description: this._description,
      picture: this._picture,
      price: this._price,
      priceCurrency: this._priceCurrency,
      fullPrice: this._fullPrice,
      isFavorite: this._isFavorite,
      time: this._time,
      type: this._type,
    };
  }

  get template() {
    return (
      `<article class="point" id="${this._id}">
        <form class="point-edit" action="" method="get">
          <header class="point__header">
            <label class="point__date">
              choose day
              <input class="point__input" type="text" placeholder="MAR 18" name="day">
            </label>

            <div class="travel-way">
              <label class="travel-way__label" for="travel-way__toggle">${this._icon}</label>

              <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

              ${formatTravelWay(this._types, this._icon)}

            </div>

            ${makeDestination(this._cities, this._type, this._city)}

            <label class="point__time">
              choose time

              <input class="point__input" type="text"
              value="${formatTimeOutput(this._time.start.getHours())}:${formatTimeOutput(this._time.start.getMinutes())}
                        &nbsp;&mdash;
                    ${formatTimeOutput(this._time.end.getHours())}:${formatTimeOutput(this._time.end.getMinutes())}"
              name="time"
              placeholder="${formatTimeOutput(this._time.start.getHours())}:${formatTimeOutput(this._time.start.getMinutes())}
                              &nbsp;&mdash;
                          ${formatTimeOutput(this._time.end.getHours())}:${formatTimeOutput(this._time.end.getMinutes())}"
              >
            </label>

            <label class="point__price">
              write price
              <span class="point__price-currency">${this._priceCurrency}</span>
              <input class="point__input" type="text" value="${this._price}" name="price">
            </label>

            <div class="point__buttons">
              <button class="point__button point__button--save" type="submit">Save</button>
              <button class="point__button" type="reset">Delete</button>
            </div>

            <div class="paint__favorite-wrap">
              <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite" ${this._isFavorite ? `checked` : ``}>
              <label class="point__favorite" for="favorite">favorite</label>
            </div>
          </header>

          <section class="point__details">
            <section class="point__offers">
              <h3 class="point__details-title">offers</h3>

              ${formatEditOffers(this._allOffers)}

            </section>
            <section class="point__destination">
              <h3 class="point__details-title">Destination</h3>

              <p class="point__destination-text">
                ${this._description}
              </p>

              ${getAllImages(this._pictures)}

            </section>

            <input type="hidden" class="point__total-price" name="total-price" value="">
          </section>
        </form>
      </article>`
    );
  }

  bind() {
    this._element.querySelector(`article > form`).addEventListener(`submit`, this.onSubmit);
    this._element.querySelector(`article > form`).addEventListener(`reset`, () => {});
    this._element.querySelector(`input[name="price"]`).addEventListener(`change`, this._onPriceChange);
  }

  unbind() {
    this._element.querySelector(`article > form`).removeEventListener(`submit`, this.onSubmit);
    this._element.querySelector(`article > form`).removeEventListener(`reset`, () => {});
    this._element.querySelector(`input[name="price"]`).removeEventListener(`change`, this._onPriceChange);
  }

  // not working
  onSubmit() {
    this.update(this._getNewTripData());
  }
}

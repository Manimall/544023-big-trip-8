import {formatTimeOutput} from './mock-data/generate-time';
import {createElement} from './helpers';
import {formatTravelWay} from './format-travel-ways';
import {makeDestination} from './format-destination';
import {formatEditOffers} from './format-edit-offers';
import {getAllImages} from './format-pictures';

export class tripEdit {
  constructor(obj) {
    this._title = obj.title;

    this._id = obj.id;

    this._cities = obj.cities;
    this._city = obj.city;

    this._icon = obj.icon;
    this._description = obj.description;

    this._picture = obj.picture;
    this._allPictures = obj.allPictures;

    this._price = obj.price;
    this._priceCurrency = obj.priceCurrency;
    this._fullPrice = obj.fullPrice;

    this._isFavorite = obj.isFavorite;

    this._offers = obj.offers;
    this._allOffers = obj.allOffers;

    this._time = obj.time;

    this._type = obj.type;
    this._types = obj.types;

    this._place = obj.place;

    this._state = {};
    this._element = null;
  }

  get element() {
    return this._element;
  }

  get template() {
    return (
      `<article class="point">
        <form action="" method="get">
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

            ${makeDestination(this._cities, this._type, this._city, this._place)}

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

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  bind() {
    this._element.querySelector(`.trip-point`)
      .addEventListener(`click`, this.onEdit);
  }

  onEdit() {

  }

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }

}

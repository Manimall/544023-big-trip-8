import {formatTravelWay} from './parts-of-trip-edit-template/format-travel-ways';
import {makeDestination} from './parts-of-trip-edit-template/format-destination';
import {formatEditOffers} from './parts-of-trip-edit-template/format-edit-offers';
import {getAllImages} from './parts-of-trip-edit-template/format-pictures';

import {MIN_PRICE, MAX_PRICE} from './mock-data/generate-mock-trips';
import {tripTypes, tripCities} from './mock-data/trip-constants';
import {KeyCodes} from './helpers';

import moment from 'moment';
import flatpickr from 'flatpickr';

import {Component} from './component';


export class TripEdit extends Component {
  constructor(obj) {
    super();
    this._title = obj.title;
    this._id = obj.id;
    this._city = obj.city;
    this._icon = obj.icon;
    this._description = [...obj.description];
    this._picture = obj.picture;
    this._pictures = new Set([...obj.pictures]);
    this._price = obj.price;
    this._priceCurrency = obj.priceCurrency;
    this._fullPrice = obj.fullPrice;
    this._isFavorite = obj.isFavorite;
    this._offers = new Set([...obj.offers]);
    this._allOffers = new Set([...obj.allOffers]);
    this._time = obj.time;
    this._type = obj.type;
    this._tripInfo = Object.assign({}, obj.tripInfo);
    this._newTime = obj.tripTime;

    this._initialData = obj;

    this._onSubmitBtnClick = this._onSubmitBtnClick.bind(this);
    this._onKeydownEsc = this._onKeydownEsc.bind(this);
    this._onPriceChange = this._onPriceChange.bind(this);
    this._onKeyDownFormPress = this._onKeyDownFormPress.bind(this);
    this._onTravelTypeChange = this._onTravelTypeChange.bind(this);
    this._onTravelCityChange = this._onTravelCityChange.bind(this);
    this._onOffersAddAndDelete = this._onOffersAddAndDelete.bind(this);
    this._onFavoriteChange = this._onFavoriteChange.bind(this);
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
    this._offers = new Set([...obj.offers]);
    this._time = obj.time;
    this._type = obj.type;
    this._tripInfo = Object.assign({}, obj.tripInfo);
    this._newTime = obj.tripTime;
  }

  _processOffers() {
    const renderedOffers = [...this._allOffers].map((offer) => {
      return [...this._offers].find((el) => el.name === offer.name) ?
        Object.assign({chosen: true}, offer) :
        offer;
    });
    return formatEditOffers(renderedOffers);
  }

  _onPriceChange(evt) {
    evt.preventDefault();

    let priceEntered = evt.target.value;
    if (priceEntered.match(/^\d{2,3}$/)) {
      if (+priceEntered < MIN_PRICE) {
        priceEntered = MIN_PRICE;
      }
      if (+priceEntered > MAX_PRICE) {
        priceEntered = MAX_PRICE;
      }
      priceEntered = +priceEntered;
      this._price = priceEntered;
      this._fullPrice = `${this._price} ${this._priceCurrency}`;

      this.partialUpdate();
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
      tripInfo: this._tripInfo,
      offers: this._offers,
      tripTime: this._newTime,
    };
  }

  _onTravelTypeChange({target}) {
    [this._icon, this._tripInfoName] = target.nextElementSibling.textContent.trim().split(` `);
    this._tripInfo = tripTypes.find((el) => el.name.toLowerCase() === this._tripInfoName);

    this._type = this._tripInfo.name;
    this._city = this._element.querySelector(`.point__destination-input`).value;

    this.partialUpdate();
    this._getTripTitle();
  }

  _onTravelCityChange({target}) {
    const cityArr = [...tripCities].filter((item) => item === target.value);
    if (cityArr.length) {
      this._city = target.value;
    }

    this.partialUpdate();
    this._getTripTitle();
  }

  _getTripTitle() {
    const titleFirstPart = this._element.querySelector(`.point__destination-label`).textContent;
    const titleSecondPart = this._city;

    this._title = `${titleFirstPart} ${titleSecondPart}`;
    return this._title;
  }

  _onOffersAddAndDelete({target}) {
    const clickedOffer = target.nextElementSibling;

    const offerName = clickedOffer.querySelector(`.point__offer-service`).textContent.trim();
    const offerPrice = clickedOffer.querySelector(`.point__offer-price`).textContent.trim();
    const offerCurrency = this._priceCurrency;

    const offerToAdd = {
      name: offerName,
      price: +offerPrice,
      currency: offerCurrency
    };

    if (![...this._offers].find((el) => el.name === offerToAdd.name)) {
      this._offers.add(offerToAdd);

      this._price = +this._price + offerToAdd.price;
      this._fullPrice = `${this._price} ${this._priceCurrency}`;
    }

    if (!target.checked) {
      const filteredArr = [...this._offers].filter((el) => el.name !== offerToAdd.name);
      this._offers = new Set(filteredArr);

      this._price = +this._price - offerToAdd.price;
      if (this._price < MIN_PRICE) {
        this._price = MIN_PRICE;
      }
      this._fullPrice = `${this._price} ${this._priceCurrency}`;
    }

    this.partialUpdate();
  }

  _onFavoriteChange({target}) {
    this._isFavorite = target.checked;
  }

  _setUpTimePicker() {
    const timeStart = flatpickr(this._element.querySelector(`input[name="date-start"]`), {
      [`time_24hr`]: true,
      enableTime: true,
      altInput: true,
      dateFormat: `Z`,
      altFormat: `H:i`,
      defaultDate: moment(this._newTime.timeStart).format(),
      onClose: (dateStr) => {
        this._newTime.timeStart = Date.parse(dateStr);
      },
      onChange: (selectedDates) => {
        timeEnd.set(`minDate`, selectedDates[0]);
      }
    });

    const timeEnd = flatpickr(this._element.querySelector(`input[name="date-end"]`), {
      [`time_24hr`]: true,
      enableTime: true,
      altInput: true,
      dateFormat: `Z`,
      altFormat: `H:i`,
      defaultDate: moment(this._newTime.timeEnd).format(),
      onClose: (dateStr) => {
        this._newTime.timeEnd = Date.parse(dateStr);
      },
      onChange: (selectedDates) => {
        timeStart.set(`maxDate`, selectedDates[0]);
      }
    });
  }

  _getDay() {
    return moment(this._newTime.dayNow).format(`MMM YY`);
  }

  _onDayChange() {
    flatpickr(this._element.querySelector(`input[name="day"]`), {
      altInput: true,
      altFormat: `M j`,
      dateFormat: `M j`,
      defaultDate: this._newTime.dayNow,
      onChange: (selectedDates) => {
        let updatedDateStart = Date.parse(selectedDates[0]);
        if (updatedDateStart < moment().valueOf()) {
          this._newTime.dayNow = moment().valueOf();
        } else {
          this._newTime.dayNow = moment(selectedDates[0]).valueOf();
        }
        this.partialUpdate();
      }
    });
  }

  _getTimeLayout() {
    return (
      `choose time
      <input class="point__input"
              type="text"
              value=""
              name="date-start"
              placeholder=""
      >

      <input class="point__input"
              type="text"
              value=""
              name="date-end"
              placeholder=""
      >`
    );
  }

  _getDayLayout() {
    return `<label class="point__date">
      choose day

      <input class="point__input"
              type="text"
              placeholder="${this._getDay()}"
              name="day"
              value="${this._getDay()}"
      >
    </label>`;
  }

  get template() {
    return (
      `<article class="point" id="${this._id}">
        <form class="point-edit" action="" method="get">
          <header class="point__header">

            ${this._getDayLayout()}

            <div class="travel-way">
              <label class="travel-way__label" for="travel-way__toggle">${this._icon}</label>

              <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

              ${formatTravelWay(tripTypes, this._icon)}

            </div>

            ${makeDestination(tripCities, this._tripInfo, this._city)}


            <div class="point__time">
              ${this._getTimeLayout()}
            </div>

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
              <h3 class="point__details-title">Available offers</h3>

              ${this._processOffers()}

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
    this._element.querySelector(`article > form`).addEventListener(`submit`, this._onSubmitBtnClick);
    this._element.querySelector(`article > form`).addEventListener(`keydown`, this._onKeyDownFormPress);
    this._element.querySelector(`input[name="price"]`).addEventListener(`change`, this._onPriceChange);
    this._element.querySelector(`.travel-way__select`).addEventListener(`change`, this._onTravelTypeChange);
    this._element.querySelector(`.point__destination-input`).addEventListener(`change`, this._onTravelCityChange);
    this._element.querySelector(`.point__offers-wrap`).addEventListener(`change`, this._onOffersAddAndDelete);
    this._element.querySelector(`input[name="favorite"]`).addEventListener(`change`, this._onFavoriteChange);
    this._setUpTimePicker();
    this._onDayChange();
    document.addEventListener(`keydown`, this._onKeydownEsc);
  }

  unbind() {
    this._element.querySelector(`article > form`).removeEventListener(`submit`, this._onSubmitBtnClick);
    this._element.querySelector(`article > form`).addEventListener(`keydown`, this._onKeyDownFormPress);
    this._element.querySelector(`input[name="price"]`).removeEventListener(`change`, this._onPriceChange);
    this._element.querySelector(`.travel-way__select`).removeEventListener(`change`, this._onTravelTypeChange);
    this._element.querySelector(`.point__destination-input`).removeEventListener(`change`, this._onTravelCityChange);
    this._element.querySelector(`.point__offers-wrap`).removeEventListener(`change`, this._onOffersAddAndDelete);
    this._element.querySelector(`input[name="favorite"]`).removeEventListener(`change`, this._onFavoriteChange);
    flatpickr(this._element.querySelector(`input[name="date-start"]`)).destroy();
    flatpickr(this._element.querySelector(`input[name="date-end"]`)).destroy();
    flatpickr(this._element.querySelector(`input[name="day"]`)).destroy();
    document.removeEventListener(`keydown`, this._onKeydownEsc);
  }

  onSubmit() {

  }

  onKeyEsc() {

  }

  _onSubmitBtnClick(evt) {
    evt.preventDefault();

    if (typeof this.onSubmit === `function`) {
      this.onSubmit(this._getNewTripData());
    }

    this.update(this._getNewTripData());
  }

  _onKeydownEsc(evt) {
    if ((typeof this.onKeyEsc === `function`) && (evt.which === KeyCodes.ESC)) {
      this.onKeyEsc();

      this.update(this._initialData);
    }
  }

  _onKeyDownFormPress(evt) {
    if (evt.which === KeyCodes.ENTER) {
      this._onSubmitBtnClick(evt);
    }
  }


}

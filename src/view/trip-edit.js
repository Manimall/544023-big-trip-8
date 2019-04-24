import {formatTravelWay} from '../parts-of-trip-edit-template/format-travel-ways';
import {makeDestination} from '../parts-of-trip-edit-template/format-destination';
import {formatEditOffers} from '../parts-of-trip-edit-template/format-edit-offers';
import {getAllImages} from '../parts-of-trip-edit-template/format-pictures';

import {MIN_PRICE, MAX_PRICE} from '../mock-data/generate-mock-trips';
import {tripTypes, POINT_DEFAULT} from '../mock-data/trip-constants';

import {KeyCodes} from '../utils.js/helpers';

import moment from 'moment';
import flatpickr from 'flatpickr';

import {Component} from './component';


export class TripEdit extends Component {
  constructor(offers, destinations, obj = POINT_DEFAULT) {
    super();
    this._type = obj.type;

    this._destinations = destinations;

    this._id = obj.id;
    this._city = obj.destination;

    this._description = obj.description;
    this._pictures = new Set([...obj.pictures]);

    this._priceCurrency = `€`;
    this._price = obj.price;
    this._fullPrice = `${this._price} ${this._priceCurrency}`;

    this._isFavorite = obj.isFavorite;

    this._fullOffers = offers;
    this._objOffers = new Set([...obj.offers].filter((item) => item.accepted));

    this._tripInfo = Object.assign({}, this._findTripByTripName());
    this._icon = this._tripInfo.icon;

    this._newTime = obj.newTime;

    this._initialData = obj;


    this._onSubmitBtnClick = this._onSubmitBtnClick.bind(this);
    this._onKeydownEsc = this._onKeydownEsc.bind(this);
    this._onPriceChange = this._onPriceChange.bind(this);
    this._onKeyDownFormPress = this._onKeyDownFormPress.bind(this);
    this._onTravelTypeChange = this._onTravelTypeChange.bind(this);
    this._onTravelCityChange = this._onTravelCityChange.bind(this);

    this._onOfferClick = this._onOfferClick.bind(this);
    this._onFavoriteChange = this._onFavoriteChange.bind(this);

    this._onDeleteBtnClick = this._onDeleteBtnClick.bind(this);
    this._onBtnResetClick = this._onBtnResetClick.bind(this);
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

            ${makeDestination(this._destinations, this._tripInfo, this._city)}


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
              <button class="point__button point__button--reset" type="button">Reset</button>
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

              ${this._filterOffers()}

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

  onSubmit() {

  }

  onKeyEsc() {

  }

  onDelete() {

  }

  resetTrip(obj) {
    this._id = obj._id;
    this._city = obj._city;
    this._type = obj._type.toLowerCase();
    this._description = obj._description || this._description;
    this._pictures = (obj._pictures !== undefined) ? new Set([...obj._pictures]) : this._pictures;
    this._isFavorite = obj._isFavorite;
    this._newTime = obj._newTime;
    this._price = obj._price;
    this._objOffers = new Set([...obj._offers]);
    this._tripInfo = obj._tripInfo;
    this._icon = obj._icon;
  }

  blockToSave() {
    const btnSave = this._element.querySelector(`.point__button--save`);
    btnSave.disabled = true;
    btnSave.textContent = `Saving...`;
    this._element.querySelector(`button[type=reset]`).disabled = true;
  }

  unblockToSave() {
    const btnSave = this._element.querySelector(`.point__button--save`);
    btnSave.disabled = false;
    btnSave.textContent = `Save`;
    this._element.querySelector(`button[type=reset]`).disabled = false;
  }

  blockToDelete() {
    const btnDelete = this._element.querySelector(`button[type=reset]`);
    btnDelete.disabled = true;
    btnDelete.textContent = `Deleting...`;
    this._element.querySelector(`.point__button--save`).disabled = true;
  }

  shake() {
    const ANIMATION_TIMEOUT = 600;
    this._element.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._element.style.animation = ``;
    }, ANIMATION_TIMEOUT);
  }


  _filterOffers() {
    const offersForTrip = this._getReferencedOffers(this._fullOffers);
    const renderedOffers = offersForTrip.map((offer) => {
      return [...this._objOffers].find((el) => el.title === offer.name) ?
        Object.assign({accepted: true}, offer) :
        offer;
    });
    return formatEditOffers(renderedOffers);
  }

  _onOfferClick({target}) {
    const clickedOffer = target.nextElementSibling;

    const offerName = clickedOffer.querySelector(`.point__offer-service`).textContent.trim();
    const offerPrice = clickedOffer.querySelector(`.point__offer-price`).textContent.trim();

    const offerToAdd = {
      title: offerName,
      price: +offerPrice,
      accepted: true,
    };

    const isOfferExist = [...this._objOffers].map((offer) => offer.title).includes(offerToAdd.title);

    const newOffers = (!isOfferExist) ?
      [...this._objOffers, offerToAdd] :
      [...this._objOffers].filter((elem) => elem.title !== offerToAdd.title);

    this._objOffers = new Set(newOffers);

    this._partialUpdate();
  }

  _findTripByTripName() {
    return tripTypes.find((el) => el.name.toLowerCase() === this._type);
  }

  _getReferencedOffers(offers) {
    const referencedElement = [...offers].find((el) => el.type === this._type.toLowerCase());
    return referencedElement ? referencedElement.offers : [];
  }

  _onPriceChange(evt) {
    evt.preventDefault();

    let priceEntered = evt.target.value;
    if (priceEntered.match(/^\d{3,4}$/)) {
      if (+priceEntered < MIN_PRICE) {
        priceEntered = MIN_PRICE;
      }
      if (+priceEntered > MAX_PRICE) {
        priceEntered = MAX_PRICE;
      }

      this._price = +priceEntered;
      this._fullPrice = `${this._price} ${this._priceCurrency}`;

      this._partialUpdate();
    }
  }

  _getNewTripData() {
    return {
      id: this._id,
      type: this._type.toLowerCase(),
      destination: this._city,
      price: this._price,
      description: this._description,
      isFavorite: this._isFavorite,
      newTime: Object.assign({}, this._newTime),
      pictures: [...this._pictures],
      offers: new Set([...this._objOffers]),
    };
  }

  _onTravelTypeChange({target}) {
    [this._icon, this._tripInfoName] = target.nextElementSibling.textContent.trim().split(` `);
    this._tripInfo = tripTypes.find((el) => el.name.toLowerCase() === this._tripInfoName);

    this._type = this._tripInfo.name;

    this._objOffers = new Set([...this._getReferencedOffers(this._fullOffers)]);
    this._partialUpdate();
  }

  _onTravelCityChange({target}) {
    for (let destination of this._destinations) {
      if (destination.name === target.value) {
        this._city = destination.name;
        this._description = destination.description;
        this._pictures = destination.pictures;
      }
    }

    this._partialUpdate();
  }

  _onFavoriteChange({target}) {
    this._isFavorite = target.checked;
  }

  _setUpTimePicker() {
    const timeStart = flatpickr(this._element.querySelector(`input[name="date-start"]`), {
      [`time_24hr`]: true,
      enableTime: true,
      noCalendar: true,
      altInput: true,
      altFormat: `H:i`,
      dateFormat: `U`,
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
      noCalendar: true,
      altInput: true,
      altFormat: `H:i`,
      dateFormat: `U`,
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
    return moment(this._newTime.timeStart).format(`MMM YY`);
  }

  _onDayChange() {
    flatpickr(this._element.querySelector(`input[name="day"]`), {
      altInput: true,
      altFormat: `M j`,
      dateFormat: `M j`,
      defaultDate: this._newTime.timeStart,
      onChange: (selectedDates) => {
        console.log(moment(this._newTime.timeStart).format(`DD MMMM`));
        console.log(moment(this._newTime.timeStart));
        console.log(new Date(this._newTime.timeStart));
        let updatedDateStart = Date.parse(selectedDates[0]);
        if (updatedDateStart < this._newTime.timeStart) {
          updatedDateStart = this._newTime.timeStart;
        } else {
          console.log(moment.duration(moment(updatedDateStart).diff(moment(this._newTime.timeStart))));
          const durationInUnix = moment.duration(moment(updatedDateStart).diff(moment(this._newTime.timeStart))).as(`milliseconds`);
          console.log(durationInUnix);
          this._newTime.timeStart = updatedDateStart;
          // this._newTime.timeEnd =
          if (this._newTime.timeEnd < this._newTime.timeStart) {
            this._newTime.timeStart = this._newTime.timeEnd;
          }
        }
        this._partialUpdate();
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

  _bind() {
    this._element.querySelector(`article > form`).addEventListener(`submit`, this._onSubmitBtnClick);
    this._element.querySelector(`article > form`).addEventListener(`keydown`, this._onKeyDownFormPress);
    this._element.querySelector(`input[name="price"]`).addEventListener(`change`, this._onPriceChange);
    this._element.querySelector(`.travel-way__select`).addEventListener(`change`, this._onTravelTypeChange);
    this._element.querySelector(`.point__destination-input`).addEventListener(`change`, this._onTravelCityChange);
    this._element.querySelector(`.point__offers-wrap`).addEventListener(`change`, this._onOfferClick);
    this._element.querySelector(`input[name="favorite"]`).addEventListener(`change`, this._onFavoriteChange);
    this._element.querySelector(`button[type=reset]`).addEventListener(`click`, this._onDeleteBtnClick);
    this._element.querySelector(`.point__button--reset`).addEventListener(`click`, this._onBtnResetClick);

    this._setUpTimePicker();
    this._onDayChange();
    document.addEventListener(`keydown`, this._onKeydownEsc);
  }

  _unbind() {
    this._element.querySelector(`article > form`).removeEventListener(`submit`, this._onSubmitBtnClick);
    this._element.querySelector(`article > form`).addEventListener(`keydown`, this._onKeyDownFormPress);
    this._element.querySelector(`input[name="price"]`).removeEventListener(`change`, this._onPriceChange);
    this._element.querySelector(`.travel-way__select`).removeEventListener(`change`, this._onTravelTypeChange);
    this._element.querySelector(`.point__destination-input`).removeEventListener(`change`, this._onTravelCityChange);
    this._element.querySelector(`.point__offers-wrap`).removeEventListener(`change`, this._onOfferClick);
    this._element.querySelector(`input[name="favorite"]`).removeEventListener(`change`, this._onFavoriteChange);
    this._element.querySelector(`button[type=reset]`).removeEventListener(`click`, this._onDeleteBtnClick);
    this._element.querySelector(`.point__button--reset`).removeEventListener(`click`, this._onBtnResetClick);

    flatpickr(this._element.querySelector(`input[name="date-start"]`)).destroy();
    flatpickr(this._element.querySelector(`input[name="date-end"]`)).destroy();
    flatpickr(this._element.querySelector(`input[name="day"]`)).destroy();
    document.removeEventListener(`keydown`, this._onKeydownEsc);
  }

  _onDeleteBtnClick(evt) {
    evt.preventDefault();
    if (typeof this.onDelete === `function`) {
      this.onDelete({id: this._id});
    }
  }

  _onSubmitBtnClick(evt) {
    evt.preventDefault();

    if (typeof this.onSubmit === `function`) {
      this.onSubmit(this._getNewTripData());
    }
  }

  _onKeydownEsc(evt) {
    if ((typeof this.onKeyEsc === `function`) && (evt.which === KeyCodes.ESC)) {
      this.onKeyEsc();
    }
  }

  _onBtnResetClick(evt) {
    evt.preventDefault();
    return (typeof this.onKeyEsc === `function`) && this.onKeyEsc();
  }

  _onKeyDownFormPress(evt) {
    if (evt.which === KeyCodes.ENTER) {
      this._onSubmitBtnClick(evt);
    }
  }

}

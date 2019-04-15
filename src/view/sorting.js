import {Component} from './component';
import {createControlElement} from '../helpers';

export class Sorting extends Component {
  constructor(obj) {
    super();
    this._name = obj;
    this._classListName = `trip-sorting__element`;

    this._direction = true;
    this._onSortingClick = this._onSortingClick.bind(this);
  }

  render() {
    this._element = createControlElement(this.template, this._classListName);
    this.bind();

    return this._element;
  }

  get direction() {
    return this._direction;
  }

  set direction(value) {
    this._direction = value;
  }

  get template() {
    return (
      `<input type="radio" id="sorting-${this._name}" name="sorting" value="${this._name}" ${(this._name === `event`) ? `checked` : ``}>
      <label class="trip-sorting__item trip-sorting__item--${this._name}" for="sorting-${this._name}">
        ${this._name}

        <span class="sorting-up ${(this._direction) ? `sorting--active` : ``}">&#11014;</span>
        <span class="sorting-down ${(!this._direction) ? `sorting--active` : ``}">&#11015;</span>

      </label>`.trim()
    );
  }

  _changeDirection() {
    this._direction = !this._direction;
    this._partialUpdate();
    this._element.querySelector(`input[name="sorting"]`).checked = true;
  }

  onSorting() {

  }

  _onSortingClick(evt) {
    if (typeof this.onSorting === `function`) {
      this.onSorting(evt);
      this._changeDirection();
    }
  }

  bind() {
    this._element.addEventListener(`click`, this._onSortingClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onSortingClick);
  }
}


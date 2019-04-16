import {Component} from './component';
import {createControlElement} from '../helpers';
import {debounce} from '../debounce';

export class Sorting extends Component {
  constructor(obj) {
    super();
    this._name = obj.name;
    this._classListName = `trip-sorting__element`;
    this._checked = obj.checked;

    this._isAsc = true;

    this._onSortingClick = debounce(this._onSortingClick.bind(this));
  }

  render() {
    this._element = createControlElement(this.template, this._classListName);
    this.bind();

    return this._element;
  }

  get isAsc() {
    return this._isAsc;
  }

  set isAsc(value) {
    this._isAsc = value;
  }

  get template() {
    return (
      `<input type="radio" id="sorting-${this._name}" name="sorting" value="${this._name}" ${this._checked ? `checked` : ``}>
      <label class="trip-sorting__item trip-sorting__item--${this._name}" for="sorting-${this._name}">
        ${this._name}

        <span class="sorting-up ${(this._isAsc) ? `sorting--active` : ``}">&#11014;</span>
        <span class="sorting-down ${(!this._isAsc) ? `sorting--active` : ``}">&#11015;</span>

      </label>`.trim()
    );
  }

  _changeDirection() {
    this._isAsc = !this._isAsc;

    this._checked = true;
    this._partialUpdate();
  }

  onSorting() {

  }

  _onSortingClick(evt) {
    if (typeof this.onSorting === `function`) {
      this.onSorting(evt);
      this._changeDirection(evt);
    }
  }

  bind() {
    this._element.addEventListener(`click`, this._onSortingClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onSortingClick);
  }
}


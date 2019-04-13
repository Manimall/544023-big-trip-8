import {Component} from './component';
import {createControlElement} from '../helpers';

export class Sorting extends Component {
  constructor(obj) {
    super();
    this._name = obj.name;

    this._onSortingClick = this._onSortingClick.bind(this);
  }

  render() {
    this._element = createControlElement(this.template, `sorting__element`);
    this.bind();

    return this._element;
  }

  get template() {
    return (
      `<input type="radio" id="sorting-${this._name}" name="sorting" value="${this._name}" ${(this._name === `event`) ? `checked` : ``}>
      <label class="trip-sorting__item trip-sorting__item--${this._name}" for="sorting-${this._name}">${this._name}</label>`
    );
  }

  onSorting() {

  }

  _onSortingClick() {
    if (typeof this.onSorting === `function`) {
      this.onSorting();
    }
  }

  bind() {
    this._element.addEventListener(`click`, this._onSortingClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onSortingClick);
  }
}


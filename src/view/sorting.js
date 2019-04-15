import {Component} from './component';
import {createControlElement} from '../helpers';

export class Sorting extends Component {
  constructor(obj) {
    super();
    this._name = obj;
    this._classListName = `trip-sorting__element`;

    // свойство порядок
    this._direction = `ASC` || `DESC`;
    this._onSortingClick = this._onSortingClick.bind(this);
  }

  render() {
    this._element = createControlElement(this.template, this._classListName);
    this.bind();

    return this._element;
  }

  get template() {
    return (
      `<input type="radio" id="sorting-${this._name}" name="sorting" value="${this._name}" ${(this._name === `event`) ? `checked` : ``}>
      <label class="trip-sorting__item trip-sorting__item--${this._name}" for="sorting-${this._name}">${this._name}</label>
      `
    );
  }

  onSorting() {

  }

  _addSortingDirection() {
    return (
      `<span class="sorting-up ${(this._direction === `ASC`) ? `sorting--active` : ``}">&#11014;</span>
      <span class="sorting-down ${(this._direction === `DESC`) ? `sorting--active` : ``}">&#11015;</span>`
    );
  }

  correctTemplate() {
    const selectedSort = this.template.concat(this._addSortingDirection());
    this._element = createControlElement(selectedSort, this._classListName);
    this.bind();
    return this._element;
  }

  _onSortingClick(evt) {
    if (typeof this.onSorting === `function`) {
      this.onSorting(evt);
    }
  }

  bind() {
    this._element.addEventListener(`click`, this._onSortingClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onSortingClick);
  }
}


import {Component} from './component';
import {createControlElement} from '../helpers';

export class Filter extends Component {
  constructor(obj) {
    super();
    this._name = obj.name;
    this._checked = obj.checked;
    this._classListName = `trip-filter__element`;

    this._onFilterClick = this._onFilterClick.bind(this);
  }

  get template() {
    return (
      `<input type="radio" id="${this.id}" name="filter" value="${this._name}" ${this._checked ? `checked` : ``}>
      <label class="trip-filter__item" for="filter-${this._name}">${this._name.charAt(0).toUpperCase() + this._name.substr(1)}</label>`
    ).trim();
  }

  get id() {
    this._id = `filter-${this._name}`;
    return this._id;
  }

  onFilter() {

  }

  render() {
    this._element = createControlElement(this.template, this._classListName);
    this._bind();

    return this._element;
  }

  _updateFilter() {
    this._checked = true;
    this._partialUpdate();
  }

  _bind() {
    this._element.addEventListener(`click`, this._onFilterClick);
  }

  _unbind() {
    this._element.removeEventListener(`click`, this._onFilterClick);
  }

  _onFilterClick(evt) {
    if (typeof this.onFilter === `function`) {
      this.onFilter(evt);
      this._updateFilter();
    }
  }
}

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

  render() {
    this._element = createControlElement(this.template, this._classListName);
    this.bind();

    return this._element;
  }

  get id() {
    this._id = `filter-${this._name}`;
    return this._id;
  }

  get template() {
    return (
      `<input type="radio" id="${this.id}" name="filter" value="${this._name}" ${this._checked ? `checked` : ``}>
      <label class="trip-filter__item" for="filter-${this._name}">${this._name.charAt(0).toUpperCase() + this._name.substr(1)}</label>`
    ).trim();
  }

  onFilter() {

  }

  _onFilterClick(evt) {
    if (typeof this.onFilter === `function`) {
      this.onFilter(evt);
    }
  }

  bind() {
    this._element.addEventListener(`click`, this._onFilterClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onFilterClick);
  }
}

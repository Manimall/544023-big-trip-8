import {Component} from './component';
import {createElementControl} from '../helpers';

export class Filter extends Component {
  constructor(obj) {
    super();
    this._name = obj.name;
    this._checked = obj.checked;

    this._onFilterClick = this._onFilterClick.bind(this);
  }

  render() {
    this._element = createElementControl(this.template, `filter__element`);
    this._bind();

    return this._element;
  }

  get template() {
    return (
      `<input type="radio" id="filter-${this._name}" name="filter" value="${this._name}" ${this._checked ? `checked` : ``}>
      <label class="trip-filter__item" for="filter-${this._name}">${this._name.charAt(0).toUpperCase() + this._name.substr(1)}</label>`
    );
  }

  onFilter() {

  }

  _onFilterClick() {
    if (typeof this.onFilter === `function`) {
      this.onFilter();
    }
  }

  bind() {
    this._element.addEventListener(`click`, this._onFilterClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onFilterClick);
  }
}

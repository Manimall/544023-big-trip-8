import {Component} from './component';
import {createControlElement} from '../utils/helpers';
import {debounce} from '../utils/debounce';

export class Sorting extends Component {
  constructor(obj) {
    super();
    this._name = obj.name;
    this._classListName = `trip-sorting__element`;
    this._checked = obj.checked;

    this._isAsc = true;

    this._onSortingClick = debounce(this._onSortingClick.bind(this));
  }

  get template() {
    return (
      `<input type="radio" id="sorting-${this._name}" name="sorting" value="${this._name}" ${this._checked ? `checked` : ``}>
      <label class="trip-sorting__item trip-sorting__item--${this._name}" for="sorting-${this._name}">
        ${this._name}

        <span class="sorting-up ${(this._isAsc) ? `sorting--active` : ``}">
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="100%" height="100%" viewBox="0 0 493.348 493.349" style="enable-background:new 0 0 493.348 493.349;"
            xml:space="preserve">
            <g>
              <path d="M354.034,112.488L252.676,2.853C250.771,0.95,248.487,0,245.82,0c-2.478,0-4.665,0.95-6.567,2.853l-99.927,109.636
                c-2.475,3.049-2.952,6.377-1.431,9.994c1.524,3.616,4.283,5.424,8.28,5.424h63.954v356.315c0,2.663,0.855,4.853,2.57,6.564
                c1.713,1.707,3.899,2.562,6.567,2.562h54.816c2.669,0,4.859-0.855,6.563-2.562c1.711-1.712,2.573-3.901,2.573-6.564V127.907h63.954
                c3.806,0,6.563-1.809,8.274-5.424C356.976,118.862,356.498,115.534,354.034,112.488z"/>
            </g>
          </svg>
        </span>

        <span class="sorting-down ${(!this._isAsc) ? `sorting--active` : ``}">
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="100%" height="100%" viewBox="0 0 493.356 493.355" style="enable-background:new 0 0 493.356 493.355;"
            xml:space="preserve">
          <g>
            <path d="M355.457,370.873c-1.523-3.614-4.288-5.428-8.285-5.428h-63.954V9.135c0-2.666-0.858-4.856-2.569-6.567
              C278.944,0.855,276.753,0,274.084,0h-54.818c-2.667,0-4.854,0.855-6.567,2.568c-1.711,1.711-2.57,3.901-2.57,6.567v356.314h-63.953
              c-3.806,0-6.567,1.81-8.28,5.428c-1.521,3.613-1.043,6.943,1.431,9.996L240.68,490.505c1.903,1.902,4.187,2.851,6.854,2.851
              c2.478,0,4.665-0.948,6.567-2.851l99.927-109.632C356.503,377.82,356.983,374.49,355.457,370.873z"/>
          </g>
          </svg>
        </span>

      </label>`.trim()
    );
  }

  get isAsc() {
    return this._isAsc;
  }

  set isAsc(value) {
    this._isAsc = value;
  }


  onSorting() {

  }

  render() {
    this._element = createControlElement(this.template, this._classListName);
    this._bind();

    return this._element;
  }

  _changeDirection() {
    this._isAsc = !this._isAsc;

    this._checked = true;
    this._partialUpdate();
  }

  _bind() {
    this._element.addEventListener(`click`, this._onSortingClick);
  }

  _unbind() {
    this._element.removeEventListener(`click`, this._onSortingClick);
  }


  _onSortingClick(evt) {
    if (typeof this.onSorting === `function`) {
      this.onSorting(evt);
      this._changeDirection(evt);
    }
  }
}


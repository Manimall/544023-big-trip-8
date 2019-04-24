import {createElement} from '../utils/helpers';

export class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }

    this._element = null;
    this._state = {};
  }

  get template() {
    throw new Error(`You have to define template`);
  }

  get element() {
    return this._element;
  }

  render() {
    this._element = createElement(this.template);
    this._bind();
    return this._element;
  }

  unrender() {
    this._unbind();
    this._element.remove();
    this._element = null;
  }

  _bind() {

  }

  _unbind() {

  }

  _partialUpdate() {
    this._unbind();
    const oldElement = this._element;
    this.render();
    oldElement.parentNode.replaceChild(this._element, oldElement);
  }

}

import {createElement} from '../helpers';

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
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }

  _partialUpdate() {
    this.unbind();
    const oldElement = this._element;
    this.render();
    oldElement.parentNode.replaceChild(this._element, oldElement);
  }

  bind() {

  }

  unbind() {

  }

}

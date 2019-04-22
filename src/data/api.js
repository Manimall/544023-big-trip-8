import {Adapter} from './adapter';

// класс для запросов к серверу
const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const HTTP_SUCCESS = 200;
const HTTP_REDIRECTION = 300;


export class Api {
  constructor({mainUrl, authorization}) {
    this._mainUrl = mainUrl;
    this._authorization = authorization;
  }

  // тест

  // getPoints() {
  //   return this._load({url: `points`})
  //     .then(Api.toJSON)
  //     .then((resolve) => {
  //       console.log(resolve);
  //       console.log(Adapter.parsePoints(resolve));
  //       return Adapter.parsePoints(resolve);
  //     });
  // }

  // получаем точки путешествия
  getPoints() {
    return this._load({url: `points`})
      .then(Api.toJSON)
      .then(Adapter.parsePoints);
  }

  // получаем дестинайшены
  getDestinations() {
    return this._load({url: `destinations`})
      .then(Api.toJSON);
  }

  // получаем офферы
  getOffers() {
    return this._load({url: `offers`})
      .then(Api.toJSON);
  }

  // создаем новую точку путешествия
  createPoint({point}) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(point),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(Api.toJSON)
      .then(Adapter.parsePoint);
  }

  updatePoint({id, data}) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(Api.toJSON)
      .then(Adapter.parsePoint);
  }

  deletePoint({id}) {
    return this._load({
      url: `points/${id}`,
      method: Method.DELETE
    });
  }

  syncPoints({points}) {
    return this._load({
      url: `points/sync`,
      method: Method.POST,
      body: JSON.stringify(points),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(Api.toJSON);
  }


  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);
    return fetch(`${this._mainUrl}/${url}`, {method, body, headers})
      .then(Api.checkStatus)
      .catch((err) => {
        window.console.error(`fetch error: ${err}`);
        throw err;
      });
  }


  static checkStatus(response) {
    if (response.status >= HTTP_SUCCESS && response.status < HTTP_REDIRECTION) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static toJSON(response) {
    return response.json();
  }
}

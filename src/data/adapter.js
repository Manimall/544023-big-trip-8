export class Adapter {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.newTime = {};
    this.newTime.timeStart = data[`date_from`];
    this.newTime.timeEnd = data[`date_to`];
    this.price = data[`base_price`] || 0;
    this.offers = data[`offers`] || [];
    this.destination = data[`destination`].name || ``;
    this.description = data[`destination`].description || ``;
    this.pictures = data[`destination`].pictures || [];
    this.isFavorite = Boolean(data[`is_favorite`]) || false;
  }

  // приводим данные к серверному виду
  static toRAW(data) {
    return {
      'id': data.id,
      'type': data.type,
      'date_from': data.newTime.timeStart,
      'date_to': data.newTime.timeEnd,
      'base_price': +data.price,
      'destination': {name: data.destination, description: data.description, pictures: data.pictures},
      'is_favorite': data.isFavorite,
      'offers': [...data.offers],
    };
  }

  static parsePoint(data) {
    return new Adapter(data);
  }

  static parsePoints(data) {
    return data.map(Adapter.parsePoint);
  }
}

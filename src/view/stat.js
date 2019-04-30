import {tripTypes, statData} from '../mock-data/trip-constants';
import moment from 'moment';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {TotalCost} from './total-cost';

const BAR_HEIGHT = 60;
const COUNT_STAT = 3;


export class Stat {
  constructor() {
    this._element = [];
    this._config = [];
    this._container = [];
    this._ctx = [];
  }

  set config(events) {
    for (let i = 0; i < COUNT_STAT; i += 1) {
      this._container[i] = document.querySelector(statData[i].selectorParent);
      this._ctx[i] = this._container[i].querySelector(statData[i].selector);
      this._config[i] = {
        _title: statData[i].title,
        _unit: statData[i].unit,
        _arrPoints: this[statData[i].method](events),
      };
      this._ctx[i].height = BAR_HEIGHT * this._config[i]._arrPoints.numPoints;
      this._container[i].style = `height: ${this._ctx[i].height}px`;
    }
  }


  getPointsMoney(arr) {
    const types = [];
    const prices = [];
    arr.forEach((elem) => {
      let item = types.indexOf(Stat.getStrLabel(elem));
      if (item === -1) {
        types.push(Stat.getStrLabel(elem));
        prices.push(TotalCost.getPricePoint(elem));
      } else {
        prices[item] += (TotalCost.getPricePoint(elem));
      }
    });
    const count = types.length;
    return {labels: types, data: prices, numPoints: count};
  }


  getPointsTimeSpend(arr) {
    const labels = [];
    const hours = [];
    arr.forEach((elem, i) => {
      let item = labels.indexOf(Stat.getStrLabel(elem));
      if (item === -1) {
        labels.push(Stat.getStrLabel(elem));
        hours.push(Stat.getDurationHour(arr, i));
      } else {
        hours[item] += Stat.getDurationHour(arr, i);
      }
    });
    const count = labels.length;
    return {labels, data: hours, numPoints: count};
  }


  getPointsTransport(arr) {
    const types = [];
    const numbersOfEqualTrips = [];
    arr.forEach((elem) => {
      let item = types.indexOf(Stat.getStrLabel(elem));
      if ((item === -1) && (Stat.findTripByTripName(elem).transport)) {
        types.push(Stat.getStrLabel(elem));
        numbersOfEqualTrips.push(1);
      } else {
        numbersOfEqualTrips[item] += 1;
      }
    });
    const count = types.length;
    return {labels: types, data: numbersOfEqualTrips, numPoints: count};
  }

  update(events) {
    for (let i = 0; i < COUNT_STAT; i += 1) {
      this._config[i]._arrPoints = this[statData[i].method](events);
      this._element[i].config.data.labels = this._config[i]._arrPoints.labels;
      this._element[i].config.data.datasets[0].data = this._config[i]._arrPoints.data;
      this._element[i].chart.update();
      this._ctx[i].height = BAR_HEIGHT * this._config[i]._arrPoints.numPoints;
      this._container[i].style = `height: ${this._ctx[i].height}px`;
    }
  }

  render() {
    for (let i = 0; i < COUNT_STAT; i += 1) {
      this._element[i] = new Chart(this._ctx[i], this._configChart(i));
    }
    return this._element;
  }

  _configChart(item) {
    return {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._config[item]._arrPoints.labels,
        datasets: [{
          data: this._config[item]._arrPoints.data,
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `${val}${this._config[item]._unit}`
          }
        },
        title: {
          display: true,
          text: this._config[item]._title,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    };
  }


  static getDurationHour(arr, item) {
    const duration = moment.duration(moment(arr[item].newTime.timeEnd).diff(moment(arr[item].newTime.timeStart)));
    return duration.days() * 24 + duration.hours() + (duration.minutes() > 30 ? 1 : 0);
  }

  static findTripByTripName(point) {
    return tripTypes.find((el) => el.name.toLowerCase() === point.type);
  }

  static getStrLabel(point) {
    return `${Stat.findTripByTripName(point).icon} ${point.type.toUpperCase()}`;
  }
}

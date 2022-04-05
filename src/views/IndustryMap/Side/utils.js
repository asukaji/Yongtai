import _ from 'lodash';

const basicOptions = {
  xAxis: {
    type: 'category',
    axisTick: { show: false },
    axisLine: {
      lineStyle: {
        color: '#1979E4'
      }
    },
    axisLabel: {
      color: '#fff',
      fontSize: 8
    },
    splitLine: { show: false },
  },
  label: {
    show: true,
    position: 'top'
  },
  yAxis: {
    type: 'value',
    splitLine: { show: false },
    axisLabel: {
      color: '#FFE9CF',
      fontSize: 8
    },
  },
  grid: {
    top: 0
  }
};

export function formatOption(type, data) {
  const xAxis = _.map(data, 'datetime');
  const series = _.map(data, 'num');

  switch (type) {
    case 'div1':
      return _.merge({}, basicOptions, {
        xAxis: {
          data: xAxis
        },
        grid: {
          top: 50,
          left: 40,
          right: 0
        },
        series: [
          {
            type: 'bar',
            data: series
          }
        ]
      });
    case 'div2':
      return _.merge({}, basicOptions, {
        xAxis: {
          data: xAxis
        },
        grid: {
          top: 50,
          left: 40,
          right: 0
        },
        series: [
          {
            type: 'bar',
            data: series
          }
        ]
      });
    case 'div3':
      return _.merge({}, basicOptions, {
        xAxis: {
          data: xAxis
        },
        grid: {
          top: 50,
          left: 40,
          right: 0
        },
        series: [
          {
            type: 'line',
            data: series
          }
        ]
      });
    case 'div4':
      return _.merge({}, basicOptions, {
        xAxis: {
          data: xAxis
        },
        grid: {
          top: 50,
          left: 40,
          right: 0
        },
        series: [
          {
            type: 'bar',
            data: series
          }
        ]
      });
    case 'div5':
      return _.merge({}, basicOptions, {
        xAxis: {
          data: xAxis
        },
        grid: {
          top: 50,
          left: 40,
          right: 0
        },
        series: [
          {
            type: 'bar',
            data: series
          }
        ]
      });
    case 'div6':
      return _.merge({}, basicOptions, {
        xAxis: {
          data: xAxis
        },
        grid: {
          top: 50,
          left: 40,
          right: 0
        },
        series: [
          {
            type: 'bar',
            data: series
          }
        ]
      });
    default:
      return {};
  }
}
import _ from 'lodash';

const basicOptions = {
  xAxis: {
    type: 'category',
    axisTick: { show: false },
    axisLine: { show: false},
    splitLine: { show: false }
  },
  yAxis: {
    type: 'value',
    splitLine: { show: false },
  },
  grid: {
    top: 60,
    bottom: 40,
    left: 30,
  }
};

const legend = {
  planTotal: '攻坚期任务',
  finishTotal: '累计完成',
  planWeek: '本周任务',
  finishWeek: '本周完成'
};

export function projectOptions({ projectList }) {
  return projectList ? _.merge({}, basicOptions, {
    title: {
      text: '重点项目节点概况',
      textStyle: {
        fontSize: 16
      }
    },
    legend: {
      top: 25,
      itemHeight: 5,
      itemWidth: 5,
      data: ['planTotal', 'finishTotal', 'planWeek', 'finishWeek'],
      formatter: (name) => legend[name]
    },
    label: {
      show: true,
      position: 'top'
    },
    xAxis: {
      data: _.map(projectList, 'name'),
      axisLabel: {
        interval: 0,
        formatter: (name) => `{name|${name}}`,
        overflow: 'break',
        width: 58,
        rich: {
          name: {
            fontSize: 10
          }
        }
      }
    },
    series: [
      {
        name: 'planTotal',
        type: 'bar',
        data: _.map(projectList, 'planTotal')
      },
      {
        name: 'finishTotal',
        type: 'bar',
        data: _.map(projectList, 'finishTotal')
      },
      {
        name: 'planWeek',
        type: 'bar',
        data: _.map(projectList, 'planWeek')
      },
      {
        name: 'finishWeek',
        type: 'bar',
        data: _.map(projectList, 'finishWeek')
      }
    ]
  }) : undefined;
}

export function landOptions({ landList }) {
  return landList ? _.merge({}, basicOptions, {
    title: {
      text: '土地出让节点概况',
      textStyle: {
        fontSize: 16
      }
    },
    legend: {
      top: 25,
      itemHeight: 5,
      itemWidth: 5,
      data: ['planTotal', 'finishTotal', 'planWeek', 'finishWeek'],
      formatter: (name) => legend[name]
    },
    label: {
      show: true,
      position: 'top'
    },
    xAxis: {
      data: _.map(landList, 'name'),
      axisLabel: {
        interval: 0
      },
      nameTextStyle: {
        fontSize: 6
      }
    },
    series: [
      {
        name: 'planTotal',
        type: 'bar',
        data: _.map(landList, 'planTotal')
      },
      {
        name: 'finishTotal',
        type: 'bar',
        data: _.map(landList, 'finishTotal')
      },
      {
        name: 'planWeek',
        type: 'bar',
        data: _.map(landList, 'planWeek')
      },
      {
        name: 'finishWeek',
        type: 'bar',
        data: _.map(landList, 'finishWeek')
      }
    ]
  }) : undefined;
}

export function projectPieOptions({ projectSitua }) {
  return projectSitua ? _.merge({}, basicOptions, {
    title: {
      text: `${projectSitua.ratio}%\n完成率`,
      textStyle: {
        fontSize: 12
      },
      top: 32,
      right: 48
    },
    legend: {
      top: '25%',
      orient: 'vertical',
      itemHeight: 5,
      itemWidth: 5,
      align: 'right',
      left: 20,
      data: ['planTotal', 'finishTotal'],
      formatter: (name) => name === 'planTotal' ? `本周督查节点${projectSitua.planTotal}个`: `已完成${projectSitua.finishTotal}个`
    },

    label: {
      show: true
    },
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    series: [
      {
        type: 'pie',
        label: {
          show: true,
          position: 'inside',
          formatter: ({ data }) => projectSitua[data.name]
        },
        roseType: 'radius',
        radius: ['50%', '80%'],
        center: ['75%', '50%'],
        data: [
          {name: 'planTotal', value: projectSitua.planTotal - projectSitua.finishTotal},
          {name: 'finishTotal', value: +projectSitua.finishTotal},
        ],
      }
    ],
    color: ['#F25E77', '#6BD8B5']
  }) : undefined;
}

export function landPieOptions({ landSitua }) {
  return landSitua ? _.merge({}, basicOptions, {
    title: {
      text: `${landSitua.ratio}%\n完成率`,
      textStyle: {
        fontSize: 12
      },
      top: 32,
      right: 48
    },
    legend: {
      top: '25%',
      orient: 'vertical',
      itemHeight: 5,
      itemWidth: 5,
      align: 'right',
      left: 20,
      data: ['planTotal', 'finishTotal'],
      formatter: (name) => name === 'planTotal' ? `本周督查节点${landSitua.planTotal}个`: `已完成${landSitua.finishTotal}个`
    },
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    series: [
      {
        type: 'pie',
        label: {
          show: true,
          position: 'inside',
          formatter: ({ data }) => landSitua[data.name]
        },
        roseType: 'radius',
        radius: ['50%', '80%'],
        center: ['75%', '50%'],
        data: [
          {name: 'planTotal', value: landSitua.planTotal - landSitua.finishTotal},
          {name: 'finishTotal', value: +landSitua.finishTotal},
        ],
      }
    ],
    color: ['#F25E77', '#6BD8B5']
  }) : undefined;
}

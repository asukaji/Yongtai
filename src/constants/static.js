import _ from 'lodash';

const basicOptions = {
  xAxis: [
    {
      type: 'category',
      axisTick: { show: false },
      data: ['2019', '2020', '2021']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ]
};

export const ecological = {
  indicator: {
    list: [
      { name: '中国天然氧吧', icon: '', text: '于2018年获得' },
      { name: '两山理念', icon: '', text: '守护好青山绿水\n走生态绿色发展之路' },
      { name: '全域旅游示范区', icon: '', text: '国家首批' },
    ],
    text: '绿色是永泰最鲜亮的底色，生态是永泰最大的优势、最大的财富。3年来，永泰始终坚持践行"两山”理念，守护好青山绿水，走生态绿色发展'
  },
  charts: [
    {
      title: '空气优良占比（近五年）',
      option: _.merge({
        legend: {
          show: false
        },
        series: [
          {
            type: 'bar',
            data: [191, 234, 290]
          },
          {
            type: 'bar',
            data: [220, 182, 191]
          },
          {
            type: 'bar',
            data: [320, 332, 301]
          }
        ],
        color: ['#1897FF', '#FF5816', '#1AE1D9']
      }, basicOptions)
    }
  ]
};

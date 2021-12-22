import _ from 'lodash';

import icon1 from '@/assets/Icon/icon-static1.png';
import icon2 from '@/assets/Icon/icon-static2.png';
import icon3 from '@/assets/Icon/icon-static3.png';
import icon4 from '@/assets/Icon/icon-static4.png';
import icon5 from '@/assets/Icon/icon-static5.png';
import icon6 from '@/assets/Icon/icon-static6.png';
import icon7 from '@/assets/Icon/icon-static7.png';
import icon8 from '@/assets/Icon/icon-static8.png';

const basicOptions = {
  xAxis: [
    {
      type: 'category',
      axisTick: { show: false },
      axisLine: { show: false },
      splitLine: { show: false },
      data: ['2016', '2017', '2018', '2019', '2020']
    }
  ],
  label: {
    show: true,
    position: 'top'
  },
  yAxis: [
    {
      type: 'value',
      splitLine: { show: false },
    }
  ],
  grid: {
    top: 0
  }
};

export const ecological = {
  title: '生态文明',
  pre: 'Ecological Civilization',
  indicator: {
    list: [
      { name: '中国天然氧吧', icon: icon1, text: '于2018年获得' },
      { name: '两山理念', icon: icon2, text: '守护好青山绿水\n走生态绿色发展之路' },
      { name: '全域旅游示范区', icon: icon3, text: '国家首批' },
    ],
    text: '绿色是永泰最鲜亮的底色，生态是永泰最大的优势、最大的财富。3年来，永泰始终坚持践行"两山”理念，守护好青山绿水，走生态绿色发展'
  },
  charts: [
    {
      title: '空气优良占比（近五年）',
      option: _.defaults({
        legend: {
          show: false
        },
        grid: {
          top: 20,
          bottom: 20,
          left: 30
        },
        series: [
          {
            type: 'bar',
            data: [2.66, 2.26, 2.23, 2.48, 2.41]
          }
        ],
        color: ['#1897FF', '#FF5816', '#1AE1D9']
      }, basicOptions, {})
    },
    {
      title: '水质优良占比（近五年）',
      pre: '单位：%',
      option: _.defaults({
        legend: {
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
            },
            data: [71.4, 28.6],
            radius: '20%',
            labelLine: {
              show: false
            },
          },
          {
            type: 'pie',
            label: {
              show: true,
              position: 'inside',
            },
            data: [71.4, 28.6],
            radius: ['25%', '35%'],
            labelLine: {
              show: false
            },
          },
          {
            type: 'pie',
            label: {
              show: true,
              position: 'inside',
            },
            data: [85.7, 14.3],
            radius: ['40%', '50%'],
            labelLine: {
              show: false
            },
          },
          {
            type: 'pie',
            label: {
              show: true,
              position: 'inside',
            },
            data: [71.4, 28.6],
            radius: ['55%', '65%'],
            labelLine: {
              show: false
            },
          },
          {
            type: 'pie',
            label: {
              show: true,
              position: 'inside',
            },
            data: [57.1, 42.9],
            radius: ['70%', '80%'],
            labelLine: {
              show: false
            },
          }
        ],
        color: ['#FF6C60', '#FFCB3F', '#1AE1D9']
      }, basicOptions, {})
    },
    {
      title: '森林覆盖率',
      pre: '单位：%',
      option: _.defaults({
        legend: {
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
            type: 'gauge',
            startAngle: 90,
            endAngle: -270,
            max: 100,
            pointer: {
              show: false
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              clip: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              formatter: ' '
            },
            title: {
              show: false
            },
            data: [74.66, 75.48, 75.98, 76.96, 76.96]
          }
        ],
        color: ['#FF425B', '#8AC43F', '#2BC2D1']
      }, basicOptions, {})
    },
    {
      title: '商品林赎买详情',
      pre: `单位：万元\n单位：亩`,
      option: _.defaults({
        legend: {
          show: false
        },
        grid: {
          top: 10,
          bottom: 20,
          left: 30,
        },
        yAxis: [
          {
            type: 'value',
            show: false,
          },
          {
            type: 'value',
            show: false,
          }
        ],
        series: [
          {
            type: 'line',
            data: [552, 2814, 1471, 1292, 2463],
            areaStyle: {
              opacity: 0.1
            },
          },
          {
            type: 'line',
            data: [3774, 16501, 6351, 6084, 10480],
            areaStyle: {
              opacity: 0.1
            },
            yAxisIndex: 1,
          }
        ],
        color: ['#FF5816', '#8AC43F']
      }, basicOptions, {})
    }
  ]
};

export const industrial = {
  title: '产业基础',
  pre: 'Industrial Foundation',
  indicator: {
    list: [
      { name: '“一核”', icon: icon8, text: '把中心城区打造成为\n现代化旅游城市' },
      { name: ' “四带”', icon: icon4, text: '以葛岭为中心\n延伸至塘前、丹云' },
      { name: '滨水田园休闲带', icon: icon3, text: '以水上运动\n产业为重点建设' },
    ],
    text: '“一核” 把中心城区打造成为基础设施完备，旅游功能齐全的现代化旅游城市。 “四带” 以葛岭为中心，延伸至塘前、丹云的“县域经济次中心带”。'
  },
  charts: [
    {
      title: '景区接待人数',
      pre: '单位：万人次',
      option: _.defaults({
        legend: {
          show: false
        },
        grid: {
          top: 10,
          bottom: 20,
          left: 30
        },
        series: [
          {
            type: 'bar',
            data: [651.4, 806, 1047.3, 1275.2, 1030.3]
          },
          {
            type: 'bar',
            data: [52.1, 69.51, 97, 457, 436.53]
          },
          {
            type: 'bar',
            data: [22.1, 29.1, 43.9, 57.3, 57.6]
          }
        ],
        color: ['#1897FF', '#FF5816', '#1AE1D9']
      }, basicOptions, {})
    },
    // {
    //   title: '年龄占比',
    //   option: _.defaults({
    //     legend: {
    //       show: true
    //     },
    //     xAxis: {
    //       show: false
    //     },
    //     yAxis: {
    //       show: false
    //     },
    //     series: [
    //       {
    //         type: 'pie',
    //         label: {
    //           show: true,
    //           position: 'inside',
    //         },
    //         data: [191, 234, 290],
    //         radius: ['60%', '80%']
    //       }
    //     ],
    //     color: ['#FF6C60', '#FFCB3F', '#1AE1D9']
    //   }, basicOptions, {})
    // },
    {
      title: '近三年游客',
      option: _.defaults({
        legend: {
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
            type: 'gauge',
            startAngle: 90,
            endAngle: -270,
            max: 2000,
            pointer: {
              show: false
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              clip: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              formatter: ' '
            },
            title: {
              show: false
            },
            data: [1047.3, 1275.2, 1030.3]
          }
        ],
        color: ['#FF425B', '#8AC43F', '#2BC2D1']
      }, basicOptions, {})
    },
    // {
    //   title: '空气质量情况',
    //   option: _.defaults({
    //     legend: {
    //       show: false
    //     },
    //     grid: {
    //       top: 10,
    //       bottom: 20,
    //       left: 30,
    //     },
    //     series: [
    //       {
    //         type: 'line',
    //         data: [191, 234, 290],
    //         areaStyle: {
    //           opacity: 0.2
    //         },
    //       }
    //     ],
    //     color: ['#FF5816']
    //   }, basicOptions, {})
    // }
  ]
};

export const urban = {
  title: '城市建设',
  pre: 'Urban Construction',
  indicator: {
    list: [
      { name: '省级文明县城', icon: icon4, text: '把中心城区打造成为\n现代化旅游城市' },
      { name: '美丽乡村', icon: icon5, text: '以葛岭为中心\n延伸至塘前、丹云' },
      { name: '乡村旅游示范县', icon: icon6, text: '以水上运动\n产业为重点建设' },
    ],
    text: '成功创建第五届、第六届省级文明县城，入围全国文明城市提名城市具城建成区面积从7.9平方公里扩大到9.9平方公里，永阳古城完成改造，美食街开街运营，小汤山生态公园、花海公园建成开放，人均公园绿地面积位居全市第一。成立国内首家县级乡村振兴研究院、全省首家扶贫农产品统购统销运营中心、全市首家农村产权流转服务中心，美丽乡村建设成效连续三年位居全市第一，农村人居环境整治成效作为全省唯一获国务院通报嘉奖，获评国家农业绿色发展先行区、全国休闲农业和乡村旅游示范县。'
  },
  charts: [
    {
      title: '市政道路公里数',
      pre: '单位：公里',
      option: _.defaults({
        legend: {
          show: false
        },
        grid: {
          top: 20,
          bottom: 20,
          left: 30
        },
        series: [
          {
            type: 'bar',
            data: [64.41, 72.282, 85.183, 96.041, 106.928]
          }
        ],
        color: ['#1897FF', '#FF5816', '#1AE1D9']
      }, basicOptions, {})
    },
    {
      title: '公园绿化详情',
      pre: '单位：平方米',
      option: _.defaults({
        legend: {
          show: false
        },
        grid: {
          top: 10,
          bottom: 20,
          left: 30,
        },
        yAxis: [
          {
            type: 'value',
            show: false,
          },
          {
            type: 'value',
            show: false,
          }
        ],
        series: [
          {
            type: 'line',
            data: [12, 16, 17, 18, 19],
            areaStyle: {
              opacity: 0.1
            },
          },
          {
            type: 'line',
            data: [155.81, 163.81, 175.81, 180.31, 185.61],
            areaStyle: {
              opacity: 0.1
            },
            yAxisIndex: 1,
          }
        ],
        color: ['#FF5816', '#8AC43F']
      }, basicOptions, {})
    }
  ]
};

export const livelihood = {
  title: '民生事业',
  pre: 'Livelihood Cause',
  indicator: {
    list: [
      { name: '“三无”', icon: icon7, text: '荣获全国信访“三无”县\n全国法治县创建工作先进县' },
      { name: '医疗建设', icon: icon8, text: '完成中医院、妇幼保健院迁建\n192个村卫生所标准化建设' },
      { name: '零的突破', icon: icon3, text: '福州工商学院建成开学\n结束永泰没有本科高校的历史' },
    ],
    text: '城乡低保标准从每年每人3000元提高至9120元。荣获全国信访“三无”县、全国法治县创建工作先进县、省级平安县、全市扫黑除恶先'
  },
  charts: [
    // {
    //   title: '近三年本科率',
    //   option: _.defaults({
    //     legend: {
    //       show: false
    //     },
    //     grid: {
    //       top: 10,
    //       bottom: 20,
    //       left: 30
    //     },
    //     series: [
    //       {
    //         type: 'bar',
    //         data: [191, 234, 290]
    //       },
    //       {
    //         type: 'bar',
    //         data: [220, 182, 191]
    //       },
    //       {
    //         type: 'bar',
    //         data: [320, 332, 301]
    //       }
    //     ],
    //     color: ['#1897FF', '#FF5816', '#1AE1D9']
    //   }, basicOptions, {})
    // },
    {
      title: '教育建设',
      type: 'card',
      cards: [
        { name: '新增学位', value: '7475个' },
        { name: '扩建学校', value: '27所' },
        { name: '扩建学校', value: '113913平方米' },
        { name: '普惠性学额', value: '98%' }
      ]
    },
    {
      title: '就诊率',
      type: 'card',
      cards: [
        { name: '标准化建设', value: '192个村级卫生所' },
        { name: '县域就诊率', value: '28.6%~50.9%' }
      ]
    },
    // {
    //   title: '城乡低保标准',
    //   option: _.defaults({
    //     legend: {
    //       show: true
    //     },
    //     xAxis: {
    //       show: false
    //     },
    //     yAxis: {
    //       show: false
    //     },
    //     series: [
    //       {
    //         type: 'gauge',
    //         startAngle: 90,
    //         endAngle: -270,
    //         max: 500,
    //         pointer: {
    //           show: false
    //         },
    //         progress: {
    //           show: true,
    //           overlap: false,
    //           roundCap: true,
    //           clip: false
    //         },
    //         axisTick: {
    //           show: false
    //         },
    //         axisLabel: {
    //           show: false
    //         },
    //         detail: {
    //           formatter: ' '
    //         },
    //         data: [191, 234, 290]
    //       }
    //     ],
    //     color: ['#FF425B', '#8AC43F', '#2BC2D1']
    //   }, basicOptions, {})
    // },
    // {
    //   title: '近三年县域就诊率',
    //   option: _.defaults({
    //     legend: {
    //       show: false
    //     },
    //     grid: {
    //       top: 10,
    //       bottom: 20,
    //       left: 30,
    //     },
    //     series: [
    //       {
    //         type: 'line',
    //         data: [191, 234, 290],
    //         areaStyle: {
    //           opacity: 0.2
    //         },
    //       }
    //     ],
    //     color: ['#FF5816']
    //   }, basicOptions, {})
    // }
  ]
};

export const tourLineOptions = _.defaults({
  legend: {
    show: true,
    data: ['去年月份同比', '当前月份情况']
  },
  grid: {
    top: 20,
    bottom: 20,
    left: 0,
    right: 0,
  },
  yAxis: {
    show: false
  },
  xAxis:
  {
    type: 'category',
    axisTick: { show: false },
    axisLine: { show: false },
    splitLine: { show: false },
    data: _.map(Array.from({ length: 30 }), (item, index) => index + 1)
  }
  ,
  series: [
    {
      name: '去年月份同比',
      type: 'line',
      data: _.map(Array.from({ length: 30 }), _.random.bind(null, 50, 200)),
      areaStyle: {
        opacity: 0.2
      },
      smooth: true
    },
    {
      name: '当前月份情况',
      type: 'line',
      data: _.map(Array.from({ length: 30 }), _.random.bind(null, 50, 200)),
      areaStyle: {
        opacity: 0.2
      },
      smooth: true
    }
  ],
  color: ['#28D2B0', '#0078FF']
}, basicOptions, {});

export const tourSexPieOptions = _.defaults({
  legend: {
    orient: 'vertical',
    right: 20,
    data: ['男', '女'],
    icon: 'circle',
    width: 400,
    formatter: (name) => {
      return name === '男' ? `${name}  640人\n占比  64%` : `${name}  460人\n占比  36%`;
    },
    textStyle: {
      lineHeight: 14
    },
    rich: {
      sub: { fontSize: 10 }
    }
  },
  xAxis: {
    show: false
  },
  yAxis: {
    show: false
  },
  grid: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  series: [
    {
      name: '男',
      type: 'pie',
      data: [640, 460],
      radius: '55%',
      center: ['20%', '50%'],
      labelLine: {
        show: false
      },
    },
    {
      name: '女',
      type: 'pie',
      data: [640, 460],
      radius: ['70%', '80%'],
      center: ['20%', '50%'],
      labelLine: {
        show: false
      },
    }
  ],
  color: ['#00AFFF', '#00FFED', '#1AE1D9']
}, basicOptions, {});

export const tourAgePieOptions = _.defaults({
  legend: {
    orient: 'vertical',
    right: 20,
    data: ['18-30岁', '31-48岁', '49-60岁'],
    width: 400,
    formatter: (name) => {
      return name === '18-30岁' ? `${name}\n600人 (60%)` : name === '31-48岁' ? `${name}\n300人 (30%)` : `${name}\n100人 (10%)`;
    },
    textStyle: {
      lineHeight: 14
    },
    rich: {
      sub: { fontSize: 10 }
    }
  },
  grid: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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
      },
      data: [
        { value: 600, name: '18-30岁' },
        { value: 300, name: '31-48岁' },
        { value: 100, name: '49-60岁' }
      ],
      radius: '70%',
      center: ['20%', '50%'],
      labelLine: {
        show: false
      },
    },
    {
      type: 'pie',
      label: {
        show: true,
        position: 'inside',
      },
      data: [600, 300, 100],
      radius: ['75%', '80%'],
      center: ['20%', '50%'],
      labelLine: {
        show: false
      },
    }
  ],
  color: ['#00AFFF', '#00FFED', '#7200FF']
}, basicOptions, {});

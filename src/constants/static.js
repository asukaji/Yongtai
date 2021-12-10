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
      axisLine: { show: false},
      splitLine: { show: false },
      data: ['2019', '2020', '2021']
    }
  ],
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
          top: 10,
          bottom: 20,
          left: 30
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
      }, basicOptions, {})
    },
    {
      title: '水质优良占比（近五年）',
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
            data: [191, 234, 290],
            radius: ['60%', '80%']
          }
        ],
        color: ['#FF6C60', '#FFCB3F', '#1AE1D9']
      }, basicOptions, {})
    },
    {
      title: '森林覆盖率',
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
            max: 500,
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
            data: [191, 234, 290]
          }
        ],
        color: ['#FF425B', '#8AC43F', '#2BC2D1']
      }, basicOptions, {})
    },
    {
      title: '森林覆空气质量情况盖率',
      option: _.defaults({
        legend: {
          show: false
        },
        grid: {
          top: 10,
          bottom: 20,
          left: 30,
        },
        series: [
          {
            type: 'line',
            data: [191, 234, 290],
            areaStyle: {
              opacity: 0.2
            },
          }
        ],
        color: ['#FF5816']
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
      }, basicOptions, {})
    },
    {
      title: '年龄占比',
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
            data: [191, 234, 290],
            radius: ['60%', '80%']
          }
        ],
        color: ['#FF6C60', '#FFCB3F', '#1AE1D9']
      }, basicOptions, {})
    },
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
            max: 500,
            pointer: {
              show: false
            },
            progress: {
              show: false,
              overlap: false,
              roundCap: false,
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
            data: [191, 234, 290]
          }
        ],
        color: ['#FF425B', '#8AC43F', '#2BC2D1']
      }, basicOptions, {})
    },
    {
      title: '空气质量情况',
      option: _.defaults({
        legend: {
          show: false
        },
        grid: {
          top: 10,
          bottom: 20,
          left: 30,
        },
        series: [
          {
            type: 'line',
            data: [191, 234, 290],
            areaStyle: {
              opacity: 0.2
            },
          }
        ],
        color: ['#FF5816']
      }, basicOptions, {})
    }
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
  }
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
    {
      title: '近三年本科率',
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
      }, basicOptions, {})
    },
    {
      title: '教育建设',
      type: 'card',
      cards: [
        { name: '新增学位', value: '7475个'},
        { name: '扩建学校', value: '27所'},
        { name: '扩建学校', value: '11.4万m2'},
        { name: '普惠性学额', value: '98%'}
      ]
    },
    {
      title: '城乡低保标准',
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
            max: 500,
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
            data: [191, 234, 290]
          }
        ],
        color: ['#FF425B', '#8AC43F', '#2BC2D1']
      }, basicOptions, {})
    },
    {
      title: '近三年县域就诊率',
      option: _.defaults({
        legend: {
          show: false
        },
        grid: {
          top: 10,
          bottom: 20,
          left: 30,
        },
        series: [
          {
            type: 'line',
            data: [191, 234, 290],
            areaStyle: {
              opacity: 0.2
            },
          }
        ],
        color: ['#FF5816']
      }, basicOptions, {})
    }
  ]
};

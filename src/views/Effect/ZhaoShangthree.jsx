import styles from './Zhaoshang.module.less';
import Chart from './Chart';


export default {
  data() {
    return {
      props: {
        list: {
          type: Array,
          required: true
        }
      },

      option: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        title: [
          {
            text: '92',
            x: '50',
            top: '43%',
            textStyle: {
              fontWeight: 'normal',
              color: '#0580f2',
              fontFamily: 'DINAlternate-Bold, DINAlternate',
              fontSize: '30'
            }
          },
          {
            text: '任务项目',
            left: '42',
            top: '30%',
            textStyle: {
              color: '#FFFFFF',
              fontSize: 12,
              fontWeight: '400'
            }
          }
        ],
        color: ['rgba(176, 212, 251, 1)'],
        legend: {
          icon: 'none',
          left: '60%',
          top: '30%',
          show: true,
          itemGap: 12,
          itemWidth: 6,
          itemHeight: 6,
          data: ['完成项目 46', '占比 50%'],
          textStyle: {
            fontSize: 12
          },
        },

        series: [
          {
            name: 'Line 1',
            type: 'pie',
            center: ['35%', '50%'], //距离左跟上的位置
            clockWise: true,
            radius: ['80%', '55%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: 80,
                name: '完成项目 46',
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: '#00cefc' // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: '#367bec' // 100% 处的颜色
                        }
                      ]
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              },
              {
                name: '占比 50%',
                value: 20
              }
            ]
          }
        ]
      }
    };
  },

  render() {
    return (
      <div class={styles.background}>
        <div class={styles.title}>
          本年度项目总体完成情况
        </div>
        <div>
          <Chart option={this.option} />
        </div>
      </div>
    );
  }
};

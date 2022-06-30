import Card from './Card';
import CardTwo from './CardTwo';
import CardThree from './CardThree';
import Bar from './Bar';
import Bars from './Bars';
import Pie from './Pie';
import Line from './Line';
import BarTree from './BarTree';
import Gauge from './Gauge';
import Table from './Table';
import Center from './Center';
import { Button } from 'element-ui';
import styles from './index.module.less';

import { fetchProperty, fetchPropertyList } from '@/api';
import _ from 'lodash';
import BarTreeHZ from './BarTreeHZ';

export default {
  name: 'Property',

  methods: {
    renderTitle(
      title1,
      title2,
      titleValue1,
      titleValue2,
      direction = 'row',
      split = false,
      useP = false
    ) {
      return (
        <div
          class={styles.titles}
          style={{ flexDirection: direction, lineHeight: useP && '14px' }}
        >
          <div>
            <pre style={{ fontSize: useP && 12 }}>
              {split ? `${title1.slice(0, 4)}\n${title1.slice(4)}` : title1}
            </pre>
            {useP ? <p>{titleValue1}</p> : <h2>{titleValue1}</h2>}
          </div>
          <div>
            <pre style={{ fontSize: useP && 12 }}>
              {split ? `${title2.slice(0, 4)}\n${title2.slice(4)}` : title2}
            </pre>
            {useP ? <p>{titleValue2}</p> : <h2>{titleValue2}</h2>}
          </div>
        </div>
      );
    },

    renderBar(props) {
      if (!props) {
        return null;
      }

      const { title1, title2, titleValue1, titleValue2, list } = props;

      return (
        <div>
          {/* {this.renderTitle(title1, title2, titleValue1, titleValue2)} */}
          <Bar value={list} />
        </div>
      );
    },

    renderBars(props) {
      if (!props) {
        return null;
      }

      const { title1, title2, titleValue1, titleValue2, list } = props;

      return (
        <div>
          {/* {this.renderTitle(title1, title2, titleValue1, titleValue2)} */}
          <Bars value={list} />
        </div>
      );
    },

    renderPie(props) {
      if (!props) {
        return null;
      }

      const { title1, title2, titleValue1, titleValue2, ...value } =
        props.guoyou;

      return (
        <div style={{ display: 'flex' }}>
          {this.renderTitle(
            title1,
            title2,
            titleValue1,
            titleValue2,
            'column',
            true
          )}
          <Pie value={value} />
        </div>
      );
    },

    renderLine(props) {
      if (!props) {
        return null;
      }

      const { title1, title2, titleValue1, titleValue2, list } = props;

      return (
        <div>
          {this.renderTitle(title1, title2, titleValue1, titleValue2)}
          <Line value={list} />
        </div>
      );
    },

    renderBarTree(props) {
      if (!props) {
        return null;
      }

      const {
        title1,
        title2,
        titleValue1,
        titleValue2,
        title3,
        title4,
        titleValue3,
        titleValue4,
        list
      } = props;

      return (
        <div>
          <div class={styles.titles}>
            <p style={{ fontSize: '12px !important', marginLeft: 12 }}>
              公开流转资金拨付情况表
            </p>
          </div>
          {this.renderTitle(
            title1,
            title2,
            titleValue1,
            titleValue2,
            'row',
            false,
            true
          )}
          {this.renderTitle(
            title3,
            title4,
            titleValue3,
            titleValue4,
            'row',
            false,
            true
          )}
          <BarTree value={list} />
        </div>
      );
    },

    renderBarTreeHz(props) {
      if (!props) {
        return null;
      }

      const { title1, titleValue1, list } = props.guoyou;

      return (
        <div>
          {this.renderTitle(title1, titleValue1, false, true)}
          <BarTreeHZ value={list} />
        </div>
      );
    },

    renderGauge(props) {
      if (!props) {
        return null;
      }

      const { title1, title2, titleValue1, titleValue2, list } = props.jiti;

      const acreage = _.map(list, ({ acreage, acreageUnit }) => ({
        name: `${acreage}${acreageUnit}`,
        value: acreage
      }));
      const finalPrice = _.map(list, ({ finalPrice, unit }) => ({
        name: `${finalPrice}${unit}`,
        value: finalPrice
      }));

      return (
        <div>
          {this.renderTitle(title1, title2, titleValue1, titleValue2)}
          <div style={{ display: 'flex' }}>
            <Gauge value={finalPrice} />
            <Gauge value={acreage} max={700} />
          </div>
        </div>
      );
    },

    renderTable(props) {
      if (!props) {
        return null;
      }
      const value = _.map(
        props,
        ({ projectName, startDate, endDate, acreage, price }) => ({
          acreage: `${acreage}亩`,
          range: `${startDate}-${endDate}`,
          projectName,
          price
        })
      );

      return <Table value={value} />;
    },

    renderDate() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var time = year + '-' + month + '-' + day;
      return time;
    }
  },

  render() {
    return (
      <div class={styles.container}>
        <div class={styles.header}>
          <h1>永泰县产权流转服务中心</h1>
          <Button
            icon="el-icon-arrow-left"
            style={{
              color: '#fff',
              position: 'absolute',
              left: '12px',
              backgroundColor: 'transparent',
              borderWidth: '0 !important'
            }}
            onClick={() => this.$router.replace('/')}
          >
            返回
          </Button>
          <div
            style={{
              color: '#fff',
              fontWeight: 'bold',
              position: 'absolute',
              right: '30px',
              backgroundColor: 'transparent',
              borderWidth: '0 !important'
            }}
          >
            {this.renderDate()}
          </div>
        </div>
        <div class={styles.content}>
          <div>
            <CardTwo
              fetchData={fetchProperty.bind(null, 'guoyouTudi')}
              link="guoyouTudi"
              scopedSlots={{
                default: this.renderBars
              }}
            >
              <p slot="header">交易同期动态对比(1-4月份)</p>
            </CardTwo>

            <Card
              fetchData={fetchProperty.bind(null, 'guozi')}
              link="guozi"
              scopedSlots={{
                default: this.renderBar
              }}
            >
              <p slot="header">国有资产</p>
            </Card>

            <Card
              fetchData={fetchProperty.bind(null, 'nongdi')}
              link="nongdi"
              scopedSlots={{
                default: this.renderBar
              }}
            >
              <p slot="header">农业资源</p>
            </Card>
          </div>

          <div>
            <Center />
            <CardThree
              fetchData={fetchPropertyList}
              scopedSlots={{
                default: this.renderTable
              }}
            >
              <div slot="header">
                {/* 永泰县农村产权流转服务中心目前公告清单20220215 */}
                资源流转信息
                <span
                  onClick={() => {
                    window.location.href = 'https://www.ytcqlz.com';
                  }}
                >
                  &nbsp;&nbsp;更多&nbsp;&gt;&gt;&gt;
                </span>
              </div>
            </CardThree>
          </div>

          <div>
            <Card
              fetchData={fetchProperty.bind(null, 'linquan')}
              link="linquan"
              scopedSlots={{
                default: this.renderBar
              }}
            >
              <p slot="header">林业资源</p>
            </Card>

            <Card
              fetchData={fetchProperty.bind(null, 'jitiZichan')}
              link="jitiZichan"
              scopedSlots={{
                default: this.renderBar
              }}
            >
              <p slot="header">村集体资产</p>
            </Card>

            <Card
              fetchData={fetchProperty.bind(null, 'lvyou')}
              link="lvyou"
              scopedSlots={{
                default: this.renderBar
              }}
            >
              <p slot="header">旅游资源</p>
            </Card>
          </div>
        </div>
      </div>
    );
  }
};

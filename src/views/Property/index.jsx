import Card from './Card';
import Bar from './Bar';
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
          {this.renderTitle(title1, title2, titleValue1, titleValue2)}
          <Bar value={list} />
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
    }
  },

  render() {
    return (
      <div class={styles.container}>
        <div class={styles.header}>
          <h1>永泰县农村产权交易中心</h1>
          <Button
            icon="el-icon-arrow-left"
            style={{
              color: '#fff',
              position: 'absolute',
              left: '12px',
              bottom: '-8px',
              backgroundColor: 'transparent',
              borderWidth: '0 !important'
            }}
            onClick={() => this.$router.replace('/')}
          >
            返回
          </Button>
        </div>
        <div class={styles.content}>
          <div>
            <Card
              fetchData={fetchProperty.bind(null, 'jitiZichan')}
              link="jitiZichan"
              scopedSlots={{
                default: this.renderGauge
              }}
            >
              <p slot="header">集体资产流转</p>
            </Card>
            <Card
              fetchData={fetchProperty.bind(null, 'linquan')}
              link="linquan"
              scopedSlots={{
                default: this.renderBarTree
              }}
            >
              <p slot="header">商品林林权</p>
            </Card>
            <Card
              fetchData={fetchProperty.bind(null, 'nongdi')}
              link="nongdi"
              scopedSlots={{
                default: this.renderBar
              }}
            >
              <p slot="header">农地流转项目</p>
            </Card>
          </div>
          <div>
            <Center />
            <Card
              fetchData={fetchPropertyList}
              scopedSlots={{
                default: this.renderTable
              }}
            >
              <div slot="header">
                永泰县农村产权流转服务中心目前公告清单20220215
              </div>
            </Card>
          </div>
          <div>
            <Card
              fetchData={fetchProperty.bind(null, 'guoyouTudi')}
              link="guoyouTudi"
              scopedSlots={{
                default: this.renderPie
              }}
            >
              <p slot="header">国有建设用地使用权项目</p>
            </Card>
            <Card
              fetchData={fetchProperty.bind(null, 'guozi')}
              link="guozi"
              scopedSlots={{
                default: this.renderLine
              }}
            >
              <p slot="header">国资项目</p>
            </Card>
            <Card
              fetchData={fetchProperty.bind(null, 'lvyou')}
              link="lvyou"
              scopedSlots={{
                default: this.renderBar
              }}
            >
              <p slot="header">旅游资源项目</p>
            </Card>
          </div>
        </div>
      </div>
    );
  }
};

import { Drawer, Button } from 'element-ui';
import VChart from 'vue-echarts';
import styles from './ChartsDrawer.module.less';

import VueTypes from 'vue-types';

import iconMoney from '@/assets/Icon/icon-money.png';
import iconTicket from '@/assets/Icon/icon-ticket.png';
import {
  tourLineOptions,
  tourSexPieOptions,
  tourAgePieOptions
} from '@/constants';

export default {
  name: 'ChartsDrawer',

  props: {
    styles: VueTypes.object.def(),
    visible: VueTypes.bool.def(false)
  },

  data() {
    return {
      state: {
        visible: this.$props.visible
      }
    };
  },

  methods: {
    close() {
      this.state.visible = false;
    }
  },

  render() {
    return (
      <div>
        <Button
          type="text"
          class={styles.button}
          onClick={() => (this.state.visible = !this.state.visible)}
        >
          {this.state.visible ? '收起' : '展开'}
        </Button>

        <Drawer
          title="charts"
          appendToBody
          visible={this.state.visible}
          withHeader={false}
          class={[styles.drawer, this.$props.styles ? styles.small : undefined]}
          // modal={false}
          beforeClose={this.close}
        >
          {this.$slots.default ?? (
            <div>
              <div class={styles.panel}>
                <div class={styles.panelItem}>
                  <h4>总游客流量</h4>
                  <pre>
                    6,731,410<span>人次</span>
                  </pre>
                </div>
                <div class={styles.panelItem}>
                  <h4>总游客流量同比</h4>
                  <pre>
                    2.74%<span style={{ color: '#28D2B0' }}>⇩</span>
                  </pre>
                </div>
              </div>
              <div>
                <h4>
                  本月人流趋势
                  <pre
                    style={{
                      float: 'right',
                      margin: '0 540px 0 0',
                      color: '#aaa',
                      lineHeight: 2
                    }}
                  >
                    单位：人次
                  </pre>
                </h4>

                <VChart option={tourLineOptions} style={{ height: '200px' }} />
              </div>
              <div class={styles.panel}>
                <div class={styles.panelItem}>
                  <h4>性别占比</h4>
                  <VChart
                    option={tourSexPieOptions}
                    style={{ height: '110px' }}
                  />
                </div>
                <div class={styles.panelItem}>
                  <h4>年龄占比</h4>
                  <VChart
                    option={tourAgePieOptions}
                    style={{ height: '110px' }}
                  />
                </div>
              </div>
              <div>
                <h4>经济数据统计</h4>
                <div class={styles.panel}>
                  <div class={styles.panelItems}>
                    <div>
                      <img src={iconMoney} />
                      <pre>{'年度票\n务总收入'}</pre>
                    </div>
                    <div class={styles.statistic}>
                      <p>30.29</p>
                      <p>亿元</p>
                    </div>
                  </div>
                  <div class={styles.panelItems}>
                    <div>
                      <img src={iconTicket} />
                      <pre>{'人均消\n费'}</pre>
                    </div>
                    <div class={styles.statistic}>
                      <p>450</p>
                      <p>元</p>
                    </div>
                  </div>
                  <div class={styles.panelItems}>
                    <div>
                      <img src={iconTicket} />
                      <pre>{'年度票\n务'}</pre>
                    </div>
                    <div class={styles.statistic}>
                      <p>373907</p>
                      <p>万元</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Drawer>
      </div>
    );
  }
};

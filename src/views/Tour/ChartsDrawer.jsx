import { Drawer, Button } from 'element-ui';
import { Fragment } from 'vue-fragment';
import styles from './ChartsDrawer.module.less';

import iconMoney from '@/assets/Icon/icon-money.png';
import iconTicket from '@/assets/Icon/icon-ticket.png';

export default {
  name: 'ChartsDrawer',

  data() {
    return {
      state: {
        visible: false
      }
    };
  },

  render() {
    return (
      <Fragment>
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
          withHeader={false}
          class={styles.drawer}
          // onBeforeClose={console.log}
          {...{
            props: {
              'visible.sync': this.state.visible,
              onClose: () => console.log(2)
            }
          }}
        >
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
            <h4>本月人流趋势</h4>
          </div>
          <div class={styles.panel}>
            <div class={styles.panelItem}>
              <h4>性别占比</h4>
            </div>
            <div class={styles.panelItem}>
              <h4>年龄占比</h4>
            </div>
          </div>
          <div>
            <h4>经济数据统计</h4>
            <div class={styles.panel}>
              <div class={styles.panelItem}>
                <div>
                  <img src={iconMoney} />
                  <pre>{'年度票\n务总收入'}</pre>
                </div>
                <div class={styles.statistic}>
                  <p>56.6463</p>
                  <p>万元</p>
                </div>
              </div>
              <div class={styles.panelItem}>
                <div>
                  <img src={iconTicket} />
                  <pre>{'人均消\n费'}</pre>
                </div>
                <div class={styles.statistic}>
                  <p>56.6463</p>
                  <p>万元</p>
                </div>
              </div>
              <div class={styles.panelItem}>
                <div>
                  <img src={iconTicket} />
                  <pre>{'年度票\n务'}</pre>
                </div>
                <div class={styles.statistic}>
                  <p>56.6463</p>
                  <p>万元</p>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      </Fragment>
    );
  }
};

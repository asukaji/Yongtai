import Bar from '@/views/Business/Charts/Bar';
import styles from './Profile.module.less';

import { fetchIndustryRankingById, fetchIndustryInstrumentById } from '@/api';
import _ from 'lodash';

export default {
  name: 'EconomyDetail',

  data() {
    return {
      state: {
        ranking: undefined,
        instrument: undefined
      }
    };
  },

  computed: {
    id() {
      return this.$route.params?.id;
    }
  },

  mounted() {
    Promise.all([fetchIndustryRankingById(this.id), fetchIndustryInstrumentById(this.id)])
      .then(([ranking, instrument]) => {
        _.assign(this.state, { ranking, instrument });
      });
  },

  render() {
    const { ranking, instrument} = this.state;

    return <div class={styles.detail}>
      <div>
        <Bar
          title='当季同比增长'
          category={['']}
          data={[
            {
              name: '同比增长',
              unit: '项',
              type: 'bar',
              barWidth: '25%',
              label: {
                show: true,
                position: 'top'
              },
              data: [instrument?.ratio]
            },
            {
              name: '同比增长率',
              unit: '%',
              type: 'bar',
              yAxisIndex: 1,
              barWidth: '25%',
              label: {
                show: true,
                position: 'top'
              },
              data: [instrument?.cityIncrease]
            }
          ]}
          innerTitle
          inverse
        />
      </div>
      
      <div style={{ padding: '0 40px', marginTop: '-80px'}}>
        <Bar
          title='全市各区县排名情况'
          category={ranking?.category}
          data={[
            {
              name: '完成值',
              unit: '亿元',
              type: 'bar',
              barWidth: 10,
              label: {
                show: true,
                position: 'top'
              },
              data: ranking?.barData
            },
            {
              name: '增长率',
              unit: '%',
              type: 'line',
              yAxisIndex: 1,
              label: {
                show: true,
                position: 'top'
              },
              data: ranking?.lineData
            }
          ]}
          innerTitle
        />
      </div>
    </div>;
  }
};

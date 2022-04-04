import styles from './SideBar.module.less';
import { fetchIndustry, fetchAppraisal } from '@/api';
import { BUSINESS, ECONOMY } from '@/constants';


import square from '../../assets/Effect/square.png';
import line from '../../assets/Effect/line.png';

import Boxes from './Boxes';
import SmallBoxes from './SmallBoxes';
import Zhaoshang from './ZhaoShang';
import Zhaoshangtwo from './ZhaoShangtwo';
import Zhaoshangthree from './ZhaoShangthree';
import Zhaoshangfour from './ZhaoShangfour';


export default {
  data() {
    return {
      state: {
        data: undefined,
        group1: 'town',
        group2: 'pro',
        group3: 'dept',
        per1: {
          ratio: ''
        },
        per2: {
          ratio: ''
        },
        per3: {
          ratio: ''
        },
        box1: {
          name: [],
          //增长率
          rate: [],
          //累计
          cumulative: []
        },
        box2: {
          name: [],
          //增长率
          rate: [],
          //累计
          cumulative: []
        },
        smallbox1: {
          name: [],
          //增长率
          rate: [],
          //累计
          cumulative: []
        },
        smallbox2: {
          name: [],
          //增长率
          rate: [],
          //累计
          cumulative: []
        },
        smallbox3: {
          name: [],
          //增长率
          rate: [],
          //累计
          cumulative: []
        },
        smallbox4: {
          name: [],
          //增长率
          rate: [],
          //累计
          cumulative: []
        }
      }
    };
  },

  computed: {
    groups() {
      return this.$route.name;
    }
  },

  created() {
    this.init1();
    this.init2();
    this.init3();
    this.init4();
    this.init5();
    this.init6();
    this.group1();
    this.group2();
    this.group3();

  },

  methods: {
    async init1() {
      const res = await fetchIndustry(2, this.state.date);
      this.state.box1 = res.find((item) => item.id === 'A01');
    },
    async init2() {
      const res = await fetchIndustry(2, this.state.date);
      this.state.box2 = res.find((item) => item.id === 'A13');
    },
    async init3() {
      const res = await fetchIndustry(2, this.state.date);
      this.state.smallbox1 = res.find((item) => item.id === 'A02');
    },
    async init4() {
      const res = await fetchIndustry(2, this.state.date);
      this.state.smallbox2 = res.find((item) => item.id === 'A06');
    },
    async init5() {
      const res = await fetchIndustry(2, this.state.date);
      this.state.smallbox3 = res.find((item) => item.id === 'A15');
    },
    async init6() {
      const res = await fetchIndustry(2, this.state.date);
      this.state.smallbox4 = res.find((item) => item.id === 'A08');
    },
    async group1() {
      const res = await fetchAppraisal(this.state.group1);
      this.state.per1 = res.project.ratio;
    },
    async group2() {
      const res = await fetchAppraisal(this.state.group2);
      this.state.per2 = res.project.ratio;
    },
    async group3() {
      const res = await fetchAppraisal(this.state.group3);
      this.state.per3 = res.project.ratio;
    }
  },

  render() {
    return (
      <div class={styles.background}>
        <div class={styles.top}>
          <div class={styles.title}>
            <img src={square} class={styles.titleImg}></img>
            <div class={styles.titleText}>
              <div class={styles.text}>经济运行指标</div>
              <router-link to={{ name: ECONOMY }} class={styles.more}>更多</router-link>
            </div>
          </div>
          <div class={styles.scroll}>
            <img src={line} class={styles.line}></img>
            <div class={styles.boxes}>
              <Boxes datas={this.state.box1} />
              <Boxes datas={this.state.box2} class={styles.rightbox} />
            </div>
            <div class={styles.smallboxes}>
              <SmallBoxes datas={this.state.smallbox1} />
              <SmallBoxes datas={this.state.smallbox2} class={styles.smallbox} />
              <SmallBoxes datas={this.state.smallbox3} class={styles.smallbox} />
              <SmallBoxes datas={this.state.smallbox4} class={styles.smallbox} />
            </div>
          </div>
        </div>
        <div class={styles.bottom}>
          <div class={styles.title}>
            <img src={square} class={styles.titleImg}></img>
            <div class={styles.titleText}>
              <div class={styles.text}>招商管理</div>
              <router-link to={{ name: BUSINESS }} class={styles.more}>更多</router-link>
            </div>
          </div>
          <div class={styles.scroll}>
            <img src={line} class={styles.line}></img>
            <div class={styles.bottomboxes}>
              <Zhaoshang
                list={[this.state.per1, this.state.per2, this.state.per3]}
              />
              <Zhaoshangtwo class={styles.bottombox} />
            </div>
            <div class={styles.bottomboxes}>
              <Zhaoshangthree />
              <Zhaoshangfour class={styles.bottombox} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

import styles from './SideBar.module.less';
import {
  fetchIndustry,
  fetchLatestDate,
  allProjectClass
} from '@/api';
import { ECONOMY } from '@/constants';


import square from '../../assets/Effect/square.png';
import line from '../../assets/Effect/line.png';

import Boxes from './Boxes';
// import SmallBoxes from './SmallBoxes';
// import Zhaoshang from './ZhaoShang';
// import Zhaoshangtwo from './ZhaoShangtwo';
// import Zhaoshangthree from './ZhaoShangthree';
// import Zhaoshangfour from './ZhaoShangfour';


export default {
  props: {
    dates: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      state: {
        date: undefined,
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
          rate: [],
          cumulative: []
        },
        smallbox1: {
          name: [],
          rate: [],
          cumulative: []
        },
        smallbox2: {
          name: [],
          rate: [],
          cumulative: []
        },
        smallbox3: {
          name: [],
          rate: [],
          cumulative: []
        },
        smallbox4: {
          name: [],
          rate: [],
          cumulative: []
        },
        smallbox5: {
          name: [],
          rate: [],
          cumulative: []
        },
        smallbox6: {
          name: [],
          rate: [],
          cumulative: []
        },
        smallbox7: {
          name: [],
          rate: [],
          cumulative: []
        },
        smallbox8: {
          name: [],
          rate: [],
          cumulative: []
        }
      },
      allProject: undefined
    };
  },

  computed: {
    groups() {
      return this.$route.name;
    }
  },

  watch: {
    dates: {
      immediate: true,
      async handler(dates) {
        console.log('cccc', dates);
        this.allProject = await allProjectClass(dates);
      }
    }
  },

  async created() {
    this.init();
  },

  methods: {
    async init() {
      this.state.date = await fetchLatestDate();
      const res = await fetchIndustry(2, this.state.date);
      this.state.box1 = res.find((item) => item.id === 'A01');
      this.state.box2 = res.find((item) => item.id === 'A13');
      this.state.smallbox1 = res.find((item) => item.id === 'A02');
      this.state.smallbox2 = res.find((item) => item.id === 'A06');
      this.state.smallbox3 = res.find((item) => item.id === 'A15');
      this.state.smallbox4 = res.find((item) => item.id === 'A08');
      this.state.smallbox5 = res.find((item) => item.id === 'A09');
      this.state.smallbox6 = res.find((item) => item.id === 'A04');
      this.state.smallbox7 = res.find((item) => item.id === 'A07');
      this.state.smallbox8 = res.find((item) => item.id === 'A14');
    }
  },

  render() {
    return (
      <div class={styles.background}>
        <div class={styles.top}>
          <div class={styles.title}>
            <img src={square} class={styles.titleImg}></img>
            <div class={styles.titleText}>
              <div class={styles.text}>统计汇总</div>
              {/* <router-link to={{ name: ECONOMY }} class={styles.more}>
                更多
              </router-link> */}
            </div>
          </div>
          {/* <div class={styles.scroll}>
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
          </div> */}
          <div class={styles.scroll}>
            <img src={line} class={styles.line}></img>
            <div class={styles.boxes}>
              {this.allProject && (
                <Boxes
                  datas={this.state.box1}
                  values={this.allProject.project_szx}
                  names={'省专项'}
                />
              )}
              {this.allProject && (
                <Boxes
                  datas={this.state.box2}
                  class={styles.rightbox}
                  values={this.allProject.project_sfz}
                  names={'省非专项'}
                />
              )}
              {this.allProject && (
                <Boxes
                  datas={this.state.box2}
                  class={styles.rightbox}
                  values={this.allProject.project_city}
                  names={'市项目'}
                />
              )}
              {this.allProject && (
                <Boxes
                  datas={this.state.box2}
                  class={styles.rightbox}
                  values={this.allProject.beautyVallage}
                  names={'美丽乡村'}
                />
              )}
            </div>
            {/* <div class={styles.smallboxes} style={{ marginTop: '10px' }}>
              <SmallBoxes datas={this.state.smallbox1} />
              <SmallBoxes
                datas={this.state.smallbox2}
                class={styles.smallbox}
              />
              <SmallBoxes
                datas={this.state.smallbox3}
                class={styles.smallbox}
              />
              <SmallBoxes
                datas={this.state.smallbox4}
                class={styles.smallbox}
              />
            </div> */}
            {/* <div class={styles.smallboxes} style={{ marginTop: '10px' }}>
              <SmallBoxes datas={this.state.smallbox5} />
              <SmallBoxes
                datas={this.state.smallbox6}
                class={styles.smallbox}
              />
              <SmallBoxes
                datas={this.state.smallbox7}
                class={styles.smallbox}
              />
              <SmallBoxes
                datas={this.state.smallbox8}
                class={styles.smallbox}
              />
            </div> */}
          </div>
        </div>
        {/* <div class={styles.bottom}>
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
        </div> */}
      </div>
    );
  }
};

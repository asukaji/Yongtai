import styles from './Card.module.less';

import card from '../../assets/Effect/card.png';

export default {
  props: {
    projects: {
      type: Object,
      required: true
    },
    mark: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      name: null
    };
  },

  watch: {
    projects: {
      immediate: true,

      handler(projects) {
        this.name = projects.name;
      }
    },

    mark() {
      this.name = this.mark.dept + this.mark.name;
    }
  },

  methods: {
    onClick(item) {
      console.log('marker', item);
      this.$emit('change', item);
    },

    onChange() {
      this.$emit('open');
    }
  },

  render() {
    return (
      <div>
        <div
          onClick={this.onClick.bind(this, [true,this.projects])}
          align="left"
          class={styles.cards}
        >
          <img src={card} class={styles.cardIcon}></img>
          <span style={{ color: '#fff', fontSize: '10px' }}>
            项目进度跟踪
          </span>
        </div>
        <div class={styles.card} onClick={this.onChange.bind(this)}>
          <div class={styles.title}></div>
          <div class={styles.second}>
            <div class={styles.data}>
              <div class={styles.textTitle1}>
                {this.name}
                {/* {this.projects.name}
                {this.mark.dept}
                {this.mark.name} */}
              </div>
            </div>
          </div>
          <hr class={styles.line} />
          <div align="left" class={styles.textTitle2}>
            区域类型：{this.projects.areaType}
            {this.mark.areaType}
          </div>
          <div align="left" class={styles.textTitle2}>
            责任单位：{this.projects.dept}
            {this.mark.dept}
          </div>
          <div align="left" class={styles.textTitle2}>
            项目类型：{this.projects.proType}
            {this.mark.proType}
          </div>
          <div align="left" class={styles.textTitle2}>
            总投资额(万元)：{this.projects.money}
            {this.mark.money}
          </div>
        </div>
      </div>
    );
  }
};

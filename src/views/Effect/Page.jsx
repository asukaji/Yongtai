import styles from './Page.module.less';


export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    change: {
      type: String,
      required: true
    },
    changes: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      page: null
    };
  },

  watch: {
    change() {
      this.page = -1;
    },
    changes() {
      this.page = -1;
    }
  },

  methods: {
    async handleClick(item, index) {
      if (this.page !== null) {
        if (index === this.page) {
          //点击同个卡片 ，汇总要关闭，
          this.page = null;
          item.treeCard = true;
          this.$emit('click', item);
        } else {
          // 点击不同的卡片  ，汇总不关闭
          item.treeCard = false;
          this.$emit('click', item);
          this.page = index;
        }
      } else {
        // 第一次进来 ，汇总是关闭
        item.treeCard = false;
        this.$emit('click', item);
        this.page = index;
      }
    }
  },

  render() {
    return (
      <div class={styles.distribute}>
        {this.list.map((item, index) => {
          return (
            <div
              class={[
                styles.background,
                this.page === index && styles.backgroundOpen
              ]}
              onClick={() => this.handleClick.call(this, item, index)}
            >
              <div class={styles.title}>{item.name}</div>
              <div class={styles.text}>
                {item.vallageNum}个村,{item.projectNum}个项目
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};

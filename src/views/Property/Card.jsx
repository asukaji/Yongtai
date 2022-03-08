import styles from './Card.module.less';

import VueTypes from 'vue-types';

export default {
  name: 'PropertyCard',

  props: {
    fetchData: VueTypes.func.def(),

    link: VueTypes.string.def()
  },

  data() {
    return {
      value: null
    };
  },

  computed: {
    routerLink() {
      return `/property/details/${this.$props.link}/1`;
    }
  },

  async mounted() {
    this.value = await this.fetchData?.();
  },

  render() {
    const sideTitle = !!this.link;

    return (
      <div class={styles.card}>
        {sideTitle && <div class={styles.title}>{this.$slots.header}</div>}
        <div>
          <div class={styles.header}>
            {sideTitle ? (
              <router-link to={this.routerLink}>
                查看明细&nbsp;&gt;&gt;&gt;
              </router-link>
            ) : (
              this.$slots.header
            )}
          </div>
          <div class={styles.content}>
            {this.$scopedSlots.default && this.$scopedSlots.default(this.value)}
          </div>
        </div>
      </div>
    );
  }
};

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
      data: null
    };
  },

  computed: {
    routerLink() {
      return {
        name: 'PropertyDetails',
        params: {
          name: this.$props.link
        }
      };
    }
  },

  async mounted() {
    this.data = await this.fetchData?.();
  },

  render() {
    const sideTitle = !!this.link;

    return (
      <div class={styles.card}>
        {sideTitle && <div class={styles.title}>{this.$slots.header}</div>}
        <div>
          <div class={styles.header}>
            {sideTitle ? (
              <router-link to={this.routerLink}>查看更多</router-link>
            ) : (
              this.$slots.header
            )}
          </div>
          <div class={styles.content}>{this.$scopedSlots.default}</div>
        </div>
      </div>
    );
  }
};

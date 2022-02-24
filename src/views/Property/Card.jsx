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
    const showHeader = !!this.$slots.header;

    return (
      <div class={styles.card}>
        {showHeader ? (
          <div class={styles.header}>
            {this.$slots.header}
            <router-link to={this.routerLink}>查看更多</router-link>
          </div>
        ) : null}
        <div class={styles.content}>{this.$slots.default}</div>
      </div>
    );
  }
};

import styles from './DrawerContainer.module.less';

import VueTypes from 'vue-types';

export default {
  name: 'PropertyCard',

  props: {
    fetchData: VueTypes.func(),

    link: VueTypes.string()
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

  render() {
    return (
      <div class={styles.card}>
        {this.$slots.header ? (
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

import Profile from './Profile';
import Project from './Project';
import styles from '../index.module.less';

import { fetchWorkData } from '@/api';

export default {
  name: 'Footer',

  data() {
    return {
      state: {
        street: null
      }
    };
  },

  computed: {
    street() {
      return this.$route.params.street;
    },

    village() {
      return this.$route.params.village;
    }
  },

  watch: {
    street: {
      immediate: true,

      async handler(street) {
        if (!this.village) {
          this.state.street = await fetchWorkData(street, 'town');
        }
      }
    },

    village: {
      immediate: true,

      async handler(village) {
        village &&
          (this.state.street = await fetchWorkData(
            village,
            'village',
            'project_szx'
          ));
      }
    }
  },

  render() {
    const { street } = this.state;

    return (
      <div class={styles.footer}>
        <Profile value={street?.element} />
        <Project value={street?.project} />
      </div>
    );
  }
};

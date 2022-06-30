import Profile from './Profile';
import Project from './Project';
import styles from '../index.module.less';

import { fetchWorkData } from '@/api';

import { VILLAGE_NAME } from '../index';

export default {
  name: 'Footer',

  data() {
    return {
      state: {
        street: null
      },
      datetime: ''
    };
  },

  computed: {
    street() {
      return this.$route.params.street ?? VILLAGE_NAME;
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
          this.state.street = await fetchWorkData(
            street,
            'town',
            'project_szx',
          );
        }
      }
    },

    village: {
      immediate: true,

      async handler(village) {
        if (village) {
          this.state.street = await fetchWorkData(
            village,
            'village',
            'project_szx',
          );
        } else {
          this.state.street = await fetchWorkData(
            this.street,
            'town',
          );
        }
      }
    },

    datetime: {
      immediate: true,

      async handler(datetime) {
        if (!this.village) {
          this.state.street = await fetchWorkData(
            this.street,
            'town',
            'project_szx',
            datetime
          );
        }
      }
    }
  },

  methods: {
    handleChange(item) {
      this.$emit('change', item);
    },

    async handelDateChange({ item, activeKey }) {
      this.datetime = item;
      this.state.street = await fetchWorkData(
        this.street,
        'town',
        activeKey,
        item
      );
    },

    handleKey(item) {
      this.$emit('activekey', item);
    }
  },

  render() {
    const { street } = this.state;

    return (
      <div class={styles.footer}>
        <Profile value={street?.element} style={{ marginTop: '20px' }} />
        <Project
          style={{ marginTop: '20px' }}
          value={street?.project}
          onClick={this.handleChange.bind(this)}
          onDate={this.handelDateChange.bind(this)}
          onActive={this.handleKey.bind(this)}
        />
      </div>
    );
  }
};

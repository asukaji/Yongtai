import Charts from './Charts';
import styles from './Static.module.less';

import VueTypes from 'vue-types';
import _ from 'lodash';

export default {
  name: 'Static',

  props: {
    value: VueTypes.object.def({})
  },

  render() {
    const { value } = this.$props;

    return (
      <div class={styles.paragraph}>
        <h2>{value.title}</h2>
        <pre>{value.pre}</pre>
        <div class={styles.indicator}>
          {_.map(value.indicator.list, ({ name, icon, text }) => (
            <div>
              <img src={icon} />
              <h3>{name}</h3>
              <pre>{text}</pre>
            </div>
          ))}
        </div>
        <p>{value.indicator.text}</p>
        <Charts values={value.charts} />
      </div>
    );
  }
};

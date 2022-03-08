import Header from '../Header';
import { Static } from '@/components/Custom';
import ChartsDrawer from '../Tour/ChartsDrawer';

import { geothermal, PROFILE_GEOTHERMAL } from '@/constants';

export default {
  name: 'ProfileContainer',

  computed: {
    showExtra() {
      return this.$route?.name === PROFILE_GEOTHERMAL;
    }
  },

  render() {
    return (
      <div style={{ height: '100%' }}>
        <Header>
          {this.showExtra ? (
            <ChartsDrawer>
              <Static value={geothermal} />
            </ChartsDrawer>
          ) : null}
        </Header>
        <router-view></router-view>
      </div>
    );
  }
};

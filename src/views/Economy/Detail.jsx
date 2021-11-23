
import { fetchIndustryRankingById, fetchIndustryInstrumentById } from '@/api';
import _ from 'lodash';

export default {
  name: 'EconomyDetail',

  data() {
    return {
      state: {
        ranking: undefined,
        instrument: undefined
      }
    };
  },

  computed: {
    id() {
      return this.$route.params?.id;
    }
  },

  mounted() {
    Promise.all([fetchIndustryRankingById(this.id), fetchIndustryInstrumentById(this.id)])
      .then(([ranking, instrument]) => {
        _.assign(this.state, { ranking, instrument });
      });
  },

  render() {
    return <div>
    </div>;
  }
};

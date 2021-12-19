import { Header } from '@/components/mobile';
import { Tag } from 'element-ui';
import styles from './Projects.module.less';

import { fetchUserProjects } from '@/api';
import { mapState, mapMutations } from 'vuex';
import _ from 'lodash';

import { POSITION } from '@/constants';

export default {
  name: 'Projects',

  computed: {
    ...mapState('mobile', ['projects'])
  },

  async mounted() {
    this.setProjects(await fetchUserProjects());
  },

  methods: {
    ...mapMutations('mobile', [
      'setProjects',
      'setProjectId',
      'clearFileList',
      'setProjectPosition'
    ]),

    onClick(id, position) {
      this.setProjectId(id);
      this.setProjectPosition(position);
      this.clearFileList();

      localStorage.setItem(POSITION, position);
      this.$router.push(`/home/${id}`);
    }
  },

  render() {
    return (
      <div>
        <Header />
        <h2>选择项目</h2>
        <div class={styles.list}>
          {_.map(
            this.projects,
            ({ projectName, tags, id, longitudes, latitudes }) => (
              <div
                onClick={this.onClick.bind(null, id, [longitudes, latitudes])}
              >
                <h3>{projectName}</h3>
                {_.map(tags, (tag) => (
                  <Tag type="primary" key={tag} size="mini">
                    {tag}
                  </Tag>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    );
  }
};

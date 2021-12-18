import { Header } from '@/components/mobile';
import { Tag } from 'element-ui';
import styles from './Projects.module.less';

import { fetchUserProjects } from '@/api';
import { mapState, mapMutations } from 'vuex';
import _ from 'lodash';

export default {
  name: 'Projects',

  computed: {
    ...mapState('mobile', ['projects'])
  },

  async mounted() {
    this.setProjects(await fetchUserProjects());
  },

  methods: {
    ...mapMutations('mobile', ['setProjects', 'setProjectId', 'clearFileList']),

    onClick(id) {
      this.setProjectId(id);
      this.clearFileList();

      this.$router.push(`/home/${id}`);
    }
  },

  render() {
    return (
      <div>
        <Header />
        <h2>选择项目</h2>
        <div class={styles.list}>
          {_.map(this.projects, ({ projectName, tags, id }) => (
            <div onClick={this.onClick.bind(null, id)}>
              <h3>{projectName}</h3>
              {_.map(tags, (tag) => (
                <Tag type="primary" key={tag} size="mini">
                  {tag}
                </Tag>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
};

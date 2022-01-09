import { Header } from '@/components/mobile';
import { Tag, Tabs, TabPane } from 'element-ui';
import styles from './Projects.module.less';

import { fetchUserProjects, fetchProjects } from '@/api';
import { mapState, mapMutations } from 'vuex';
import _ from 'lodash';

import { POSITION } from '@/constants';

export default {
  name: 'Projects',

  data() {
    return {
      state: {
        tab: 'user'
      }
    };
  },

  computed: {
    ...mapState('mobile', ['projects']),

    userProjects() {
      return _.filter(this.projects, ['isUser', true]);
    },

    otherProjects() {
      return _.filter(this.projects, ['isUser', undefined]);
    }
  },

  async mounted() {
    const projects = [
      ..._.map(await fetchUserProjects(), (project) => ({
        ...project,
        isUser: true
      })),
      ...(await fetchProjects())
    ];

    this.setProjects(projects);
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
        <Tabs vModel={this.state.tab} class={styles.tabs}>
          <TabPane key="user" name="user" label="重点项目">
            <div class={styles.list}>
              {_.map(
                this.userProjects,
                ({ projectName, tags, id, longitudes, latitudes }) => (
                  <div
                    onClick={this.onClick.bind(null, id, [
                      longitudes,
                      latitudes
                    ])}
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
          </TabPane>
          <TabPane key="other" name="other" label="乡村振兴">
            <div class={styles.list}>
              {_.map(
                this.otherProjects,
                ({ projectName, id, longitudes, latitudes }) => (
                  <div
                    onClick={this.onClick.bind(null, id, [
                      longitudes,
                      latitudes
                    ])}
                  >
                    <h3>{projectName}</h3>
                  </div>
                )
              )}
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
};

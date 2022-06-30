import { Header } from '@/components/mobile';
import { Tag, Tabs, TabPane, Empty, Button } from 'element-ui';
import styles from './Projects.module.less';

import { fetchUserProjects, fetchProjects } from '@/api';
import { mapState, mapMutations } from 'vuex';
import _ from 'lodash';

import { POSITION, TOKEN, SIGN_TYPE } from '@/constants';

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
      return _.filter(this.projects, ({ isUser }) => _.isUndefined(isUser));
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

    onClick(id, position, signType = '') {
      this.setProjectId(id);
      this.setProjectPosition(position);
      this.clearFileList();

      localStorage.setItem(POSITION, position);
      localStorage.setItem(SIGN_TYPE, signType);
      this.$router.push(`/home/${id}`);
    },

    logout() {
      localStorage.removeItem(TOKEN);
      this.$router.replace('/login');
    },

    toIndividual() {
      this.$router.push('/Individual');
    }
  },

  render() {
    return (
      <div>
        <Header>
          <Button
            onClick={this.toIndividual}
            size="small"
            circle
            icon="el-icon-user"
          />
        </Header>
        <Tabs vModel={this.state.tab} class={styles.tabs}>
          <TabPane key="user" name="user" label="重点项目">
            {_.size(this.userProjects) ? (
              <div class={styles.list}>
                {_.map(
                  this.userProjects,
                  ({ projectName, tags, id, longitudes, latitudes }) => (
                    <div
                      onClick={this.onClick.bind(
                        null,
                        id,
                        [longitudes, latitudes],
                        undefined
                      )}
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
            ) : (
              <Empty />
            )}
          </TabPane>
          <TabPane key="other" name="other" label="乡村振兴">
            {_.size(this.otherProjects) ? (
              <div class={styles.list}>
                {_.map(
                  this.otherProjects,
                  ({ projectName, tags, id, longitudes, latitudes }) => (
                    <div
                      onClick={this.onClick.bind(
                        null,
                        id,
                        [longitudes, latitudes],
                        'village'
                      )}
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
            ) : (
              <Empty />
            )}
          </TabPane>
        </Tabs>
      </div>
    );
  }
};

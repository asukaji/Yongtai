import { Menu, MenuItem, Popover, Empty } from 'element-ui';
import styles from './ProjectModal.module.less';

import _ from 'lodash';

export default {
  name: 'ProjectsModal',

  data() {
    return {
      state: {
        visible: false,
        title: '',
        projects: []
      }
    };
  },

  methods: {
    async open(projects) {
      if (_.isEqual(projects, this.state.projects)) {
        this.close();
        return;
      }

      this.state.visible = true;
      this.state.projects = projects;
    },

    renderMedia() {
      return (
        <div class="media">
          {this.media?.map(({ src, type }) =>
            type === 'image' ? (
              <img src={src} vViewer/>
            ) : (
              <div to={src} class="video">
                <video controls>
                  <source src={src} />
                </video>
              </div>
            )
          )}
        </div>
      );
    },

    onClick({ id, position, title }) {
      this.$emit('click', [id, title, position]);
    },

    close() {
      Object.assign(this.state, { title: '', projects: [] });
      this.state.visible = false;
    }
  },

  render() {
    return (
      <Popover
        value={this.state.visible}
        placement="bottom"
        trigger="manual"
        popperClass={styles.modal}
      >
        <Menu>
          {_.isEmpty(this.state.projects) ? (
            <Empty />
          ) : (
            _.map(this.state.projects, (option, index) => (
              <MenuItem
                index={`${index}`}
                onClick={this.onClick.bind(null, option)}
              >
                {option.title}
              </MenuItem>
            ))
          )}
        </Menu>
      </Popover>
    );
  }
};

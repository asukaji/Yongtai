import { Menu, MenuItem, Popover, Empty, Tag } from 'element-ui';
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
                <p>{option.title}</p>
                {_.map(option.tags, tag => <Tag size="mini">{tag}</Tag>)}
              </MenuItem>
            ))
          )}
        </Menu>
      </Popover>
    );
  }
};

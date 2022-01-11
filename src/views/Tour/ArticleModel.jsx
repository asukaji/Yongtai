import { Menu, MenuItem, Popover, Empty, Tag } from 'element-ui';
import styles from './ArticleModel.module.less';

import _ from 'lodash';

export default {
  name: 'ArticleModal',

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
      this.state.visible = true;
      this.state.projects = projects;
    },

    onClick({ content, itemName, createTime, fileList }) {
      this.$emit('click', { content, itemName, createTime, fileList });
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
        placement="right"
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
                <p>{option.itemName}</p>
                <Tag size="mini">{option.createTime}</Tag>
              </MenuItem>
            ))
          )}
        </Menu>
      </Popover>
    );
  }
};

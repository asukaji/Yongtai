import { Menu, MenuItem, Popover, Empty, Tag, Button } from 'element-ui';
import styles from './ProjectModal.module.less';

import { fetchTourArticle } from '@/api';
import _ from 'lodash';

export default {
  name: 'ArticlePoper',

  data() {
    return {
      state: {
        visible: false,
        title: '',
        articles: []
      }
    };
  },

  async mounted() {
    this.state.articles = await fetchTourArticle();
  },

  methods: {
    async open(projects) {
      this.state.visible = true;
      this.state.projects = projects;
    },

    onClick({ url }) {
      window.open(url);
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
        placement="top"
        trigger="click"
        popperClass={styles.modal}
      >
        <Menu>
          {_.isEmpty(this.state.articles) ? (
            <Empty />
          ) : (
            _.map(this.state.articles, (option, index) => (
              <MenuItem
                index={`${index}`}
                onClick={this.onClick.bind(null, option)}
              >
                <p>{option.article}</p>
              </MenuItem>
            ))
          )}
        </Menu>
        <Button slot="reference">精品两日游</Button>
      </Popover>
    );
  }
};

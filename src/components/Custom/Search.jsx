import { Menu, MenuItem, Input, Button, Popover, Empty } from 'element-ui';
import styles from './Search.module.less';

import VueTypes from 'vue-types';
import _ from 'lodash';

import iconSearch from '@/assets/Icon/icon-search.png';

export default {
  name: 'Search',

  props: {
    options: VueTypes.array.def([])
  },

  data() {
    return {
      state: {
        visible: false,
        value: ''
      }
    };
  },

  computed: {
    nextOptions() {
      return _.filter(this.options, ({ title }) =>
        _.includes(title, this.state.value)
      );
    }
  },

  methods: {
    onInputChange(value) {
      this.state.value = value;

      _.isEmpty(value)
        ? (this.state.visible = false)
        : (this.state.visible = true);
    },

    onClick({ id, position, title, contacts, filePath }) {
      this.$emit('click', [id, title, position, contacts, filePath]);
    },

    close() {
      this.state.visible = false;
      this.state.value = '';
    }
  },

  render() {
    return (
      <Popover value={this.state.visible} placement="bottom" trigger="manual">
        <Menu>
          {_.isEmpty(this.nextOptions) ? (
            <Empty />
          ) : (
            _.map(this.nextOptions, (option, index) => (
              <MenuItem
                index={`${index}`}
                onClick={this.onClick.bind(null, option)}
              >
                {option.title}
              </MenuItem>
            ))
          )}
        </Menu>

        <Input
          slot="reference"
          value={this.state.value}
          placeholder="请输入名称或关键字搜索"
          class={styles.input}
          onInput={this.onInputChange}
        >
          <Button slot="append" type="primary">
            <img src={iconSearch} />
          </Button>
        </Input>
      </Popover>
    );
  }
};

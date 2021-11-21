import { Input, Dialog, Button, CheckboxGroup, Checkbox } from 'element-ui';
import styles from './ParagraphModal.module.less';

import VueTypes from 'vue-types';
import { createMeeting } from '@/api';
import _ from 'lodash';

export default {
  name: 'SelectModal',

  props: {
    options: VueTypes.array.def([])
  },

  data() {
    return {
      userName: '',
      name: '',
      values: [''],
      towns: [],
      state: {
        visible: false,
        loading: false,
        href: undefined
      }
    };
  },

  methods: {
    open() {
      this.state.href = undefined;
      this.state.visible = true;
    },

    onInput(index, value) {
      this.$set(this.values, [index], value);
    },

    onPlus(index) {
      this.values.splice(index + 1, 0, '');
    },

    onMinus(index) {
      this.values.splice(index, 1);
    },

    onChange(id, checked) {
      if (checked) {
        this.$set(this, 'towns', _.concat(this.towns, id));
      } else {
        this.$set(
          this,
          'towns',
          _.filter(this.towns, (town) => town !== id)
        );
      }
    },

    renderOptions() {
      return (
        <CheckboxGroup value={this.towns} checked={this.towns}>
          {_.map(this.options, ({ id, title }) => (
            <Checkbox
              label={title}
              value={id}
              checked={_.includes(this.towns, id)}
              onChange={this.onChange.bind(null, id)}
            />
          ))}
        </CheckboxGroup>
      );
    },

    renderInputs() {
      return (
        <div class={styles.inputs}>
          {this.values?.map((value, index) => (
            <div>
              <Input
                key={index}
                value={value}
                placeholder="请输入参加会议人员手机号"
                onInput={this.onInput.bind(this, index)}
              />
              <Button
                icon="el-icon-plus"
                size="small"
                type="primary"
                circle
                onClick={this.onPlus.bind(this, index)}
              />
              <Button
                icon="el-icon-minus"
                size="small"
                type="danger"
                circle
                onClick={this.onMinus.bind(this, index)}
              />
            </div>
          ))}
        </div>
      );
    },

    onClose() {
      Object.assign(this.state, { visible: false });
    },

    onUserInput(value) {
      this.userName = value;
    },

    onNameInput(value) {
      this.name = value;
    },

    renderHref() {
      return (
        <div
          onClick={() => window.open(this.state.href?.url)}
          style={{ color: '#0078FF' }}
        >
          点击此链接参加会议：{this.state.href?.title}
        </div>
      );
    },

    async onJoin() {
      this.state.loading = true;
      try {
        this.state.href = await createMeeting({
          contenst: this.values,
          initiator: this.userName,
          meeting: this.name
        });
      } catch (err) {
        this.state.href = undefined;
      } finally {
        this.state.loading = false;
      }
    }
  },

  render() {
    return (
      <Dialog
        title="视频连线"
        visible={this.state.visible}
        loading={this.state.loading}
        onClose={this.onClose}
        closeOnClickModal={false}
      >
        {this.state.href ? (
          this.renderHref()
        ) : (
          <div>
            {/* {this.renderOptions()} */}
            {this.renderInputs()}
            <Input
              value={this.userName}
              placeholder="请输入发起人的名称"
              onInput={this.onUserInput}
            />
            <Input
              value={this.name}
              placeholder="请输入本次会议的会议名称"
              onInput={this.onNameInput}
              style={{ marginTop: '8px' }}
            />
          </div>
        )}

        <div slot="footer">
          <Button onClick={this.onClose}>取消</Button>
          {!this.state.href && (
            <Button
              loading={this.state.loading}
              type="primary"
              onClick={this.onJoin}
            >
              加入
            </Button>
          )}
        </div>
      </Dialog>
    );
  }
};

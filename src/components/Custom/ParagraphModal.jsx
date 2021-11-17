import { Dialog } from 'element-ui';
import Paragraph from './Paragraph';
import { Fragment } from 'vue-fragment';
import styles from './ParagraphModal.module.less';

import iconBelong from '@/assets/Icon/icon-belong.png';
import iconInvestments from '@/assets/Icon/icon-investments.png';

export default {
  name: 'ParagraphModal',

  data() {
    return {
      state: {
        visible: false,
        loading: false,
        content: undefined
      }
    };
  },

  computed: {
    title() {
      return this.state.content?.title;
    },

    belong() {
      return this.state.content?.belong;
    },

    investments() {
      return this.state.content?.investments;
    },

    name() {
      return this.state.content?.name;
    },

    content() {
      return this.state.content?.content;
    },

    media() {
      return this.state.content?.media;
    }
  },

  methods: {
    async open(fetchDetail, title) {
      this.state.visible = true;
      if (fetchDetail) {
        this.state.content = null;
        this.state.loading = true;
        this.state.content = { ...(await fetchDetail()), title };
        this.state.loading = false;
      } else {
        this.state.content = undefined;
      }
    },

    onClick() {
      console.log(111);
    },

    renderMedia() {
      return (
        <div class="media">
          {this.media?.map(({ src, type }) =>
            type === 'image' ? (
              <img src={src} />
            ) : (
              <div to={src} class="video" onClick={this.onClick}>
                <video controls>
                  <source src={src} />
                </video>
              </div>
            )
          )}
        </div>
      );
    },

    onClose() {
      Object.assign(this.state, { visible: false });
    }
  },

  render() {
    return (
      <Dialog
        visible={this.state.visible}
        loading={this.state.loading}
        onClose={this.onClose}
        customClass={styles.modal}
      >
        <Paragraph>
          {this.state.content === undefined ? (
            this.$slots.default
          ) : (
            <Fragment>
              <h1>{this.title}</h1>
              <div class={styles.pre}>
                <img src={iconBelong} />
                <span>{this.belong}</span>
                <img src={iconInvestments} />
                <span>{this.investments}</span>
              </div>
              {this.name && <pre>{this.name}</pre>}
              <p>{this.content}</p>
              {this.renderMedia()}
            </Fragment>
          )}
        </Paragraph>
      </Dialog>
    );
  }
};

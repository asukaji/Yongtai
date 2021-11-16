import { Dialog } from 'element-ui';
import Paragraph from './Paragraph';
import { Fragment } from 'vue-fragment';

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
    async open(fetchDetail) {
      this.state.visible = true;
      if (fetchDetail) {
        this.state.content = null;
        this.state.loading = true;
        this.state.content = await fetchDetail();
        this.state.loading = false;
      }
    },

    renderMedia() {
      return (
        <div class="media">
          {this.media?.map(({ src, type }) =>
            type === 'image' ? <img src={src} /> : <video src={src} />
          )}
        </div>
      );
    },

    onClosed() {
      Object.assign(this.state, { loading: false, content: undefined });
    }
  },

  render() {
    return (
      <Dialog loading={this.state.loading} onClosed={this.onClosed}>
        <Paragraph>
          {this.state.content === undefined ? (
            this.$slots.default
          ) : (
            <Fragment>
              <h2>{this.title}</h2>
              <pre>{this.name}</pre>
              <p>{this.content}</p>
              {this.renderMedia()}
            </Fragment>
          )}
        </Paragraph>
      </Dialog>
    );
  }
};

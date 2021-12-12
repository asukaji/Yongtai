import { Dialog } from 'element-ui';
import Paragraph from './Paragraph';
import styles from './ParagraphModal.module.less';

import _ from 'lodash';

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
    },

    contacts() {
      return this.state.content?.contacts;
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
        this.$emit('mounted', this.contacts);
      } else {
        this.state.content = undefined;
      }
    },

    renderMedia() {
      return (
        <div class="media">
          {this.media?.map(({ src, type }) =>
            type === 'image' ? (
              <img src={src} vViewer />
            ) : (
              <div to={src} class="video">
                <video controls="controls">
                  <source src={src} />
                </video>
              </div>
            )
          )}
        </div>
      );
    },

    onClose() {
      this.$emit('close');
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
          {this.$slots.default ? (
            _.isUndefined(this.state.content) ? (
              this.$slots.default
            ) : !_.isUndefined(this.contacts) ? (
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <h1>{this.title}</h1>
                  {this.$slots.title}
                </div>
                {this.$slots.default}
              </div>
            ) : (
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <h1>{this.title}</h1>
                  {this.$slots.title}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between'
                  }}
                >
                  {(this.belong || this.investments) && (
                    <div class={styles.pre}>
                      <img src={iconBelong} />
                      <span>{this.belong}</span>
                      <img src={iconInvestments} />
                      <span>{this.investments}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {_.map(this.contacts, ({ username, type_dictText }) => (
                      <pre
                        style={{
                          display: 'flex',
                          alignItems: 'flex-end',
                          fontSize: '16px',
                          color: '#333333',
                          margin: 0,
                          marginLeft: '8px'
                        }}
                      >
                        {type_dictText}
                        <span
                          style={{
                            color: '#999999',
                            fontSize: '12px',
                            marginLeft: '2px'
                          }}
                        >
                          {username}
                        </span>
                      </pre>
                    ))}
                  </div>
                </div>

                {this.name && <pre>{this.name}</pre>}
                <p>{this.content}</p>
                {this.renderMedia()}
              </div>
            )
          ) : (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <h1>{this.title}</h1>
                {this.$slots.title}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between'
                }}
              >
                {(this.belong || this.investments) && (
                  <div class={styles.pre}>
                    <img src={iconBelong} />
                    <span>{this.belong}</span>
                    <img src={iconInvestments} />
                    <span>{this.investments}</span>
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {_.map(this.contacts, ({ username, type_dictText }) => (
                    <pre
                      style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        fontSize: '16px',
                        color: '#333333',
                        margin: 0,
                        marginLeft: '8px'
                      }}
                    >
                      {type_dictText}
                      <span
                        style={{
                          color: '#999999',
                          fontSize: '12px',
                          marginLeft: '2px'
                        }}
                      >
                        {username}
                      </span>
                    </pre>
                  ))}
                </div>
              </div>

              {this.name && <pre>{this.name}</pre>}
              <p>{this.content}</p>
              {this.renderMedia()}
            </div>
          )}
        </Paragraph>
      </Dialog>
    );
  }
};

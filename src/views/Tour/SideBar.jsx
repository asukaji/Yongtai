import { Tabs, TabPane } from 'element-ui';
import ArticleModal from './ArticleModel';
import { ParagraphModal } from '@/components/Custom';
import styles from './SideBar.module.less';

import { fetchTourArticleByType } from '@/api';

import iconStore from '@/assets/Icon/icon-store.png';
import iconTravel from '@/assets/Icon/icon-travel.png';
import iconHiking from '@/assets/Icon/icon-hiking.png';
import iconBeach from '@/assets/Icon/icon-beach.png';
import iconCable from '@/assets/Icon/icon-cable.png';
import iconPack from '@/assets/Icon/icon-pack.png';

const tabs = [
  { name: 'food', label: '吃', icon: iconStore },
  { name: 'hotel', label: '住', icon: iconTravel },
  { name: 'route', label: '行', icon: iconHiking },
  { name: 'tourist', label: '游', icon: iconBeach },
  { name: 'amusement', label: '娱', icon: iconCable },
  { name: 'shopping', label: '购', icon: iconPack }
];

const isImage = (fileType) => {
  return fileType === '.jpg' || fileType === '.png' || fileType === '.jpeg';
};

export default {
  name: 'TourSideBar',

  data() {
    return {
      state: { activeKey: '0', article: undefined }
    };
  },

  watch: {
    'state.activeKey': {
      async handler(key) {
        if (key !== '0') {
          this.$refs.ArticleModal.open(await fetchTourArticleByType(key));
        } else {
          this.$refs.ArticleModal.close();
        }
      }
    }
  },

  methods: {
    clear() {
      this.state.activeKey = '0';
    },

    onClick(article) {
      this.state.article = article;

      this.$refs.modal?.open();
    },

    renderMedia() {
      return (
        <div class="media">
          {this.state.article?.fileList?.map(({ filePath, fileType }) =>
            isImage(fileType) ? (
              <img src={filePath} vViewer />
            ) : (
              <div to={filePath} class="video">
                <video controls="controls">
                  <source src={filePath} />
                </video>
              </div>
            )
          )}
        </div>
      );
    }
  },

  render() {
    const { article } = this.state;

    return (
      <div>
        <Tabs
          tabPosition="right"
          vModel={this.state.activeKey}
          class={styles.sideBar}
        >
          {tabs.map(({ name, label, icon }) => (
            <TabPane key={name} name={name}>
              <div slot="label">
                <img src={icon} />
                <p>{label}</p>
              </div>
            </TabPane>
          ))}
        </Tabs>

        <ArticleModal ref="ArticleModal" onClick={this.onClick} />
        <ParagraphModal ref="modal">
          <h2>{article?.itemName}</h2>
          <pre>{article?.createTime}</pre>
          <p>{article?.content}</p>
          {this.renderMedia()}
        </ParagraphModal>
      </div>
    );
  }
};

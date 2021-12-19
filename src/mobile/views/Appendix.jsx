import { Header } from '@/components/mobile';
import styles from './Appendix.module.less';

import { mapState } from 'vuex';
import _ from 'lodash';

export default {
  name: 'Appendix',

  computed: {
    ...mapState('mobile', ['records']),

    fileList() {
      return _.get(
        this.records,
        [this.$route.params.id, this.$route.params.index, 'fileList'],
        []
      );
    },

    imgList() {
      return _.filter(
        this.fileList,
        ({ fileType }) => fileType === '.png' || fileType === '.jpg'
      );
    },

    videoList() {
      return _.filter(
        this.fileList,
        ({ fileType }) => fileType !== '.png' && fileType !== '.jpg'
      );
    }
  },

  render() {
    return (
      <div>
        <Header />
        <h4>图片</h4>
        <div class={styles.container}>
          {_.map(this.imgList, ({ filePath }) => (
            <img src={filePath} />
          ))}
        </div>
        <h4>视频</h4>
        <div class={styles.container}>
          {_.map(this.videoList, ({ filePath }) => (
            <video src={filePath} controls />
          ))}
        </div>
      </div>
    );
  }
};

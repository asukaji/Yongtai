import { Upload } from 'element-ui';
import { Header } from '@/components/mobile';
import styles from './Upload.module.less';

import { mapMutations, mapState } from 'vuex';
import moment from 'moment';

import { TOKEN } from '@/constants';

export default {
  name: 'Upload',

  computed: {
    ...mapState('mobile', ['imgList', 'videoList'])
  },

  methods: {
    ...mapMutations('mobile', ['setFileList']),

    onSuccess(type, { message }) {
      this.setFileList([message, type]);
    }
  },

  render() {
    return (
      <div>
        <Header />
        <h4>图片上传</h4>
        <Upload
          listType="picture-card"
          action={`${process.env.VUE_APP_BASE_NEXT_URL}/sys/common/upload`}
          headers={{
            'X-Access-Token': localStorage.getItem(TOKEN)
          }}
          data={{
            biz: `xiangcun/upload/${moment().startOf('day').valueOf()}`
          }}
          fileList={this.imgList}
          limit={3}
          accept="image/*"
          class={styles.upload}
          {...{
            props: {
              onSuccess: this.onSuccess.bind(null, 'img'),
              onError: () => this.$router.replace('/login')
            }
          }}
        >
          <i class="el-icon-plus"></i>
        </Upload>
        <h4>视频上传</h4>
        <Upload
          listType="picture-card"
          action={`${process.env.VUE_APP_BASE_NEXT_URL}/sys/common/upload`}
          headers={{
            'X-Access-Token': localStorage.getItem(TOKEN)
          }}
          data={{
            biz: `xiangcun/upload/${moment().startOf('day').valueOf()}`
          }}
          fileList={this.videoList}
          limit={3}
          accept="video/*"
          class={styles.upload}
          {...{
            props: {
              onSuccess: this.onSuccess.bind(null, 'video'),
              onError: () => this.$router.replace('/login')
            },
            scopedSlots: {
              //defaul 默认具名插槽
              file: ({ file }) => {
                return <video src={file.url} controls />;
              }
            }
          }}
        >
          <i class="el-icon-plus"></i>
        </Upload>
      </div>
    );
  }
};

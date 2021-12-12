import Header from '../Header';
import { Button } from 'element-ui';
import FileList from './FileList';
import Charts from './Charts';

import { mapState } from 'vuex';
import _ from 'lodash';

// import bg from '@/assets/Bg/control-bg.png';

export default {
  name: 'Control',

  data() {
    return {
      state: {
        currentPage: 1
      }
    };
  },
  computed: {
    ...mapState('control', ['fileList']),
  },
  
  methods: {
    next() {
      this.state.currentPage++;
    },

    prev() {
      this.state.currentPage--;
    }
  },

  render() {
    const { currentPage } = this.state;
    const { fileList } = this;

    return (
      <div
        style={{
          height: '100%',
          textAlign: 'center',
          backgroundColor: '#F6F7F9'
        }}
      >
        <Header />
        <div
          style={{
            display: 'flex',
            height: '100%'
          }}
        >
          <FileList />
          <div
            style={{
              flex: 1
            }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: '0',
                left: '50%',
                width: '428px',
                height: 'calc(100% - 74px)',
                marginLeft: '-240px',
                border: '10px solid #000',
                borderRadius: '20px',
                backgroundImage: `url(${fileList[currentPage - 1]})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#F6F7F9'
              }}
            >
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                bottom: '20px',
                marginLeft: '-60px',
                left: '50%',
              }}
            >
              <Button
                size="mini"
                icon="el-icon-arrow-left"
                disabled={currentPage === 1}
                onClick={this.prev}
              />
              <span style={{ marginLeft: '4px' }}>
                {' '}
                {currentPage} / {_.size(fileList)}{' '}
              </span>
              <Button
                size="mini"
                icon="el-icon-arrow-right el-icon--right"
                disabled={currentPage === _.size(fileList)}
                style={{ marginLeft: '4px' }}
                onClick={this.next}
              />
            </div>

          </div>
          <Charts />
        </div>
        
      </div>
    );
  }
};

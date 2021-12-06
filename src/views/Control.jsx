import Header from './Header';
import { DatePicker, Select, Option, Button } from 'element-ui';

import { fetchRanges, fetchControlContentById } from '@/api';
import moment from 'moment';
import _ from 'lodash';

import control1 from '@/assets/Bg/control1.png';
import control2 from '@/assets/Bg/control2.png';
import control3 from '@/assets/Bg/control3.png';

export default {
  name: 'Control',

  data() {
    return {
      state: {
        date: [],
        id: undefined,
        title: '',
        ids: [],
        fileList: [],
        PDFPath: '',
        currentPage: 1
      }
    };
  },

  computed: {
    daterange() {
      const { date } = this.state;

      return [
        date[0] ? moment(date[0]).format('YYYY-MM-DD') : '',
        date[1] ? moment(date[1]).format('YYYY-MM-DD') : ''
      ];
    },

    id() {
      return this.state.id ?? _.last(this.state.ids)?.id;
    }
  },

  watch: {
    async daterange() {
      this.state.ids = await fetchRanges(...this.daterange);
    },

    async id(id) {
      this.state.id = id;
      this.state.title = _.find(this.state.ids, ['id', id])?.names;

      const { PDFPath, fileList } = await fetchControlContentById(id);

      _.assign(this.state, {
        PDFPath,
        fileList,
        currentPage: 1
      });
    }
  },

  mounted() {
    // this.state.date = [moment().subtract(1, 'month').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
    this.state.date = [undefined, undefined];
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
    const { ids, fileList, currentPage, PDFPath } = this.state;
    const debug = true;

    return (
      <div
        style={{
          height: '100%',
          textAlign: 'center',
          backgroundColor: '#F6F7F9'
        }}
      >
        <Header />
        {debug ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <img src={control3} style={{ flex: '33%', width: '33%' }} />
            <img src={control1} style={{ flex: '33%', width: '33%' }} />
            <img src={control2} style={{ flex: '33%', width: '33%' }} />
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              height: '100%'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                padding: '80px 8px',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.8)'
              }}
            >
              <DatePicker
                vModel={this.state.date}
                startPlaceholder="开始日期"
                endPlaceholder="结束日期"
                type="daterange"
                size="smal"
              />

              <Select
                vModel={this.state.id}
                size="smal"
                placeholder="请选择"
                style={{
                  marginTop: '20px'
                }}
              >
                {_.map(ids, ({ id, names }) => (
                  <Option value={id} label={names} />
                ))}
              </Select>
            </div>
            <div
              style={{
                flex: 1
              }}
            >
              <h1>{this.state.title}</h1>
              <img
                src={fileList[currentPage - 1]}
                style={{ height: 'calc(100% - 218px)' }}
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
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
                {PDFPath && (
                  <div
                    style={{ marginLeft: '8px', color: '#0078FF' }}
                    onClick={() => window.open(PDFPath)}
                  >
                    查看完整攻坚周报
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

import Header from './Header';
import { DatePicker, Select, Option, Button } from 'element-ui';

import { fetchRanges, fetchControlContentById } from '@/api';
import moment from 'moment';
import _ from 'lodash';

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
      return [moment(this.state.date[0]).format('YYYY-MM-DD'), moment(this.state.date[1]).format('YYYY-MM-DD')];
    },

    id() {
      return this.state.id ?? this.state.ids[0]?.id;
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
    this.state.date = [moment().subtract(1, 'month').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
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

    return (
      <div
        style={{
          height: '100%',
          textAlign: 'center',
          backgroundColor: '#F6F7F9'
        }}
      >
        <Header />
        <div style={{
          display: 'flex',
          height: '100%',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start', justifyContent: 'flex-start',
            padding: '80px 8px',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
          }}>
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
                marginTop: '20px',
              }}
            >
              {
                _.map(ids, ({id, names }) => <Option value={id} label={names} />)
              }
            </Select>
          </div>
          <div style={{
            flex: 1,
          }}>

            <h1>{this.state.title}</h1>
            <img src={fileList[currentPage - 1]} style={{height: 'calc(100% - 218px)'}} />
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Button size="mini" icon="el-icon-arrow-left" disabled={currentPage === 1} onClick={this.prev}/>
              <span style={{marginLeft: '4px'}}> {currentPage} / {_.size(fileList)} </span>
              <Button size="mini" icon="el-icon-arrow-right el-icon--right" disabled={currentPage === _.size(fileList)} style={{marginLeft: '4px'}} onClick={this.next}/>
              {PDFPath && <div style={{marginLeft: '8px', color: '#0078FF'}} onClick={() => window.open(PDFPath)}>下载</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

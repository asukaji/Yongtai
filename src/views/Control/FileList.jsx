
import { DatePicker, Select, Option, Card, Empty, Button } from 'element-ui';
import styles from './FileList.module.less';

import { mapState, mapActions } from 'vuex';
import _ from 'lodash';
import moment from 'moment';

import fileBg from '@/assets/Bg/control-file-bg.png';

export default {
  name: 'FileList',

  data() {
    return {
      state: {
        date: [],
        id: undefined,
        title: ''
      }
    };
  },

  computed: {
    ...mapState('control', ['ids', 'PDFPath']),

    daterange() {
      const { date } = this.state;

      return [
        date[0] ? moment(date[0]).format('YYYY-MM-DD') : '',
        date[1] ? moment(date[1]).format('YYYY-MM-DD') : ''
      ];
    },

    id() {
      return this.state.id ?? _.last(this.ids)?.id;
    },

    getId() {
      return (id) => _.find(this.ids, ['id', id]);
    }
  },
  
  watch: {
    daterange(date) {
      this.fetchRanges(date);
    },

    id(id) {
      this.state.id = id;
      this.state.title = _.find(this.ids, ['id', id])?.names;

      this.fetchControlContentById(id);
    }
  },

  mounted() {
    this.state.date = [undefined, undefined];
  },

  methods: {
    ...mapActions('control', [
      'fetchRanges',
      'fetchControlContentById'
    ]),

    renderFileList() {
      return _.size(this.PDFPath) ? (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          width: '100%',
        }}
        >
          {_.map(this.PDFPath, (url, id) => <Card key={id} class={styles.file} style={{
            position: 'relative',
            width: '116px',
            height: '140px',
            marginRight: '4px',
            marginBottom: '8px'
          }}>
            <Button icon="el-icon-download" size="mini"
              style={{
                position: 'absolute',
                right: '0',
                top: '4px',
                color: '#1369C8',
                border: 'none'
              }}
              onClick={() => window.open(url)}
            ></Button>
            <img src={fileBg}/>
            <span>{this.getId(id)?.names}概览</span>
            <pre>{this.getId(id)?.datetime}</pre>
          </Card>)}
        </div>
      ) : <Empty />;
    }
  },

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '264px',
          padding: '12px 0 16px 16px',
          height: '100%',
          backgroundColor: '#fafbfc'
        }}
      >
        <h2 style={{marginTop: 0}}>{this.state.title}</h2>
        <DatePicker
          vModel={this.state.date}
          startPlaceholder="开始日期"
          endPlaceholder="结束日期"
          type="daterange"
          size="mini"
          style={{width: '240px', marginBottom: '20px'}}
        />

        <div style={{display: 'flex', alignItems: 'center', width: 'calc(100% - 30px)', justifyContent: 'space-between', paddingLeft: '4px', borderLeft: '2px solid #1369C8', height: '14px', marginBottom: '20px'}}>
          <span>督查报告</span>
          <Select
            vModel={this.state.id}
            size="mini"
            placeholder="请选择"
            style={{width: '140px', marginLeft: '20px'}}
          >
            {_.map(this.ids, ({ id, names }) => (
              <Option value={id} label={names} />
            ))}
          </Select>
        </div>

        {this.renderFileList()}
      </div>);
  }
};
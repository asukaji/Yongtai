import {
  Table,
  TableColumn,
  RadioButton,
  RadioGroup,
  Button
} from 'element-ui';
import styles from './index.module.less';

import {
  fetchPropertyDetailsList,
  fetchPropertyDetailsYears,
  fetchPropertyDetailsListByYear
} from '@/api';
import _ from 'lodash';

import { title, ND, LY, GY, GZ, LQ, JT, GL, WT, SK, DY } from './constants';

export default {
  name: 'PropertyDetails',

  data() {
    return {
      years: [],
      year: '',
      value: []
    };
  },

  computed: {
    name() {
      return this.$route.params.name;
    },

    type() {
      return this.$route.params.type;
    }
  },

  watch: {
    type: {
      immediate: true,
      async handler(type) {
        if (type === '1') {
          this.years = await fetchPropertyDetailsYears(this.name);
          this.year = _.first(this.years)?.year;
        } else {
          this.value = await fetchPropertyDetailsList(this.name);
        }
      }
    },

    async year(year) {
      if (!year) {
        return;
      }
      this.value = await fetchPropertyDetailsListByYear(this.name, year);
    }
  },

  methods: {
    renderYears() {
      return (
        <RadioGroup vModel={this.year}>
          {_.map(this.years, ({ year }) => (
            <RadioButton label={year} key={year}>
              {year}
            </RadioButton>
          ))}
        </RadioGroup>
      );
    },

    renderTable(data, name) {
      switch (name) {
        case ND:
          return (
            <Table data={data} border height="640">
              <TableColumn prop="tradingYear" label="年度" />
              <TableColumn prop="tradingDate" label="时间" />
              <TableColumn prop="sysOrgCode" label="项目编号" />
              <TableColumn prop="projectName" label="项目名称" />
              <TableColumn prop="startingPrice" label="挂牌价格（万元）" />
              <TableColumn prop="finalPrice" label="成交金额（万元）" />
              <TableColumn prop="remark" label="备注" />
            </Table>
          );
        case LY:
          return (
            <Table data={data} border height="640">
              <TableColumn prop="tradingYear" label="年度" />
              <TableColumn prop="tradingDate" label="日期" />
              <TableColumn prop="sysOrgCode" label="项目编号" />
              <TableColumn prop="projectName" label="项目名称" />
              <TableColumn prop="startingPrice" label="起始价（万元）" />
              <TableColumn prop="finalPrice" label="成交金额（万元）" />
            </Table>
          );
        case GY:
          return (
            <Table data={data} border height="640">
              <TableColumn prop="tradingYear" label="年度" />
              <TableColumn prop="tradingDate" label="日期" />
              <TableColumn prop="projectName" label="项目名称" />
              <TableColumn prop="address" label="标的界址" />
              <TableColumn prop="purpose" label="规划用途" />
              <TableColumn prop="acreage" label="面积（平方米）" />
              <TableColumn prop="startingPrice" label="起始价（万元）" />
              <TableColumn prop="finalPrice" label="成交金额（万元）" />
              <TableColumn prop="owner" label="竞得人" />
            </Table>
          );
        case GZ:
          return (
            <Table data={data} border height="640">
              <TableColumn prop="tradingYear" label="年度" />
              <TableColumn prop="tradingDate" label="日期" />
              <TableColumn prop="projectName" label="项目名称" />
              <TableColumn prop="startingPrice" label="起拍价（万元）" />
              <TableColumn prop="finalPrice" label="成交金额（万元）" />
              <TableColumn prop="entruster" label="委托方" />
              <TableColumn prop="acreage" label="面积（平方米）" />
              <TableColumn prop="owner" label="竞得人" />
            </Table>
          );
        case LQ:
          return (
            <Table data={data} border height="640">
              <TableColumn prop="tradingYear" label="年度" />
              <TableColumn prop="tradingDate" label="日期" />
              <TableColumn prop="sysOrgCode" label="项目编号" />
              <TableColumn prop="town" label="乡镇" />
              <TableColumn prop="village" label="村" />
              <TableColumn prop="address" label="地名" />
              <TableColumn prop="acreage" label="评估面积（亩）" />
              <TableColumn prop="component" label="树种组成" />
              <TableColumn prop="property" label="林木权属" />
              <TableColumn prop="projectOwner" label="出让方" />
              <TableColumn prop="startingPrice" label="林木公告价（元）" />
              <TableColumn prop="depositPrice" label="林地年使用费（元）" />
              <TableColumn prop="ageLimit" label="林地承包年限（年）" />
            </Table>
          );
        case JT:
          return (
            <Table data={data} border height="640">
              <TableColumn prop="tradingYear" label="年度" />
              <TableColumn prop="tradingDate" label="日期" />
              <TableColumn prop="projectName" label="项目名称" />
              <TableColumn prop="acreage" label="面积（亩）" />
              <TableColumn prop="startingPrice" label="起拍价（万元）" />
              <TableColumn prop="finalPrice" label="成交金额（万元）" />
              <TableColumn prop="entruster" label="委托方" />
              <TableColumn prop="owner" label="竞得人" />
            </Table>
          );
        case GL:
          return (
            <Table data={data} border height="800">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              <TableColumn prop="experiment" label="流转标的物" />
              <TableColumn prop="property" label="标的性质（集体/国有）" />
              <TableColumn prop="owner" label="产权所有人" />
              <TableColumn prop="acreage" label="面积/数量" />
              <TableColumn prop="address" label="地址" />
              <TableColumn prop="certificate" label="是否有证（证书号）" />
              <TableColumn prop="statue" label="是否签署合同" />
              <TableColumn prop="contractPeriod" label="合同期限" />
              <TableColumn prop="price" label="总价格（万元/年）" />
              <TableColumn prop="remark" label="备注" />
            </Table>
          );
        case WT:
          return (
            <Table data={data} border height="800">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              <TableColumn prop="experiment" label="流转标的物" />
              <TableColumn prop="property" label="标的性质（集体/国有）" />
              <TableColumn prop="owner" label="产权所有人" />
              <TableColumn prop="acreage" label="面积/数量" />
              <TableColumn prop="address" label="地址" />
              <TableColumn prop="certificate" label="是否有证（证书号）" />
              <TableColumn prop="statue" label="是否签署合同" />
              <TableColumn prop="contractPeriod" label="合同期限" />
              <TableColumn prop="price" label="总价格（万元/年）" />
              <TableColumn prop="remark" label="备注" />
            </Table>
          );
        case SK:
          return (
            <Table data={data} border height="640">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="villageName" label="村别" />
              <TableColumn prop="experiment" label="资产名称" />
              <TableColumn label="资产类型">
                <TableColumn prop="opas" label="经营性资产" />
                <TableColumn prop="noOpas" label="非经营性资产" />
                <TableColumn prop="idle" label="资源性资产" />
              </TableColumn>
              <TableColumn label="现状">
                <TableColumn prop="used" label="使用" />
                <TableColumn prop="rent" label="出租" />
                <TableColumn prop="resas" label="闲置" />
              </TableColumn>
              <TableColumn prop="acreage" label="面积" />
              <TableColumn prop="contractPeriod" label="合同起止时间" />
              <TableColumn prop="remark" label="备注" />
            </Table>
          );
        case DY:
          return (
            <Table data={data} border height="640">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="villageName" label="村别" />
              <TableColumn prop="experiment" label="资产名称" />
              <TableColumn label="资产类型">
                <TableColumn prop="opas" label="经营性资产" />
                <TableColumn prop="noOpas" label="非经营性资产" />
                <TableColumn prop="idle" label="资源性资产" />
              </TableColumn>
              <TableColumn label="现状">
                <TableColumn prop="used" label="使用" />
                <TableColumn prop="rent" label="出租" />
                <TableColumn prop="resas" label="闲置" />
              </TableColumn>
              <TableColumn prop="acreage" label="面积" />
              <TableColumn prop="contractPeriod" label="合同起止时间" />
              <TableColumn prop="remark" label="备注" />
            </Table>
          );
      }
    }
  },

  render() {
    return (
      <div class={styles.container}>
        <div class={styles.header}>
          <Button
            icon="el-icon-arrow-left"
            style={{
              color: '#fff',
              position: 'absolute',
              left: '12px',
              bottom: '-8px',
              backgroundColor: 'transparent',
              borderWidth: '0 !important'
            }}
            onClick={() => this.$router.go(-1)}
          >
            返回
          </Button>
          <h1>{title[this.name] ?? `${this.name}镇村`}</h1>
          <p>Rural property right transaction</p>
        </div>
        <div class={styles.table}>
          {this.type === '1' && this.renderYears()}

          {!!this.name && this.renderTable(this.value, this.name)}
        </div>
      </div>
    );
  }
};

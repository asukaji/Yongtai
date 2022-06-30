import {
  Table,
  TableColumn,
  RadioButton,
  RadioGroup,
  Button,
  Select,
  Option
} from 'element-ui';
import styles from './index.module.less';

import {
  fetchPropertyDetailsList,
  fetchPropertyDetailsYears,
  fetchPropertyDetailsListByYear
} from '@/api';
import _ from 'lodash';

import {
  title,
  ND,
  LY,
  GY,
  GZ,
  LQ,
  JT,
  GL,
  WT,
  SK,
  DY,
  DANY,
  BY,
  HX,
  PG,
  XB,
  DONGY,
  CQ,
  GAIY,
  FK,
  TA,
  CX,
  FQ,
  ZC,
  CF,
  LL,
  QL,
  TQ,
  LVYZY,
  LYZY,
  GYZC,
  CJTZC,
  NYZY,
  SYSYQ
} from './constants';

export default {
  name: 'PropertyDetails',

  data() {
    return {
      years: [],
      year: '',
      value: [],
      options: [
        {
          value: '旅游资源',
          label: '旅游资源'
        },
        {
          value: '林业资源',
          label: '林业资源'
        },
        {
          value: '农业资源',
          label: '农业资源'
        },
        {
          value: '村集体资产',
          label: '村集体资产'
        },
        {
          value: '水域使用权',
          label: '水域使用权'
        },
        {
          value: '国有资产资源',
          label: '国有资产资源'
        },
        {
          value: '全部',
          label: '全部'
        }
      ],
      optionsTwo: [
        {
          value: '葛岭',
          label: '葛岭镇'
        },
        {
          value: '梧桐',
          label: '梧桐镇'
        },
        {
          value: '嵩口',
          label: '嵩口镇'
        },
        {
          value: '大洋',
          label: '大洋镇'
        },
        {
          value: '丹云',
          label: '丹云乡'
        },
        {
          value: '白云',
          label: '白云乡'
        },
        {
          value: '红星',
          label: '红星乡'
        },
        {
          value: '盘谷',
          label: '盘谷乡'
        },
        {
          value: '霞拔',
          label: '霞拔乡'
        },
        {
          value: '东洋',
          label: '东洋乡'
        },
        {
          value: '长庆',
          label: '长庆镇'
        },
        {
          value: '盖洋',
          label: '盖洋乡'
        },
        {
          value: '洑口',
          label: '洑口乡'
        },
        {
          value: '同安',
          label: '同安镇'
        },
        {
          value: '赤锡',
          label: '赤锡乡'
        },
        {
          value: '富泉',
          label: '富泉乡'
        },
        {
          value: '樟城',
          label: '樟城镇'
        },
        {
          value: '城峰',
          label: '城峰镇'
        },
        {
          value: '岭路',
          label: '岭路乡'
        },
        {
          value: '清凉',
          label: '清凉镇'
        },
        {
          value: '塘前',
          label: '塘前乡'
        }
      ],
      values: '',
      valuesTwo: ''
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
        } else if(type === '3') {
          this.value = await fetchPropertyDetailsList( this.values,this.name, '摸底表');
          this.years = [{ year: '摸底表' }];
          this.year = '摸底表';
        }else { 
          console.log('yyyyy', this.name);
          this.value = await fetchPropertyDetailsList(this.name, this.values, this.year);
          this.years = [{ year: '摸底表' }];
          this.year = '摸底表';
        }
      }
    },

    async year(year) {

      this.values='全部';
      if (!year) {
        return;
      }

      if(!isNaN(year)){
        this.value = await fetchPropertyDetailsListByYear(this.name, year);
      }else{
        if(this.type === '3') {
          this.value = await fetchPropertyDetailsList('',this.name, year );
        } else {
          this.value = await fetchPropertyDetailsList(this.name, this.values, year );
        }
      
      }
    }
  },

  methods: {
    renderYears() {
      return (
        <RadioGroup vModel={this.year} style={{whiteSpace: 'nowrap', overflowY: 'scroll'}}>
          {_.map(this.years, ({ year }) => (
            <RadioButton label={year} key={year}>
              {year}
            </RadioButton>
          ))}
        </RadioGroup>
      );
    },

    async onChange() {
      console.log('aaaa', this.values);
      if(this.values === '全部'){
        this.value = await fetchPropertyDetailsList(this.valuesTwo, this.values, this.year);
      } else {
        this.value = await fetchPropertyDetailsList(
          this.valuesTwo,
          this.values,
          this.year
        );
      }
    },

    async onChangeTwo() {
      // console.log('cccc', this.valuesTwo);
      window.location.href = `#/property/details/${this.valuesTwo}/2`;
      this.value = await fetchPropertyDetailsList(this.valuesTwo, this.values, this.year);
    },

    renderSelect() {
      return (
        <Select placeholder="请选择项目分类" vModel={this.values} size="mini" onChange={this.onChange.bind(this)}>
          {this.options.map(({ value, label }) => (
            <Option value={value} label={label} />
          ))}
        </Select>
      );
    },

    renderSelectTwo() {
      return (
        <Select placeholder="请选择乡镇" vModel={this.valuesTwo} size="mini" onChange={this.onChangeTwo.bind(this)}>
          {this.optionsTwo.map(({ value, label }) => (
            <Option value={value} label={label} />
          ))}
        </Select>
      );
    },

    renderTable(data, name) {
      switch (name) {
        case ND:
          return (
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
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
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
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
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
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
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
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
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
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
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
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
              {/* <TableColumn type="index" label="序号" />
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
              <TableColumn prop="remark" label="备注" /> */}
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              {this.year === '流转记录' && <TableColumn prop="experiment" label="流入主体/个体名称" />}
              {this.year === '摸底表' && <TableColumn prop="experiment" label="资产名称" />}
              {this.year === '流转记录' && <TableColumn prop="acreage" label="流转规模/数量" />}
              {this.year === '摸底表' && <TableColumn prop="acreage" label="面积/数量" />}
              {this.year === '摸底表' && <TableColumn prop="address" label="地址" />}
              {this.year === '流转记录' && <TableColumn prop="used" label="流转用途" />}
              {this.year === '流转记录' && <TableColumn prop="property" label="性质（耕地、林地等）" />}
              {this.year === '摸底表' && <TableColumn prop="property" label="资产性质（集体/国有）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanPrice" label="流转租金（元/亩）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanYear" label="流转年限（年）" />}
              {this.year === '流转记录' && <TableColumn prop="price" label="总价格" />}
              {this.year === '流转记录' && <TableColumn prop="contractPeriod" label="合同签订时间" />}
              {this.year === '流转记录' && <TableColumn prop="beian" label="是否乡镇备案" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="流入方联系人（名字/电话）" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="产权所有人" />}
              {this.year === '摸底表' && <TableColumn prop="certificate" label="是否有证（证书号）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="状态（空闲/在租）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="是否签署合同" />}
              {this.year === '摸底表' && <TableColumn prop="contractPeriod" label="合同期限" />}
              {this.year === '摸底表' && <TableColumn prop="price" label="资产原值（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="rentPrice" label="租金（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="shourang" label="受让方信息（含电话）" />}
              {this.year === '摸底表' && <TableColumn prop="remark" label="备注" />}
              {/* <TableColumn prop="address" label="地址" /> */}
              {/* <TableColumn prop="certificate" label="是否有证（证书号）" /> */}
              {/* <TableColumn prop="statue" label="状态（空闲/在租）" /> */}
              {/* <TableColumn prop="signContract" label="是否签署合同" /> */}
              {/* <TableColumn prop="contractPeriod" label="合同期限" /> */}
            </Table>
          );
        case WT:
          return (
            <Table data={data} border height="800">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              {this.year === '流转记录' && <TableColumn prop="experiment" label="流入主体/个体名称" />}
              {this.year === '摸底表' && <TableColumn prop="experiment" label="资产名称" />}
              {this.year === '流转记录' && <TableColumn prop="acreage" label="流转规模/数量" />}
              {this.year === '摸底表' && <TableColumn prop="acreage" label="面积/数量" />}
              {this.year === '摸底表' && <TableColumn prop="address" label="地址" />}
              {this.year === '流转记录' && <TableColumn prop="used" label="流转用途" />}
              {this.year === '流转记录' && <TableColumn prop="property" label="性质（耕地、林地等）" />}
              {this.year === '摸底表' && <TableColumn prop="property" label="资产性质（集体/国有）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanPrice" label="流转租金（元/亩）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanYear" label="流转年限（年）" />}
              {this.year === '流转记录' && <TableColumn prop="price" label="总价格" />}
              {this.year === '流转记录' && <TableColumn prop="contractPeriod" label="合同签订时间" />}
              {this.year === '流转记录' && <TableColumn prop="beian" label="是否乡镇备案" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="流入方联系人（名字/电话）" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="产权所有人" />}
              {this.year === '摸底表' && <TableColumn prop="certificate" label="是否有证（证书号）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="状态（空闲/在租）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="是否签署合同" />}
              {this.year === '摸底表' && <TableColumn prop="contractPeriod" label="合同期限" />}
              {this.year === '摸底表' && <TableColumn prop="price" label="资产原值（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="rentPrice" label="租金（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="shourang" label="受让方信息（含电话）" />}
              {this.year === '摸底表' && <TableColumn prop="remark" label="备注" />}
              {/* <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              {this.year === '流转记录' && <TableColumn prop="experiment" label="流入主体/个体名称" />}
              {this.year === '摸底表' && <TableColumn prop="experiment" label="资产名称" />}
              {this.year === '流转记录' && <TableColumn prop="acreage" label="流转规模/数量" />}
              {this.year === '摸底表' && <TableColumn prop="acreage" label="面积/数量" />}
              {this.year === '摸底表' && <TableColumn prop="address" label="地址" />}
              {this.year === '流转记录' && <TableColumn prop="used" label="流转用途" />}
              {this.year === '流转记录' && <TableColumn prop="property" label="性质（耕地、林地等）" />}
              {this.year === '摸底表' && <TableColumn prop="property" label="资产性质（集体/国有）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanPrice" label="流转租金（元/亩）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanYear" label="流转年限（年）" />}
              {this.year === '流转记录' && <TableColumn prop="price" label="总价格" />}
              {this.year === '流转记录' && <TableColumn prop="contractPeriod" label="合同签订时间" />}
              {this.year === '流转记录' && <TableColumn prop="beian" label="是否乡镇备案" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="流入方联系人（名字/电话）" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="产权所有人" />}
              {this.year === '摸底表' && <TableColumn prop="certificate" label="是否有证（证书号）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="状态（空闲/在租）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="是否签署合同" />}
              {this.year === '摸底表' && <TableColumn prop="contractPeriod" label="合同期限" />}
              {this.year === '摸底表' && <TableColumn prop="price" label="资产原值（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="rentPrice" label="租金（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="shourang" label="受让方信息（含电话）" />}
              {this.year === '摸底表' && <TableColumn prop="remark" label="备注" />} */}
              {/* <TableColumn prop="price" label="总价格（万元/年）" /> */}
              {/* <TableColumn prop="remark" label="备注" /> */}
            </Table>
          );
        case SK:
          return (
            <Table data={data} border height="600">
              {/* <TableColumn type="index" label="序号" />
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
              <TableColumn prop="remark" label="备注" /> */}
              {/* <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              <TableColumn prop="experiment" label="资产名称" />
              <TableColumn prop="used" label="流转用途" />
              <TableColumn prop="property" label="资产性质（集体/国有）" />
              <TableColumn prop="owner" label="产权所有人" />
              <TableColumn prop="acreage" label="面积/数量" />
              <TableColumn prop="address" label="地址" />
              <TableColumn prop="certificate" label="是否有证（证书号）" />
              <TableColumn prop="statue" label="状态（空闲/在租）" />
              <TableColumn prop="signContract" label="是否签署合同" />
              <TableColumn prop="contractPeriod" label="合同期限" /> */}
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              {this.year === '流转记录' && <TableColumn prop="experiment" label="流入主体/个体名称" />}
              {this.year === '摸底表' && <TableColumn prop="experiment" label="资产名称" />}
              {this.year === '流转记录' && <TableColumn prop="acreage" label="流转规模/数量" />}
              {this.year === '摸底表' && <TableColumn prop="acreage" label="面积/数量" />}
              {this.year === '摸底表' && <TableColumn prop="address" label="地址" />}
              {this.year === '流转记录' && <TableColumn prop="used" label="流转用途" />}
              {this.year === '流转记录' && <TableColumn prop="property" label="性质（耕地、林地等）" />}
              {this.year === '摸底表' && <TableColumn prop="property" label="资产性质（集体/国有）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanPrice" label="流转租金（元/亩）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanYear" label="流转年限（年）" />}
              {this.year === '流转记录' && <TableColumn prop="price" label="总价格" />}
              {this.year === '流转记录' && <TableColumn prop="contractPeriod" label="合同签订时间" />}
              {this.year === '流转记录' && <TableColumn prop="beian" label="是否乡镇备案" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="流入方联系人（名字/电话）" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="产权所有人" />}
              {this.year === '摸底表' && <TableColumn prop="certificate" label="是否有证（证书号）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="状态（空闲/在租）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="是否签署合同" />}
              {this.year === '摸底表' && <TableColumn prop="contractPeriod" label="合同期限" />}
              {this.year === '摸底表' && <TableColumn prop="price" label="资产原值（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="rentPrice" label="租金（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="shourang" label="受让方信息（含电话）" />}
              {this.year === '摸底表' && <TableColumn prop="remark" label="备注" />}
            </Table>
          );
        case DY:
          return (
            <Table data={data} border height="600">
              {/* <TableColumn type="index" label="序号" />
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
              <TableColumn prop="remark" label="备注" /> */}
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              {this.year === '流转记录' && <TableColumn prop="experiment" label="流入主体/个体名称" />}
              {this.year === '摸底表' && <TableColumn prop="experiment" label="资产名称" />}
              {this.year === '流转记录' && <TableColumn prop="acreage" label="流转规模/数量" />}
              {this.year === '摸底表' && <TableColumn prop="acreage" label="面积/数量" />}
              {this.year === '摸底表' && <TableColumn prop="address" label="地址" />}
              {this.year === '流转记录' && <TableColumn prop="used" label="流转用途" />}
              {this.year === '流转记录' && <TableColumn prop="property" label="性质（耕地、林地等）" />}
              {this.year === '摸底表' && <TableColumn prop="property" label="资产性质（集体/国有）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanPrice" label="流转租金（元/亩）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanYear" label="流转年限（年）" />}
              {this.year === '流转记录' && <TableColumn prop="price" label="总价格" />}
              {this.year === '流转记录' && <TableColumn prop="contractPeriod" label="合同签订时间" />}
              {this.year === '流转记录' && <TableColumn prop="beian" label="是否乡镇备案" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="流入方联系人（名字/电话）" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="产权所有人" />}
              {this.year === '摸底表' && <TableColumn prop="certificate" label="是否有证（证书号）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="状态（空闲/在租）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="是否签署合同" />}
              {this.year === '摸底表' && <TableColumn prop="contractPeriod" label="合同期限" />}
              {this.year === '摸底表' && <TableColumn prop="price" label="资产原值（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="rentPrice" label="租金（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="shourang" label="受让方信息（含电话）" />}
              {this.year === '摸底表' && <TableColumn prop="remark" label="备注" />}
            </Table>
          );

        case DANY:
          return (
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              {this.year === '流转记录' && <TableColumn prop="experiment" label="流入主体/个体名称" />}
              {this.year === '摸底表' && <TableColumn prop="experiment" label="资产名称" />}
              {this.year === '流转记录' && <TableColumn prop="acreage" label="流转规模/数量" />}
              {this.year === '摸底表' && <TableColumn prop="acreage" label="面积/数量" />}
              {this.year === '摸底表' && <TableColumn prop="address" label="地址" />}
              {this.year === '流转记录' && <TableColumn prop="used" label="流转用途" />}
              {this.year === '流转记录' && <TableColumn prop="property" label="性质（耕地、林地等）" />}
              {this.year === '摸底表' && <TableColumn prop="property" label="资产性质（集体/国有）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanPrice" label="流转租金（元/亩）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanYear" label="流转年限（年）" />}
              {this.year === '流转记录' && <TableColumn prop="price" label="总价格" />}
              {this.year === '流转记录' && <TableColumn prop="contractPeriod" label="合同签订时间" />}
              {this.year === '流转记录' && <TableColumn prop="beian" label="是否乡镇备案" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="流入方联系人（名字/电话）" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="产权所有人" />}
              {this.year === '摸底表' && <TableColumn prop="certificate" label="是否有证（证书号）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="状态（空闲/在租）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="是否签署合同" />}
              {this.year === '摸底表' && <TableColumn prop="contractPeriod" label="合同期限" />}
              {this.year === '摸底表' && <TableColumn prop="price" label="资产原值（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="rentPrice" label="租金（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="shourang" label="受让方信息（含电话）" />}
              {this.year === '摸底表' && <TableColumn prop="remark" label="备注" />}
            </Table>
          );
        case BY:
          return (
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              {this.year === '流转记录' && <TableColumn prop="experiment" label="流入主体/个体名称" />}
              {this.year === '摸底表' && <TableColumn prop="experiment" label="资产名称" />}
              {this.year === '流转记录' && <TableColumn prop="acreage" label="流转规模/数量" />}
              {this.year === '摸底表' && <TableColumn prop="acreage" label="面积/数量" />}
              {this.year === '摸底表' && <TableColumn prop="address" label="地址" />}
              {this.year === '流转记录' && <TableColumn prop="used" label="流转用途" />}
              {this.year === '流转记录' && <TableColumn prop="property" label="性质（耕地、林地等）" />}
              {this.year === '摸底表' && <TableColumn prop="property" label="资产性质（集体/国有）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanPrice" label="流转租金（元/亩）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanYear" label="流转年限（年）" />}
              {this.year === '流转记录' && <TableColumn prop="price" label="总价格" />}
              {this.year === '流转记录' && <TableColumn prop="contractPeriod" label="合同签订时间" />}
              {this.year === '流转记录' && <TableColumn prop="beian" label="是否乡镇备案" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="流入方联系人（名字/电话）" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="产权所有人" />}
              {this.year === '摸底表' && <TableColumn prop="certificate" label="是否有证（证书号）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="状态（空闲/在租）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="是否签署合同" />}
              {this.year === '摸底表' && <TableColumn prop="contractPeriod" label="合同期限" />}
              {this.year === '摸底表' && <TableColumn prop="price" label="资产原值（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="rentPrice" label="租金（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="shourang" label="受让方信息（含电话）" />}
              {this.year === '摸底表' && <TableColumn prop="remark" label="备注" />}
            </Table>
          );
        case HX:
          return (
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              {this.year === '流转记录' && <TableColumn prop="experiment" label="流入主体/个体名称" />}
              {this.year === '摸底表' && <TableColumn prop="experiment" label="资产名称" />}
              {this.year === '流转记录' && <TableColumn prop="acreage" label="流转规模/数量" />}
              {this.year === '摸底表' && <TableColumn prop="acreage" label="面积/数量" />}
              {this.year === '摸底表' && <TableColumn prop="address" label="地址" />}
              {this.year === '流转记录' && <TableColumn prop="used" label="流转用途" />}
              {this.year === '流转记录' && <TableColumn prop="property" label="性质（耕地、林地等）" />}
              {this.year === '摸底表' && <TableColumn prop="property" label="资产性质（集体/国有）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanPrice" label="流转租金（元/亩）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanYear" label="流转年限（年）" />}
              {this.year === '流转记录' && <TableColumn prop="price" label="总价格" />}
              {this.year === '流转记录' && <TableColumn prop="contractPeriod" label="合同签订时间" />}
              {this.year === '流转记录' && <TableColumn prop="beian" label="是否乡镇备案" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="流入方联系人（名字/电话）" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="产权所有人" />}
              {this.year === '摸底表' && <TableColumn prop="certificate" label="是否有证（证书号）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="状态（空闲/在租）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="是否签署合同" />}
              {this.year === '摸底表' && <TableColumn prop="contractPeriod" label="合同期限" />}
              {this.year === '摸底表' && <TableColumn prop="price" label="资产原值（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="rentPrice" label="租金（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="shourang" label="受让方信息（含电话）" />}
              {this.year === '摸底表' && <TableColumn prop="remark" label="备注" />}
            </Table>
          );
        case PG:
          return (
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              {this.year === '流转记录' && <TableColumn prop="experiment" label="流入主体/个体名称" />}
              {this.year === '摸底表' && <TableColumn prop="experiment" label="资产名称" />}
              {this.year === '流转记录' && <TableColumn prop="acreage" label="流转规模/数量" />}
              {this.year === '摸底表' && <TableColumn prop="acreage" label="面积/数量" />}
              {this.year === '摸底表' && <TableColumn prop="address" label="地址" />}
              {this.year === '流转记录' && <TableColumn prop="used" label="流转用途" />}
              {this.year === '流转记录' && <TableColumn prop="property" label="性质（耕地、林地等）" />}
              {this.year === '摸底表' && <TableColumn prop="property" label="资产性质（集体/国有）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanPrice" label="流转租金（元/亩）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanYear" label="流转年限（年）" />}
              {this.year === '流转记录' && <TableColumn prop="price" label="总价格" />}
              {this.year === '流转记录' && <TableColumn prop="contractPeriod" label="合同签订时间" />}
              {this.year === '流转记录' && <TableColumn prop="beian" label="是否乡镇备案" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="流入方联系人（名字/电话）" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="产权所有人" />}
              {this.year === '摸底表' && <TableColumn prop="certificate" label="是否有证（证书号）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="状态（空闲/在租）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="是否签署合同" />}
              {this.year === '摸底表' && <TableColumn prop="contractPeriod" label="合同期限" />}
              {this.year === '摸底表' && <TableColumn prop="price" label="资产原值（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="rentPrice" label="租金（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="shourang" label="受让方信息（含电话）" />}
              {this.year === '摸底表' && <TableColumn prop="remark" label="备注" />}
            </Table>
          );

        case XB:
          return (
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              {this.year === '流转记录' && <TableColumn prop="experiment" label="流入主体/个体名称" />}
              {this.year === '摸底表' && <TableColumn prop="experiment" label="资产名称" />}
              {this.year === '流转记录' && <TableColumn prop="acreage" label="流转规模/数量" />}
              {this.year === '摸底表' && <TableColumn prop="acreage" label="面积/数量" />}
              {this.year === '摸底表' && <TableColumn prop="address" label="地址" />}
              {this.year === '流转记录' && <TableColumn prop="used" label="流转用途" />}
              {this.year === '流转记录' && <TableColumn prop="property" label="性质（耕地、林地等）" />}
              {this.year === '摸底表' && <TableColumn prop="property" label="资产性质（集体/国有）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanPrice" label="流转租金（元/亩）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanYear" label="流转年限（年）" />}
              {this.year === '流转记录' && <TableColumn prop="price" label="总价格" />}
              {this.year === '流转记录' && <TableColumn prop="contractPeriod" label="合同签订时间" />}
              {this.year === '流转记录' && <TableColumn prop="beian" label="是否乡镇备案" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="流入方联系人（名字/电话）" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="产权所有人" />}
              {this.year === '摸底表' && <TableColumn prop="certificate" label="是否有证（证书号）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="状态（空闲/在租）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="是否签署合同" />}
              {this.year === '摸底表' && <TableColumn prop="contractPeriod" label="合同期限" />}
              {this.year === '摸底表' && <TableColumn prop="price" label="资产原值（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="rentPrice" label="租金（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="shourang" label="受让方信息（含电话）" />}
              {this.year === '摸底表' && <TableColumn prop="remark" label="备注" />}
            </Table>
          );

        case DONGY:
          return (
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              {this.year === '流转记录' && <TableColumn prop="experiment" label="流入主体/个体名称" />}
              {this.year === '摸底表' && <TableColumn prop="experiment" label="资产名称" />}
              {this.year === '流转记录' && <TableColumn prop="acreage" label="流转规模/数量" />}
              {this.year === '摸底表' && <TableColumn prop="acreage" label="面积/数量" />}
              {this.year === '摸底表' && <TableColumn prop="address" label="地址" />}
              {this.year === '流转记录' && <TableColumn prop="used" label="流转用途" />}
              {this.year === '流转记录' && <TableColumn prop="property" label="性质（耕地、林地等）" />}
              {this.year === '摸底表' && <TableColumn prop="property" label="资产性质（集体/国有）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanPrice" label="流转租金（元/亩）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanYear" label="流转年限（年）" />}
              {this.year === '流转记录' && <TableColumn prop="price" label="总价格" />}
              {this.year === '流转记录' && <TableColumn prop="contractPeriod" label="合同签订时间" />}
              {this.year === '流转记录' && <TableColumn prop="beian" label="是否乡镇备案" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="流入方联系人（名字/电话）" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="产权所有人" />}
              {this.year === '摸底表' && <TableColumn prop="certificate" label="是否有证（证书号）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="状态（空闲/在租）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="是否签署合同" />}
              {this.year === '摸底表' && <TableColumn prop="contractPeriod" label="合同期限" />}
              {this.year === '摸底表' && <TableColumn prop="price" label="资产原值（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="rentPrice" label="租金（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="shourang" label="受让方信息（含电话）" />}
              {this.year === '摸底表' && <TableColumn prop="remark" label="备注" />}
            </Table>
          );
        case CQ:
          return (
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              {this.year === '流转记录' && <TableColumn prop="experiment" label="流入主体/个体名称" />}
              {this.year === '摸底表' && <TableColumn prop="experiment" label="资产名称" />}
              {this.year === '流转记录' && <TableColumn prop="acreage" label="流转规模/数量" />}
              {this.year === '摸底表' && <TableColumn prop="acreage" label="面积/数量" />}
              {this.year === '摸底表' && <TableColumn prop="address" label="地址" />}
              {this.year === '流转记录' && <TableColumn prop="used" label="流转用途" />}
              {this.year === '流转记录' && <TableColumn prop="property" label="性质（耕地、林地等）" />}
              {this.year === '摸底表' && <TableColumn prop="property" label="资产性质（集体/国有）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanPrice" label="流转租金（元/亩）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanYear" label="流转年限（年）" />}
              {this.year === '流转记录' && <TableColumn prop="price" label="总价格" />}
              {this.year === '流转记录' && <TableColumn prop="contractPeriod" label="合同签订时间" />}
              {this.year === '流转记录' && <TableColumn prop="beian" label="是否乡镇备案" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="流入方联系人（名字/电话）" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="产权所有人" />}
              {this.year === '摸底表' && <TableColumn prop="certificate" label="是否有证（证书号）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="状态（空闲/在租）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="是否签署合同" />}
              {this.year === '摸底表' && <TableColumn prop="contractPeriod" label="合同期限" />}
              {this.year === '摸底表' && <TableColumn prop="price" label="资产原值（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="rentPrice" label="租金（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="shourang" label="受让方信息（含电话）" />}
              {this.year === '摸底表' && <TableColumn prop="remark" label="备注" />}
            </Table>
          );
        case GAIY:
          return (
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              {this.year === '流转记录' && <TableColumn prop="experiment" label="流入主体/个体名称" />}
              {this.year === '摸底表' && <TableColumn prop="experiment" label="资产名称" />}
              {this.year === '流转记录' && <TableColumn prop="acreage" label="流转规模/数量" />}
              {this.year === '摸底表' && <TableColumn prop="acreage" label="面积/数量" />}
              {this.year === '摸底表' && <TableColumn prop="address" label="地址" />}
              {this.year === '流转记录' && <TableColumn prop="used" label="流转用途" />}
              {this.year === '流转记录' && <TableColumn prop="property" label="性质（耕地、林地等）" />}
              {this.year === '摸底表' && <TableColumn prop="property" label="资产性质（集体/国有）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanPrice" label="流转租金（元/亩）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanYear" label="流转年限（年）" />}
              {this.year === '流转记录' && <TableColumn prop="price" label="总价格" />}
              {this.year === '流转记录' && <TableColumn prop="contractPeriod" label="合同签订时间" />}
              {this.year === '流转记录' && <TableColumn prop="beian" label="是否乡镇备案" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="流入方联系人（名字/电话）" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="产权所有人" />}
              {this.year === '摸底表' && <TableColumn prop="certificate" label="是否有证（证书号）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="状态（空闲/在租）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="是否签署合同" />}
              {this.year === '摸底表' && <TableColumn prop="contractPeriod" label="合同期限" />}
              {this.year === '摸底表' && <TableColumn prop="price" label="资产原值（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="rentPrice" label="租金（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="shourang" label="受让方信息（含电话）" />}
              {this.year === '摸底表' && <TableColumn prop="remark" label="备注" />}
            </Table>
          );

        case FK:
          return (
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              {this.year === '流转记录' && <TableColumn prop="experiment" label="流入主体/个体名称" />}
              {this.year === '摸底表' && <TableColumn prop="experiment" label="资产名称" />}
              {this.year === '流转记录' && <TableColumn prop="acreage" label="流转规模/数量" />}
              {this.year === '摸底表' && <TableColumn prop="acreage" label="面积/数量" />}
              {this.year === '摸底表' && <TableColumn prop="address" label="地址" />}
              {this.year === '流转记录' && <TableColumn prop="used" label="流转用途" />}
              {this.year === '流转记录' && <TableColumn prop="property" label="性质（耕地、林地等）" />}
              {this.year === '摸底表' && <TableColumn prop="property" label="资产性质（集体/国有）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanPrice" label="流转租金（元/亩）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanYear" label="流转年限（年）" />}
              {this.year === '流转记录' && <TableColumn prop="price" label="总价格" />}
              {this.year === '流转记录' && <TableColumn prop="contractPeriod" label="合同签订时间" />}
              {this.year === '流转记录' && <TableColumn prop="beian" label="是否乡镇备案" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="流入方联系人（名字/电话）" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="产权所有人" />}
              {this.year === '摸底表' && <TableColumn prop="certificate" label="是否有证（证书号）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="状态（空闲/在租）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="是否签署合同" />}
              {this.year === '摸底表' && <TableColumn prop="contractPeriod" label="合同期限" />}
              {this.year === '摸底表' && <TableColumn prop="price" label="资产原值（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="rentPrice" label="租金（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="shourang" label="受让方信息（含电话）" />}
              {this.year === '摸底表' && <TableColumn prop="remark" label="备注" />}
            </Table>
          );
        case TA:
          return (
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              {this.year === '流转记录' && <TableColumn prop="experiment" label="流入主体/个体名称" />}
              {this.year === '摸底表' && <TableColumn prop="experiment" label="资产名称" />}
              {this.year === '流转记录' && <TableColumn prop="acreage" label="流转规模/数量" />}
              {this.year === '摸底表' && <TableColumn prop="acreage" label="面积/数量" />}
              {this.year === '摸底表' && <TableColumn prop="address" label="地址" />}
              {this.year === '流转记录' && <TableColumn prop="used" label="流转用途" />}
              {this.year === '流转记录' && <TableColumn prop="property" label="性质（耕地、林地等）" />}
              {this.year === '摸底表' && <TableColumn prop="property" label="资产性质（集体/国有）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanPrice" label="流转租金（元/亩）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanYear" label="流转年限（年）" />}
              {this.year === '流转记录' && <TableColumn prop="price" label="总价格" />}
              {this.year === '流转记录' && <TableColumn prop="contractPeriod" label="合同签订时间" />}
              {this.year === '流转记录' && <TableColumn prop="beian" label="是否乡镇备案" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="流入方联系人（名字/电话）" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="产权所有人" />}
              {this.year === '摸底表' && <TableColumn prop="certificate" label="是否有证（证书号）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="状态（空闲/在租）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="是否签署合同" />}
              {this.year === '摸底表' && <TableColumn prop="contractPeriod" label="合同期限" />}
              {this.year === '摸底表' && <TableColumn prop="price" label="资产原值（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="rentPrice" label="租金（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="shourang" label="受让方信息（含电话）" />}
              {this.year === '摸底表' && <TableColumn prop="remark" label="备注" />}
            </Table>
          );
        case CX:
          return (
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              {this.year === '流转记录' && <TableColumn prop="experiment" label="流入主体/个体名称" />}
              {this.year === '摸底表' && <TableColumn prop="experiment" label="资产名称" />}
              {this.year === '流转记录' && <TableColumn prop="acreage" label="流转规模/数量" />}
              {this.year === '摸底表' && <TableColumn prop="acreage" label="面积/数量" />}
              {this.year === '摸底表' && <TableColumn prop="address" label="地址" />}
              {this.year === '流转记录' && <TableColumn prop="used" label="流转用途" />}
              {this.year === '流转记录' && <TableColumn prop="property" label="性质（耕地、林地等）" />}
              {this.year === '摸底表' && <TableColumn prop="property" label="资产性质（集体/国有）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanPrice" label="流转租金（元/亩）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanYear" label="流转年限（年）" />}
              {this.year === '流转记录' && <TableColumn prop="price" label="总价格" />}
              {this.year === '流转记录' && <TableColumn prop="contractPeriod" label="合同签订时间" />}
              {this.year === '流转记录' && <TableColumn prop="beian" label="是否乡镇备案" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="流入方联系人（名字/电话）" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="产权所有人" />}
              {this.year === '摸底表' && <TableColumn prop="certificate" label="是否有证（证书号）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="状态（空闲/在租）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="是否签署合同" />}
              {this.year === '摸底表' && <TableColumn prop="contractPeriod" label="合同期限" />}
              {this.year === '摸底表' && <TableColumn prop="price" label="资产原值（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="rentPrice" label="租金（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="shourang" label="受让方信息（含电话）" />}
              {this.year === '摸底表' && <TableColumn prop="remark" label="备注" />}
            </Table>
          );
        case FQ:
          return (
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              {this.year === '流转记录' && <TableColumn prop="experiment" label="流入主体/个体名称" />}
              {this.year === '摸底表' && <TableColumn prop="experiment" label="资产名称" />}
              {this.year === '流转记录' && <TableColumn prop="acreage" label="流转规模/数量" />}
              {this.year === '摸底表' && <TableColumn prop="acreage" label="面积/数量" />}
              {this.year === '摸底表' && <TableColumn prop="address" label="地址" />}
              {this.year === '流转记录' && <TableColumn prop="used" label="流转用途" />}
              {this.year === '流转记录' && <TableColumn prop="property" label="性质（耕地、林地等）" />}
              {this.year === '摸底表' && <TableColumn prop="property" label="资产性质（集体/国有）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanPrice" label="流转租金（元/亩）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanYear" label="流转年限（年）" />}
              {this.year === '流转记录' && <TableColumn prop="price" label="总价格" />}
              {this.year === '流转记录' && <TableColumn prop="contractPeriod" label="合同签订时间" />}
              {this.year === '流转记录' && <TableColumn prop="beian" label="是否乡镇备案" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="流入方联系人（名字/电话）" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="产权所有人" />}
              {this.year === '摸底表' && <TableColumn prop="certificate" label="是否有证（证书号）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="状态（空闲/在租）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="是否签署合同" />}
              {this.year === '摸底表' && <TableColumn prop="contractPeriod" label="合同期限" />}
              {this.year === '摸底表' && <TableColumn prop="price" label="资产原值（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="rentPrice" label="租金（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="shourang" label="受让方信息（含电话）" />}
              {this.year === '摸底表' && <TableColumn prop="remark" label="备注" />}
            </Table>
          );
        case ZC:
          return (
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              {this.year === '流转记录' && <TableColumn prop="experiment" label="流入主体/个体名称" />}
              {this.year === '摸底表' && <TableColumn prop="experiment" label="资产名称" />}
              {this.year === '流转记录' && <TableColumn prop="acreage" label="流转规模/数量" />}
              {this.year === '摸底表' && <TableColumn prop="acreage" label="面积/数量" />}
              {this.year === '摸底表' && <TableColumn prop="address" label="地址" />}
              {this.year === '流转记录' && <TableColumn prop="used" label="流转用途" />}
              {this.year === '流转记录' && <TableColumn prop="property" label="性质（耕地、林地等）" />}
              {this.year === '摸底表' && <TableColumn prop="property" label="资产性质（集体/国有）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanPrice" label="流转租金（元/亩）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanYear" label="流转年限（年）" />}
              {this.year === '流转记录' && <TableColumn prop="price" label="总价格" />}
              {this.year === '流转记录' && <TableColumn prop="contractPeriod" label="合同签订时间" />}
              {this.year === '流转记录' && <TableColumn prop="beian" label="是否乡镇备案" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="流入方联系人（名字/电话）" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="产权所有人" />}
              {this.year === '摸底表' && <TableColumn prop="certificate" label="是否有证（证书号）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="状态（空闲/在租）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="是否签署合同" />}
              {this.year === '摸底表' && <TableColumn prop="contractPeriod" label="合同期限" />}
              {this.year === '摸底表' && <TableColumn prop="price" label="资产原值（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="rentPrice" label="租金（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="shourang" label="受让方信息（含电话）" />}
              {this.year === '摸底表' && <TableColumn prop="remark" label="备注" />}
            </Table>
          );
        case CF:
          return (
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              {this.year === '流转记录' && <TableColumn prop="experiment" label="流入主体/个体名称" />}
              {this.year === '摸底表' && <TableColumn prop="experiment" label="资产名称" />}
              {this.year === '流转记录' && <TableColumn prop="acreage" label="流转规模/数量" />}
              {this.year === '摸底表' && <TableColumn prop="acreage" label="面积/数量" />}
              {this.year === '摸底表' && <TableColumn prop="address" label="地址" />}
              {this.year === '流转记录' && <TableColumn prop="used" label="流转用途" />}
              {this.year === '流转记录' && <TableColumn prop="property" label="性质（耕地、林地等）" />}
              {this.year === '摸底表' && <TableColumn prop="property" label="资产性质（集体/国有）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanPrice" label="流转租金（元/亩）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanYear" label="流转年限（年）" />}
              {this.year === '流转记录' && <TableColumn prop="price" label="总价格" />}
              {this.year === '流转记录' && <TableColumn prop="contractPeriod" label="合同签订时间" />}
              {this.year === '流转记录' && <TableColumn prop="beian" label="是否乡镇备案" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="流入方联系人（名字/电话）" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="产权所有人" />}
              {this.year === '摸底表' && <TableColumn prop="certificate" label="是否有证（证书号）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="状态（空闲/在租）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="是否签署合同" />}
              {this.year === '摸底表' && <TableColumn prop="contractPeriod" label="合同期限" />}
              {this.year === '摸底表' && <TableColumn prop="price" label="资产原值（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="rentPrice" label="租金（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="shourang" label="受让方信息（含电话）" />}
              {this.year === '摸底表' && <TableColumn prop="remark" label="备注" />}
            </Table>
          );
        case LL:
          return (
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              {this.year === '流转记录' && <TableColumn prop="experiment" label="流入主体/个体名称" />}
              {this.year === '摸底表' && <TableColumn prop="experiment" label="资产名称" />}
              {this.year === '流转记录' && <TableColumn prop="acreage" label="流转规模/数量" />}
              {this.year === '摸底表' && <TableColumn prop="acreage" label="面积/数量" />}
              {this.year === '摸底表' && <TableColumn prop="address" label="地址" />}
              {this.year === '流转记录' && <TableColumn prop="used" label="流转用途" />}
              {this.year === '流转记录' && <TableColumn prop="property" label="性质（耕地、林地等）" />}
              {this.year === '摸底表' && <TableColumn prop="property" label="资产性质（集体/国有）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanPrice" label="流转租金（元/亩）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanYear" label="流转年限（年）" />}
              {this.year === '流转记录' && <TableColumn prop="price" label="总价格" />}
              {this.year === '流转记录' && <TableColumn prop="contractPeriod" label="合同签订时间" />}
              {this.year === '流转记录' && <TableColumn prop="beian" label="是否乡镇备案" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="流入方联系人（名字/电话）" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="产权所有人" />}
              {this.year === '摸底表' && <TableColumn prop="certificate" label="是否有证（证书号）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="状态（空闲/在租）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="是否签署合同" />}
              {this.year === '摸底表' && <TableColumn prop="contractPeriod" label="合同期限" />}
              {this.year === '摸底表' && <TableColumn prop="price" label="资产原值（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="rentPrice" label="租金（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="shourang" label="受让方信息（含电话）" />}
              {this.year === '摸底表' && <TableColumn prop="remark" label="备注" />}
            </Table>
          );
        case QL:
          return (
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              {this.year === '流转记录' && <TableColumn prop="experiment" label="流入主体/个体名称" />}
              {this.year === '摸底表' && <TableColumn prop="experiment" label="资产名称" />}
              {this.year === '流转记录' && <TableColumn prop="acreage" label="流转规模/数量" />}
              {this.year === '摸底表' && <TableColumn prop="acreage" label="面积/数量" />}
              {this.year === '摸底表' && <TableColumn prop="address" label="地址" />}
              {this.year === '流转记录' && <TableColumn prop="used" label="流转用途" />}
              {this.year === '流转记录' && <TableColumn prop="property" label="性质（耕地、林地等）" />}
              {this.year === '摸底表' && <TableColumn prop="property" label="资产性质（集体/国有）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanPrice" label="流转租金（元/亩）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanYear" label="流转年限（年）" />}
              {this.year === '流转记录' && <TableColumn prop="price" label="总价格" />}
              {this.year === '流转记录' && <TableColumn prop="contractPeriod" label="合同签订时间" />}
              {this.year === '流转记录' && <TableColumn prop="beian" label="是否乡镇备案" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="流入方联系人（名字/电话）" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="产权所有人" />}
              {this.year === '摸底表' && <TableColumn prop="certificate" label="是否有证（证书号）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="状态（空闲/在租）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="是否签署合同" />}
              {this.year === '摸底表' && <TableColumn prop="contractPeriod" label="合同期限" />}
              {this.year === '摸底表' && <TableColumn prop="price" label="资产原值（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="rentPrice" label="租金（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="shourang" label="受让方信息（含电话）" />}
              {this.year === '摸底表' && <TableColumn prop="remark" label="备注" />}
            </Table>
          );
        case TQ:
          return (
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              {this.year === '流转记录' && <TableColumn prop="experiment" label="流入主体/个体名称" />}
              {this.year === '摸底表' && <TableColumn prop="experiment" label="资产名称" />}
              {this.year === '流转记录' && <TableColumn prop="acreage" label="流转规模/数量" />}
              {this.year === '摸底表' && <TableColumn prop="acreage" label="面积/数量" />}
              {this.year === '摸底表' && <TableColumn prop="address" label="地址" />}
              {this.year === '流转记录' && <TableColumn prop="used" label="流转用途" />}
              {this.year === '流转记录' && <TableColumn prop="property" label="性质（耕地、林地等）" />}
              {this.year === '摸底表' && <TableColumn prop="property" label="资产性质（集体/国有）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanPrice" label="流转租金（元/亩）" />}
              {this.year === '流转记录' && <TableColumn prop="liuzhuanYear" label="流转年限（年）" />}
              {this.year === '流转记录' && <TableColumn prop="price" label="总价格" />}
              {this.year === '流转记录' && <TableColumn prop="contractPeriod" label="合同签订时间" />}
              {this.year === '流转记录' && <TableColumn prop="beian" label="是否乡镇备案" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="流入方联系人（名字/电话）" />}
              {this.year === '流转记录' && <TableColumn prop="owner" label="产权所有人" />}
              {this.year === '摸底表' && <TableColumn prop="certificate" label="是否有证（证书号）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="状态（空闲/在租）" />}
              {this.year === '摸底表' && <TableColumn prop="statue" label="是否签署合同" />}
              {this.year === '摸底表' && <TableColumn prop="contractPeriod" label="合同期限" />}
              {this.year === '摸底表' && <TableColumn prop="price" label="资产原值（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="rentPrice" label="租金（万元）" />}
              {this.year === '摸底表' && <TableColumn prop="shourang" label="受让方信息（含电话）" />}
              {this.year === '摸底表' && <TableColumn prop="remark" label="备注" />}
            </Table>
          );

        case LVYZY:
          return (
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              <TableColumn prop="experiment" label="资产名称" />
              <TableColumn prop="acreage" label="面积/数量" />
              <TableColumn prop="address" label="地址" />
              <TableColumn prop="property" label="资产性质（集体/国有）" />
              <TableColumn prop="certificate" label="是否有证（证书号）" />
              <TableColumn prop="statue" label="状态（空闲/在租）" />
              <TableColumn prop="statue" label="是否签署合同" />
              <TableColumn prop="contractPeriod" label="合同期限" />
              <TableColumn prop="price" label="资产原值（万元）" />
              <TableColumn prop="rentPrice" label="租金（万元）" />
              <TableColumn prop="shourang" label="受让方信息（含电话）" />
              <TableColumn prop="remark" label="备注" />
            </Table>
          );
        case LYZY:
          return (
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              <TableColumn prop="experiment" label="资产名称" />
              <TableColumn prop="acreage" label="面积/数量" />
              <TableColumn prop="address" label="地址" />
              <TableColumn prop="property" label="资产性质（集体/国有）" />
              <TableColumn prop="certificate" label="是否有证（证书号）" />
              <TableColumn prop="statue" label="状态（空闲/在租）" />
              <TableColumn prop="statue" label="是否签署合同" />
              <TableColumn prop="contractPeriod" label="合同期限" />
              <TableColumn prop="price" label="资产原值（万元）" />
              <TableColumn prop="rentPrice" label="租金（万元）" />
              <TableColumn prop="shourang" label="受让方信息（含电话）" />
              <TableColumn prop="remark" label="备注" />
            </Table>
          );
        case GYZC:
          return (
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              <TableColumn prop="experiment" label="资产名称" />
              <TableColumn prop="acreage" label="面积/数量" />
              <TableColumn prop="address" label="地址" />
              <TableColumn prop="property" label="资产性质（集体/国有）" />
              <TableColumn prop="certificate" label="是否有证（证书号）" />
              <TableColumn prop="statue" label="状态（空闲/在租）" />
              <TableColumn prop="statue" label="是否签署合同" />
              <TableColumn prop="contractPeriod" label="合同期限" />
              <TableColumn prop="price" label="资产原值（万元）" />
              <TableColumn prop="rentPrice" label="租金（万元）" />
              <TableColumn prop="shourang" label="受让方信息（含电话）" />
              <TableColumn prop="remark" label="备注" />
            </Table>
          );
        case CJTZC:
          return (
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              <TableColumn prop="experiment" label="资产名称" />
              <TableColumn prop="acreage" label="面积/数量" />
              <TableColumn prop="address" label="地址" />
              <TableColumn prop="property" label="资产性质（集体/国有）" />
              <TableColumn prop="certificate" label="是否有证（证书号）" />
              <TableColumn prop="statue" label="状态（空闲/在租）" />
              <TableColumn prop="statue" label="是否签署合同" />
              <TableColumn prop="contractPeriod" label="合同期限" />
              <TableColumn prop="price" label="资产原值（万元）" />
              <TableColumn prop="rentPrice" label="租金（万元）" />
              <TableColumn prop="shourang" label="受让方信息（含电话）" />
              <TableColumn prop="remark" label="备注" />
            </Table>
          );
        case NYZY:
          return (
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              <TableColumn prop="experiment" label="资产名称" />
              <TableColumn prop="acreage" label="面积/数量" />
              <TableColumn prop="address" label="地址" />
              <TableColumn prop="property" label="资产性质（集体/国有）" />
              <TableColumn prop="certificate" label="是否有证（证书号）" />
              <TableColumn prop="statue" label="状态（空闲/在租）" />
              <TableColumn prop="statue" label="是否签署合同" />
              <TableColumn prop="contractPeriod" label="合同期限" />
              <TableColumn prop="price" label="资产原值（万元）" />
              <TableColumn prop="rentPrice" label="租金（万元）" />
              <TableColumn prop="shourang" label="受让方信息（含电话）" />
              <TableColumn prop="remark" label="备注" />
            </Table>
          );
        case SYSYQ:
          return (
            <Table data={data} border height="600">
              <TableColumn type="index" label="序号" />
              <TableColumn prop="classify" label="分类" />
              <TableColumn prop="townName" label="乡镇" />
              <TableColumn prop="villageName" label="村别" />
              <TableColumn prop="experiment" label="资产名称" />
              <TableColumn prop="acreage" label="面积/数量" />
              <TableColumn prop="address" label="地址" />
              <TableColumn prop="property" label="资产性质（集体/国有）" />
              <TableColumn prop="certificate" label="是否有证（证书号）" />
              <TableColumn prop="statue" label="状态（空闲/在租）" />
              <TableColumn prop="statue" label="是否签署合同" />
              <TableColumn prop="contractPeriod" label="合同期限" />
              <TableColumn prop="price" label="资产原值（万元）" />
              <TableColumn prop="rentPrice" label="租金（万元）" />
              <TableColumn prop="shourang" label="受让方信息（含电话）" />
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
            // onClick={() => this.$router.go(-1)}
            onClick={() => {
              window.location.href = `#/property`;
            }}
          >
            返回
          </Button>
          <h1>{title[this.name] ?? `${this.name}`}</h1>
        </div>
        <div class={styles.table}>
          {/* {this.type === '1' && this.renderYears()} */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '98%'}}>
            {this.renderYears()}
            <div>
              {this.type !== '1' && <span style={{ color: '#fff',fontSize: '15px', fontWeight: 'bold' }}>请选择乡镇：</span>}
              {this.type !== '1' && this.renderSelectTwo()}
              {/* // */}
              {this.type !== '1' && <span style={{ color: '#fff',fontSize: '15px', fontWeight: 'bold',marginLeft: '30px' }}>请选择分类：</span>}
              {this.type !== '1' && this.renderSelect()}
            </div>
          </div>
          {!!this.name && this.renderTable(this.value, this.name)}
        </div>
      </div>
    );
  }
};

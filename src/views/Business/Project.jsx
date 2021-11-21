import Lines from './Charts/Line';
import { Table, TableColumn} from 'element-ui';

const dataSource = [
  { name: '信亚先进光电器件及模组技术研发中心', userName:'福建信亚照明科技有限公司', userUnit: '数字永泰产业园', process: '已完成'},
  {},
];

export default {
  name: 'BusinessProject',

  render() {
    return <div>
      <Lines
        title="每周项目完成情况"
        category={[
          "2021-07-06",
          "2021-07-07",
          "2021-07-08",
          "2021-07-09",
          "2021-07-10",
          "2021-07-11",
          "2021-07-12",
          "2021-07-13",
          "2021-07-14",
          "2021-07-15",
          "2021-07-16",
          "2021-07-17",
          "2021-07-18",
          "2021-07-19",
          "2021-07-20",
          "2021-07-21",
          "2021-07-22",
          "2021-07-23",
          "2021-07-24"
        ]}
        data={[{
          name: '项目总数',
          unit: '项',
          type: 'line',
          showSymbol: false,
          smooth: true,
          data: [
            116,
            129,
            135,
            86,
            73,
            85,
            73,
            84,
            93,
            85,
            68,
            92,
            130,
            245,
            139,
            115,
            107,
            82,
            44,
          ]
        },{
          name: '已完成项目',
          unit: '项',
          type: 'line',
          showSymbol: false,
          smooth: true,
          data: [
            73,
            83,
            125,
            107,
            82,
            44,
            72,
            106,
            84,
            93,
            85,
            106,
            107,
            66,
            91,
            92,
            113,
            107,
            131,
          ]
        }]}
      />

      <Table
        data={dataSource}
        style={{marginTop: '20px'}}
      >
        <TableColumn
          type="index"
          label="序号"
        />
        <TableColumn
          prop="name"
          label="项目名称"
        />
        <TableColumn
          prop="userName"
          label="投资方名称"
        />
        <TableColumn
          prop="userUnit"
          label="责任单位"
        />
        <TableColumn
          prop="process"
          label="完成情况"
        />
      </Table>
    </div>;
  }
};
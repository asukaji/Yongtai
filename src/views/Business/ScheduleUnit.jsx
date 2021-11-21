import { Table, TableColumn} from 'element-ui';

const dataSource = [
  { name: '信亚先进光电器件及模组技术研发中心', project:26, completed: 9.6, sum: 16.4},
  {},
];

export default {
  name: 'ScheduleUnit',

  render() {
    return (
      <Table
        data={dataSource}
        border
        style={{marginTop: '20px'}}
      >
        <TableColumn
          type="index"
          label="序号"
        />
        <TableColumn
          prop="name"
          label="责任单位"
        />
        <TableColumn label="1-6月任务数">
          <TableColumn
            prop="project"
            label="投资额(亿元)"
          />
        </TableColumn>
        <TableColumn label="已完成数 (截至6月30日)">
          <TableColumn
            prop="completed"
            label="投资额(亿元)"
          />
        </TableColumn>
        <TableColumn label="6月25日前应完成数">
          <TableColumn
            prop="sum"
            label="投资额(亿元)"
          />
        </TableColumn>
      </Table>
    );
  }
};

import { Table, TableColumn} from 'element-ui';
import Gauge from './Charts/Gauge';

const dataSource = [
  { name: '重大项目招商小分队(招商办)', num1: 14, num2: 1, num3: 34, num4: 12.5, num5: 3, num6: 6},
  {},
];

export default {
  name: 'ScheduleUnit',

  render() {
    return (
      <div>
        <div style={{display: 'flex'}}>
          <Gauge
            title='市外服务业'
            max={100}
            data={[
              {
                value: 14,
                name: '任务数',
                title: {
                  offsetCenter: [0, -10]
                },
                detail: {
                  valueAnimation: true,
                  offsetCenter: [0, 10]
                }
              }
            ]} />
          <Gauge
            title='其他产业'
            max={100}
            color="#FF7937"
            data={[
              {
                value: 34,
                name: '任务数',
                title: {
                  offsetCenter: [0, -10]
                },
                detail: {
                  valueAnimation: true,
                  offsetCenter: [0, 10]
                }
              }
            ]} style={{marginLeft: '10px'}}/>
          <Gauge
            title='台资合同'
            max={10}
            color="#28D2B0"
            data={[
              {
                value: 3,
                name: '任务数',
                title: {
                  offsetCenter: [0, -10]
                },
                detail: {
                  valueAnimation: true,
                  offsetCenter: [0, 10]
                }
              }
            ]} style={{marginLeft: '10px'}}/>
        </div>
        <Table
          data={dataSource}
          border
          show-summary
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
          <TableColumn label="市外服务业">
            <TableColumn
              prop="num1"
              label="任务数"
            />
            <TableColumn
              prop="num2"
              label="完成数"
            />
          </TableColumn>
          <TableColumn label="其他产业">
            <TableColumn
              prop="num3"
              label="任务数"
            />
            <TableColumn
              prop="num4"
              label="完成数"
            />
          </TableColumn>
          <TableColumn label="台资合同">
            <TableColumn
              prop="num5"
              label="任务数"
            />
            <TableColumn
              prop="num6"
              label="完成数"
            />
          </TableColumn>
        </Table>
      </div>
      
    );
  }
};

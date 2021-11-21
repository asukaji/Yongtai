import Bar from './Charts/Bar';
import Pie from './Charts/Pie';

export default {
  name: 'EvaluationProfile',

  render() {
    return (
      <div>
        <div style={{display: 'flex'}}>
          <Bar
            title='各季度落地项目数量与投资额'
            category={['2021/五', '2021/六', '2021/七', '2021/八']}
            data={[
              {
                name: '落地项目数',
                unit: '项',
                type: 'bar',
                barWidth: 10,
                data: [
                  176.7, 135.6, 162.2, 232.6
                ]
              },
              {
                name: '总投资额',
                unit: '亿元',
                type: 'line',
                data: [120.3, 223.4, 223.0, 116.5]
              }
            ]} />
          <Pie
            title='本季度各招商单位落地项目与投资额'
            category={['2021/五', '2021/六', '2021/七', '2021/八']}
            data={[
              { value: 335, name: '专业招商小分队' },
              { value: 310, name: '乡镇招商小分队' },
              { value: 234, name: '县直单位' }
            ]} style={{marginLeft: '10px'}}/>
        </div>
        <Bar
          title='各招商单位得分情况'
          category={['专业招商小分队', '乡镇招商小分队', '县直单位']}
          data={[
            {
              name: '总得分',
              type: 'bar',
              barWidth: 10,
              data: [
                176.7, 135.6, 162.2, 232.6
              ]
            },
            {
              name: '平均分',
              type: 'line',
              data: [120.3, 223.4, 116.5]
            }
          ]} />
      </div>
    );
  }
};

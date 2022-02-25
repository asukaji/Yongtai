import Card from './Card';
import styles from './index.module.less';

import { fetchProperty, fetchPropertyList } from '@/api';

export default {
  name: 'Property',

  render() {
    return (
      <div class={styles.container}>
        <div class={styles.header}></div>
        <div class={styles.content}>
          <div>
            <Card
              fetchData={fetchProperty.bind(null, 'nongdi')}
              scopedSlots={{
                default: function (props) {
                  return [
                    <div>{props.text}</div>,
                    <div>this is real body</div>
                  ];
                }
              }}
            >
              <p slot="header">农地</p>
            </Card>
            <Card fetchData={fetchProperty.bind(null, 'lvyou')} />
            <Card fetchData={fetchProperty.bind(null, 'guoyouTudi')} />
          </div>
          <div>
            <Card />
            <Card fetchData={fetchPropertyList} />
          </div>
          <div>
            <Card fetchData={fetchProperty.bind(null, 'guozi')} />
            <Card fetchData={fetchProperty.bind(null, 'linquan')} />
            <Card fetchData={fetchProperty.bind(null, 'jitiZichan')} />
          </div>
        </div>
      </div>
    );
  }
};

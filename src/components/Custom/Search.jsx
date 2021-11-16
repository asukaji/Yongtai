import { Input, Button} from 'element-ui';
import styles from './Search.module.less';

import iconSearch from '@/assets/Icon/icon-search.png';

export default {
  name: 'Search',

  render() {
    return <Input placeholder="请输入项目名称或关键字搜索" class={styles.input}>
      <Button slot="append" type="primary">
        <img src={iconSearch} />
      </Button>
    </Input>;
  }
};
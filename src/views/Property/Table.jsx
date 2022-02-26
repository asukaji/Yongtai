import { Table, TableColumn } from 'element-ui';

import VueTypes from 'vue-types';

export default {
  name: 'Table',

  props: {
    value: VueTypes.array.def([])
  },

  render() {
    return (
      <Table data={this.value} showHeader={false}>
        <TableColumn prop="projectName" width={160} />
        <TableColumn prop="range" width={160} />
        <TableColumn prop="acreage" width={96} />
        <TableColumn prop="price" width={96} />
      </Table>
    );
  }
};

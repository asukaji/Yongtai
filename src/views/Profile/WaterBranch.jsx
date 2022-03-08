import { FlowLayer } from '@/components/Map';
import { ParagraphModal, Float } from '@/components/Custom';

export default {
  name: 'TrafficHighway',

  render() {
    return (
      <div>
        <FlowLayer></FlowLayer>

        <Float bottom="100px" onClick={() => this.$refs.modal?.open()} />

        <ParagraphModal ref="modal">
          <h2>水域水流</h2>
          <pre>Water Flow</pre>
          <p>
            永泰县属丘陵山区河流，溪流纵横密布，主要有大樟溪干流属闽江支流，发源于德化境内的戴云山脉，自西南向东北流经德化、永泰至闽侯的江口注入闽江，大樟溪流域面积4885平方公里，河道总长234公里。大樟溪我县境内流域面积2177平方公里，河道长达124公里，10km2以上一级支流有22条，其中50km2以上16条，200km2以上有5条（官林溪、潼关溪、长庆溪-下际溪、富泉溪、清凉溪），官林溪、潼关溪流域面积超500km2；多年平均地表水资源量为20.23亿立方米，多年平均地下水资源量为6.05亿立方米，人均水资源量为8300立方米/人。
          </p>
        </ParagraphModal>
      </div>
    );
  }
};

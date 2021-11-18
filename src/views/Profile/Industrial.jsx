import { Carousel, CarouselItem, Card } from 'element-ui';
import { Paragraph } from '@/components/Custom';
import styles from './Ecological.module.less';

import bg0 from '@/assets/Bg/Industrial1.png';

const backgroundImages = [bg0];
export default {
  name: 'Industrial',

  data() {
    return {
      state: {
        index: 0
      }
    };
  },

  methods: {
    onChange(index) {
      this.state.index = index;
    }
  },

  render() {
    return (
      <div
        class={styles.container}
        style={{
          backgroundImage: `url(${backgroundImages[this.state.index]})`
        }}
      >
        <Card>
          <Paragraph>
            <h2>产业基础</h2>
            <pre>Industrial Foundation</pre>
            <p>
              “一核”
              把中心城区打造成为基础设施完备，旅游功能齐全的现代化旅游城市。
              “四带”
              以葛岭为中心，延伸至塘前、丹云的“县域经济次中心带”，重点发展温泉康养、旅游度假、高等教育等产业;
              以“梧桐、赤锡”为重点，破题建设以水上运动产业为重点的“滨水田园休闲带”，重点建设田园小镇:
              以嵩口为核心，带动长庆、洑口、盖洋等镇村发展的旅游双创特色带”，全力打造嵩口休闲旅游特色小镇:以同安、大洋为核心，辐射霞拔、东洋、盘谷等乡镇的“现代农业示范带”，重点发展现代农业、休闲农业、生态农业、高山农业。
            </p>
          </Paragraph>
        </Card>
        <Carousel type="card" autoplay={false} onChange={this.onChange}>
          <CarouselItem
            key="bg0"
            style={{ backgroundImage: `url(${bg0})` }}
          ></CarouselItem>
        </Carousel>
      </div>
    );
  }
};

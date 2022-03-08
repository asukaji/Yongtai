import { Carousel, CarouselItem, Card } from 'element-ui';
import { Static } from '@/components/Custom';
import styles from './Ecological.module.less';

import bg0 from '@/assets/Bg/urban1.png';
import bg1 from '@/assets/Bg/urban2.png';
import bg2 from '@/assets/Bg/urban3.png';
import bg3 from '@/assets/Bg/urban4.png';
import { urban } from '@/constants';

const backgroundImages = [bg0, bg1, bg2, bg3];
export default {
  name: 'Urban',

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
          <Static value={urban} />
        </Card>
        <Carousel type="card" onChange={this.onChange}>
          <CarouselItem
            key="bg0"
            style={{ backgroundImage: `url(${bg0})` }}
          ></CarouselItem>
          <CarouselItem
            key="bg1"
            style={{ backgroundImage: `url(${bg1})` }}
          ></CarouselItem>
          <CarouselItem
            key="bg2"
            style={{ backgroundImage: `url(${bg2})` }}
          ></CarouselItem>
          <CarouselItem
            key="bg3"
            style={{ backgroundImage: `url(${bg3})` }}
          ></CarouselItem>
        </Carousel>
      </div>
    );
  }
};

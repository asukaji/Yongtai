import { Carousel, CarouselItem, Card } from 'element-ui';
import { Paragraph } from '@/components/Custom';
import styles from './Ecological.module.less';

import bg0 from '@/assets/Bg/urban1.png';
import bg1 from '@/assets/Bg/urban2.png';
import bg2 from '@/assets/Bg/urban3.png';
import bg3 from '@/assets/Bg/urban4.png';
import static1 from '@/assets/Bg/static3.png';

const backgroundImages = [bg0, bg1, bg2, bg3];
export default {
  name: 'Ecological',

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
            <img
              src={static1}
              style={{
                position: 'absolute',
                width: '100%',
                height: 'auto',
                left: 0,
                top: 0
              }}
            />
            {/* <h2>城市建设</h2>
            <pre>Urban Construction</pre>
            <p>
              成功创建第五届、第六届省级文明县城，入围全国文明城市提名城市具城建成区面积从7.9平方公里扩大到9.9平方公里，永阳古城完成改造，美食街开街运营，小汤山生态公园、花海公园建成开放，人均公园绿地面积位居全市第一。成立国内首家县级乡村振兴研究院、全省首家扶贫农产品统购统销运营中心、全市首家农村产权流转服务中心，美丽乡村建设成效连续三年位居全市第一，农村人居环境整治成效作为全省唯一获国务院通报嘉奖，获评国家农业绿色发展先行区、全国休闲农业和乡村旅游示范县。
            </p> */}
          </Paragraph>
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

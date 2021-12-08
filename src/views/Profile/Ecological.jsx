import { Carousel, CarouselItem, Card } from 'element-ui';
import { Paragraph } from '@/components/Custom';
import styles from './Ecological.module.less';

import bg0 from '@/assets/Bg/0.jpg';
import bg1 from '@/assets/Bg/1.jpg';
import bg2 from '@/assets/Bg/2.jpg';
import bg3 from '@/assets/Bg/3.jpg';
import static1 from '@/assets/Bg/static1.png';

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
            {/* <h2>生态文明</h2>
            <pre>Ecological Civilization</pre>
            <p>
              在永泰2241平方公里的土地上，温和的气候、丰沛的雨量、舒适的阳光，滋养着39万永泰人民。永泰县以总成绩第一获评2018年度"中国天然氧吧”，亦是福州市首个获此殊荣的县。
            </p>
            <p>
              绿色是永泰最鲜亮的底色，生态是永泰最大的优势、最大的财富。3年来，永泰始终坚持践行"两山”理念，守护好青山绿水，走生态绿色发展之路。永泰不仅是福建建设生态之省"绿富美”的杰出代表之一，也是首批国家生态文明建设示范县、首批国家全域旅游示范区、国家农业绿色发展先行区。如今，永泰正以全新的姿态迎接“中国天然氧吧”复评工作。
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

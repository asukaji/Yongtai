import { Carousel, CarouselItem, Card } from 'element-ui';
import { Paragraph } from '@/components/Custom';
import styles from './Ecological.module.less';

import bg0 from '@/assets/Bg/Livelihood1.png';
import bg1 from '@/assets/Bg/Livelihood2.png';
import bg2 from '@/assets/Bg/Livelihood3.png';
import bg3 from '@/assets/Bg/Livelihood4.png';

const backgroundImages = [bg0, bg1, bg2, bg3];
export default {
  name: 'Livelihood',

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
            <h2>民生事业</h2>
            <pre>Livelihood Cause</pre>
            <p>
              每年县财政用于民生支出均达到80%以上，累计投入130亿元。新改扩建学校27所，新增校舍面积11.4万平方米、新增学位7475个，普惠性学额覆盖率提升至98.6%，福州工商学院建成开学，结束永泰没有本科高校的历史。完成中医院、妇幼保健院迁建和192个村卫生所标准化建设，县域就诊率从28.6%提升至50.9%。实现城乡社区养老服务设施、文化服务中心全覆盖。城乡低保标准从每年每人3000元提高至9120元。荣获全国信访“三无”县、全国法治县创建工作先进县、省级平安县、全市扫黑除恶先进县等称号。
            </p>
          </Paragraph>
        </Card>
        <Carousel type="card" autoplay={false} onChange={this.onChange}>
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

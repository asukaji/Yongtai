import { Carousel, Card } from 'element-ui';
import { Paragraph } from '@/components/Custom';
import styles from './Ecological.module.less';

export default {
  name: 'Ecological',

  render() {
    return <div class={styles.container}>
      <Card>
        <Paragraph>
          <h2>生态文明</h2>
          <pre>Ecological Civilization</pre>
          <p>
          在永泰2241平方公里的土地上，温和的气候、丰沛的雨量、舒适的阳光，滋养着39万永泰人民。永泰县以总成绩第一获评2018年度"中国天然氧吧”，亦是福州市首个获此殊荣的县。
          </p>
          <p>
绿色是永泰最鲜亮的底色，生态是永泰最大的优势、最大的财富。3年来，永泰始终坚持践行"两山”理念，守护好青山绿水，走生态绿色发展之路。永泰不仅是福建建设生态之省"绿富美”的杰出代表之一，也是首批国家生态文明建设示范县、首批国家全域旅游示范区、国家农业绿色发展先行区。如今，永泰正以全新的姿态迎接“中国天然氧吧”复评工作。
          </p>
        </Paragraph>
      </Card>
      <Carousel type="card" >
        <Carousel.Item></Carousel.Item>
      </Carousel>
    </div>; 
  }
};

import Header from '../Header';

const BG =
  'https://zhengxinyun.oss-cn-guangzhou.aliyuncs.com/xiangcun/other/chanquanjioayi.png';

export default {
  name: 'Property',

  render() {
    return (
      <div
        style={{
          height: '100%',
          textAlign: 'center',
          backgroundColor: '#F6F7F9'
        }}
      >
        <Header />
        <img src={BG} style={{ width: '100%', height: 'calc(100% - 54px)' }} />
      </div>
    );
  }
};

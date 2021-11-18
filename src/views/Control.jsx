import Header from './Header';

import control from '@/assets/Bg/control.jpg';

export default {
  name: 'Control',

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
        <h1>2021年第7期</h1>
        <img src={control} />
      </div>
    );
  }
};

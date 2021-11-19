import Header from '../Header';

export default {
  name: 'Economy',

  render() {
    return (
      <div style={{ height: '100%' }}>
        <Header />
        <router-view></router-view>
      </div>
    );
  }
};

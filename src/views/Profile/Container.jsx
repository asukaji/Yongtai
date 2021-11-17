import Header from '../Header';

export default {
  name: 'ProfileContainer',

  render() {
    return(
      <div style={{ height: '100%' }}>
        <Header />
        <router-view></router-view>
      </div>
    );
  }
};

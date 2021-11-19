import SideBar from './SideBar';
import Header from '../Header';

export default {
  name: 'Business',

  render() {
    return (
      <div
        style={{
          height: '100%'
        }}
      >
        <Header />
        <SideBar />
        <router-view></router-view>
      </div>
    );
  }
};

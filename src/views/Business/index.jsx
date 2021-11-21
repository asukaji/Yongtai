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
        <div
          style={{
            height: '100%',
            display: 'flex',
          }}
        >
          <SideBar />
          <router-view style={{
            height: '100%',
            flex: 1, overflow: 'auto', padding: '30px', backgroundColor: '#F3F4F6'
          }}></router-view>
        </div>
      </div>
    );
  }
};

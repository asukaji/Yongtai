// import SideBar from './SideBar';
import Header from '../Header';

import business from '@/assets/Bg/business.jpg';

export default {
  name: 'Business',

  render() {
    return (
      <div
        style={{
          height: '100%',
          backgroundImage: `url(${business})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center 54px',
          backgroundColor: '#F6F7F9'
        }}
      >
        <Header />
        {/* <SideBar /> */}
        {/* <router-view></router-view> */}
      </div>
    );
  }
};

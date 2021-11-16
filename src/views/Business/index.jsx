import SideBar from './SideBar';

export default {
  name: 'Business',

  render() {
    return (
      <div>
        <SideBar />
        <router-view></router-view>
      </div>
    );
  }
};

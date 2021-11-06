import Hello from '@/components/Hello';

import logo from '@/assets/logo.png';

export default {
  name: 'Home',

  render() {
    return (
      <div class="home">
        <img src={logo} />
        <Hello msg="Welcome to Your Vue.js App" />
        <div id="nav">
          <RouterLink to="/">Home</RouterLink> |
          <RouterLink to="/about">About</RouterLink>
        </div>
      </div>
    );
  }
};

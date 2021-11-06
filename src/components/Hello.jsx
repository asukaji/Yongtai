import VueTypes from 'vue-types';

export default {
  name: 'HelloWorld',

  props: {
    msg: VueTypes.string.def()
  },
  
  render() {
    return (
      <div>{this.msg}</div>
    );
  }
};

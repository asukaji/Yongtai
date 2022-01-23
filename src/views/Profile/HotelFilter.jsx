import { RadioButton, RadioGroup } from 'element-ui';

export default {
  name: 'HotelFilter',

  data() {
    return {
      state: {
        checked: 'star'
      }
    };
  },

  methods: {},

  render() {
    return (
      <RadioGroup
        vModel={this.state.checked}
        size="small"
        style={{ position: 'absolute', left: '40px', top: '44px' }}
        onChange={this.$emit.bind(this, 'change')}
      >
        <RadioButton label="all">全部酒店</RadioButton>
        <RadioButton label="star">星级酒店</RadioButton>
      </RadioGroup>
    );
  }
};

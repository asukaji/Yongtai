import { CheckboxButton, CheckboxGroup } from 'element-ui';

export default {
  name: 'ProjectsFilter',

  data() {
    return {
      state: {
        checked: ['province', 'city']
      }
    };
  },

  methods: {
    
  },

  render() {
    return (
      <CheckboxGroup vModel={this.state.checked} size="small" style={{ position: 'absolute', 
        left: '340px',
        top: '44px'}}
      onChange={this.$emit.bind(this, 'change')}
      >
        <CheckboxButton label="province">省重点项目</CheckboxButton>
        <CheckboxButton label="city">市重点项目</CheckboxButton>
      </CheckboxGroup>
    );
  }
};

import { Button } from 'element-ui';
import styles from './DrawerContainer.module.less';

import {
  fetchPromoteProfile,
  fetchPromoteProjectList,
  fetchPromoteSchedule
} from '@/api';
import _ from 'lodash';

export default {
  name: 'DrawerContainer',

  data() {
    return {
      state: {
        area: [],
        type: [],
        projects: [],
        schedules: [],
        step: 0
      }
    };
  },

  async mounted() {
    _.assign(this.state, await fetchPromoteProfile());
  },

  methods: {
    open(projects) {
      this.state.step = 1;
      this.state.projects = projects;
    },

    async onClick(code, type, bottom, area) {
      this.$emit('click', area, type);

      this.state.projects = _.map(
        await fetchPromoteProjectList(code, type),
        (project) => ({
          ...project,
          bottom
        })
      );
      this.state.step = 1;
    },

    async onProjectClick(id) {
      this.state.schedules = await fetchPromoteSchedule(id);
      this.state.step = 2;
    },

    back() {
      this.state.step = this.state.step - 1;
      this.state.step === 1
        ? (this.state.schedules = [])
        : (this.state.projects = []);
    },

    projectBottom(type, name) {
      return `${type === 'area' ? '地区' : '类型'}：${
        type === 'area' ? `永泰县/${name}` : name
      }`;
    },

    projectData(projectNum, vallageNum) {
      return `${vallageNum}个村，${projectNum}个项目`;
    },

    renderItems(items, type) {
      return _.map(items, ({ name, projectNum, vallageNum, nameCode }) => (
        <div
          onClick={this.onClick.bind(
            null,
            nameCode,
            type,
            this.projectBottom(type, name),
            [name, this.projectData(projectNum, vallageNum), nameCode]
          )}
        >
          <div>{name}</div>
          <div>{this.projectData(projectNum, vallageNum)}</div>
        </div>
      ));
    },

    renderDashboard() {
      const { area, type } = this.state;

      return (
        <div>
          {/* <div class={styles.profile}></div> */}
          <div class={styles.paragraph}>
            <h4>按照地区查询</h4>
            <div>{this.renderItems(area, 'area')}</div>
          </div>
          <div class={styles.paragraph}>
            <h4>按照项目分类查询</h4>
            <div>{this.renderItems(type, 'type')}</div>
          </div>
          {/* <div class={styles.paragraph}></div> */}
        </div>
      );
    },

    renderProjects() {
      return (
        <div class={styles.project}>
          {_.map(
            this.state.projects,
            ({
              projectName,
              projectId,
              investment,
              datetime,
              unit,
              bottom
            }) => (
              <div onClick={this.onProjectClick.bind(null, projectId)}>
                <h3>{projectName}</h3>
                <div>
                  <div>
                    <p>投资总额</p>
                    <pre>
                      {investment}
                      {unit}
                    </pre>
                  </div>
                  <div>
                    <p>建设日期</p>
                    <pre>{datetime}</pre>
                  </div>
                </div>
                <div>{bottom}</div>
              </div>
            )
          )}
        </div>
      );
    },

    renderSchedules() {
      return (
        <div class={styles.schedule}>
          <h4>建设进度</h4>
          {_.map(
            this.state.schedules,
            ({ investment, datetime, state, schedule, unit }) => (
              <div>
                <div>{`完成投资  ${investment}${unit}`}</div>
                <div>{`更新月份  ${datetime}`}</div>
                <div>{`建设状态  ${state}`}</div>
                <div>{`形象进度  ${schedule}`}</div>
              </div>
            )
          )}
        </div>
      );
    }
  },

  render() {
    const { step } = this.state;

    return (
      <div>
        {step === 0 ? this.renderDashboard() : null}
        {step === 1 ? this.renderProjects() : null}
        {step === 2 ? this.renderSchedules() : null}
        {step > 0 ? (
          <Button
            icon="el-icon-arrow-left"
            class={styles.back}
            onClick={this.back}
          />
        ) : null}
      </div>
    );
  }
};

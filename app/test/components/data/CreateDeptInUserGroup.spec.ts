import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import CreateDeptInUserGroup from '@/components/data/CreateDeptInUserGroup.vue';

const createDeptInUserGroupWrapper = () => {
  return mount(CreateDeptInUserGroup, {
    props: {
      org: {
        orgId: 1,
        orgName: 'test-orgName'
      }
    }
  });
}
describe('CreateDeptInUserGroup.vue', () => {

  it('TC_VUE_DEPT_02_01: 입력 form 렌더링 성공', async () => {

    const wrapper = createDeptInUserGroupWrapper();
    
    const labels = [
      '생성할 부서 이름'
    ]

    labels.forEach(label => {
      expect(wrapper.html()).toContain(label);
    });

    wrapper.unmount();
  });

  const baseValues = {
    dept: {
      deptName: 'test-deptName'
    }
  }

  const requiredFields = [
    'deptName'
  ]

  requiredFields.forEach((field, idx) => {
    it(`TC_VUE_DEPT_02_02_${idx}: ${field} 미입력 시 validate 실패`, async () => {
      const wrapper = createDeptInUserGroupWrapper();

      // 모든 값 설정
      await wrapper.find('[data-test="input-dept-name"] input').setValue(baseValues.dept.deptName);

      // 특정 필드만 비우기
      switch (field) {
        case 'deptName':
          wrapper.vm.form.dept.deptName = '';
          break;
      }

      await flushPromises();
      await nextTick();

      expect(wrapper.vm.valid).toBe(false);
    });
  });
});

import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import SideContents from '@/__mocks__/layout/SideContents.vue';
import CreateDept from '@/components/data/CreateDept.vue';
import Form from '@/__mocks__/common/Form.vue';

const createDeptWrapper = () => {
  return mount(CreateDept, {
    global: {
      stubs: {
        SideContents: SideContents,
        SelectOrgList: Form,
      }
    }
  });
}
describe('CreateDept.vue', () => {

  it('TC_VUE_DEPT_01_01', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(CreateDept, {
      attachTo: el, // Teleport가 실제 DOM에 붙도록 설정
      global: {
        stubs: {
          SelectOrgList: Form,
        }
      }
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '생성할 부서 이름'
    ]

    labels.forEach(label => {
      expect(document.body.innerHTML).toContain(label);
    });

    wrapper.unmount();
    document.body.removeChild(el);
  });

  const baseValues = {
    org: {orgId: 1, orgName: 'test-clusterName'},
    deptName: 'test-deptName'
  }

  const requiredFields = [
    'org',
    'deptName'
  ]

  requiredFields.forEach((field) => {
    it(`TC_VUE_DEPT_01_02_${field}`, async () => {
      const wrapper = createDeptWrapper();

      // 모든 값 설정
      wrapper.vm.form.org = baseValues.org;
      await wrapper.find('[data-test="input-dept-name"] input').setValue(baseValues.deptName);

      // 특정 필드만 비우기
      switch (field) {
        case 'org':
          wrapper.vm.form.org = {orgId: 0, orgName:''};
          break;
        case 'deptName':
          wrapper.vm.form.deptName = '';
          break;
      }

      await flushPromises();
      await nextTick();

      expect(wrapper.vm.valid).toBe(false);
    });
  });
});

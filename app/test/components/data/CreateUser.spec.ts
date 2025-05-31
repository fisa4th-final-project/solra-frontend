import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import SideContents from '@/__mocks__/layout/SideContents.vue';
import CreateUser from '@/components/data/CreateUser.vue';
import Form from '@/__mocks__/common/Form.vue';

const createUserWrapper = () => {
  return mount(CreateUser, {
    global: {
      stubs: {
        SideContents: SideContents,
        SelectOrgList: Form,
        SelectDeptList: Form
      }
    }
  });
}
describe('CreateUser.vue', () => {

  it('TC_VUE_USER_01_01: 클릭 후 입력 form 렌더링 성공', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(CreateUser, {
      attachTo: el // Teleport가 실제 DOM에 붙도록 설정
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '사용자 ID',
      '비밀번호',
      '이름',
      '이메일',
    ]

    labels.forEach(label => {
      expect(document.body.innerHTML).toContain(label);
    });

    wrapper.unmount();
    document.body.removeChild(el);
  });

  const baseValues = {
    userLoginId: 'test-userLoginId',
    password: 'test-password',
    name: 'test-name',
    email: 'test-user@test.email',
    org: {
      orgId: 1,
      orgName: 'test-orgName'
    },
    dept: {
      deptId: 3,
      deptName: 'test-deptName'
    }
  }

  const requiredFields = [
    'userLoginId',
    'password',
    'name',
    'email',
    'org',
    'dept'
  ]

  requiredFields.forEach((field, idx) => {
    it(`TC_VUE_USER_01_02_${idx}: ${field} 미입력 시 validate 여부`, async () => {
      const wrapper = createUserWrapper();

      // 모든 값 설정
      await wrapper.find('[data-test="input-user-login-id"] input').setValue(baseValues.userLoginId);
      await wrapper.find('[data-test="input-password"] input').setValue(baseValues.password);
      await wrapper.find('[data-test="input-name"] input').setValue(baseValues.name);
      await wrapper.find('[data-test="input-email"] input').setValue(baseValues.email);
      
      wrapper.vm.form.org = baseValues.org;
      wrapper.vm.form.dept = baseValues.dept;

      // 특정 필드만 비우기
      switch (field) {
        case 'userLoginId':
          await wrapper.find('[data-test="input-user-login-id"] input').setValue('');
          break;
        case 'password': 
          await wrapper.find('[data-test="input-password"] input').setValue('');
          break;
        case 'name': 
          await wrapper.find('[data-test="input-name"] input').setValue('');
          break;
        case 'email': 
          await wrapper.find('[data-test="input-email"] input').setValue('');
          break;
        case 'org': 
          wrapper.vm.form.org = {orgId: 0, orgName: ''};
          break;
        case 'dept': 
          wrapper.vm.form.dept = { deptId: 0, deptName: '' };
          break;
      }

      await flushPromises();
      await nextTick();
      expect(wrapper.vm.valid).toBe(false);
      
    });
  });

  // TODO: port 내에서도 required 체크 기능 추가 
});

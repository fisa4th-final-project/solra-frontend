import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import SideContents from '@/__mocks__/layout/SideContents.vue';
import CreateRole from '@/components/data/CreateRole.vue';
import Content from '@/__mocks__/common/Content.vue';

const createRoleWrapper = () => {
  return mount(CreateRole, {
    global: {
      stubs: {
        SideContents: SideContents,
        GetPermList: Content
      }
    }
  });
}
describe('CreateRole.vue', () => {

  it('TC_VUE_ROLE_01_01: 클릭 후 입력 form 렌더링 성공', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(CreateRole, {
      attachTo: el, // Teleport가 실제 DOM에 붙도록 설정
      global: {
        stubs: {
          GetPermList: Content
        }
      }
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '생성할 역할 이름',
      '역할 설명',
      '부여 권한'
    ]

    labels.forEach(label => {
      expect(document.body.innerHTML).toContain(label);
    });

    wrapper.unmount();
    document.body.removeChild(el);
  });

  const baseValues = {
    roleName: 'test-roleName',
    roleDesc: 'test-roleDesc',
    perms: [{
      permissionId: 1,
      permissionName: 'test-permName',
      description: 'test-permDesc',
    }]
  }

  const requiredFields = [
    'roleName',
    'roleDesc',
    'perms'
  ]

  requiredFields.forEach((field, idx) => {
    it(`TC_VUE_ROLE_01_02_${idx}: ${field} 미입력 시 validate 여부`, async () => {
      const wrapper = createRoleWrapper();

      // 모든 값 설정
      await wrapper.find('[data-test="input-role-name"] input').setValue(baseValues.roleName);
      await wrapper.find('[data-test="input-role-desc"] input').setValue(baseValues.roleDesc);
      wrapper.vm.perms = baseValues.perms;

      // 특정 필드만 비우기
      switch (field) {
        case 'roleName':
          await wrapper.find('[data-test="input-role-name"] input').setValue('');
          await flushPromises();
          await nextTick();
          expect(wrapper.vm.valid).toBe(false);
          break;
        case 'roleDesc': // 값이 비어도 valid는 통과
          await wrapper.find('[data-test="input-role-desc"] input').setValue('');
          await flushPromises();
          await nextTick();
          expect(wrapper.vm.valid).toBe(true);
          break;
        case 'perms':
          wrapper.vm.perms = [];
          await flushPromises();
          await nextTick();
          expect(wrapper.vm.valid).toBe(false);
          break;
      }
    });
  });
});

import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import GetRoleList from '@/components/data/GetRoleList.vue'
import Form from '@/__mocks__/common/Form.vue'
import { apiHandler } from '@/lib/global/apiManager'

const getRoleListWrapper = () => {
  return mount(GetRoleList, {
    global: {
      stubs: {
        SideContents: Form,
        UpdatePerm: Form
      }
    }
  });
};

describe('GetRoleList.vue', () => {

  const roleMockResponse = [
    {
      roleId: 1,
      roleName: 'test-role-name-01',
      description: 'test-role-desc-01'
    }
  ];
  const rolePermMockResponse = [
    {
      permissionId: 1,
      permissionName: 'test-rolePerm-name-01',
      description: 'test-rolePerm-desc-01'
    },
    {
      permissionId: 2,
      permissionName: 'test-rolePerm-name-02',
      description: 'test-rolePerm-desc-02'
    }
  ];

  it('TC_VUE_ROLE_04_01: label 정상 렌더링', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spyRole = vi.spyOn(apiHandler, 'getRoleListApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(roleMockResponse);
        }, 10); // 10ms 지연
      });
    });

    const spyRolePerm = vi.spyOn(apiHandler, 'getRolePermListApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(rolePermMockResponse);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getRoleListWrapper();
    await wrapper.vm.loadRoles();

    expect(spyRole).toHaveBeenCalled();
    expect(spyRolePerm).toHaveBeenCalled();

    // API 응답 처리 완료 대기
    await flushPromises();

    const toggleButton = wrapper.find('[data-test="btn-expend-item"]')
    expect(toggleButton.exists()).toBe(true)

    await toggleButton.trigger('click')

    // skeleton 사라지고 label 확인
    const labels = [
      roleMockResponse[0].roleName,
      rolePermMockResponse[0].permissionName,
      rolePermMockResponse[1].permissionName,
    ];
    labels.forEach(label => {
      expect(wrapper.text()).toContain(label);
    });

    wrapper.unmount();
  });

  // TODO: row item 클릭 시 권한 상세 노출 확인
});

import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import DeleteRolePerm from '@/components/data/DeleteRolePerm.vue';

describe('DeleteRolePerm.vue', () => {

  it('TC_VUE_ROLEPERM_02_01: 클릭 후 삭제 Dialog 렌더링 성공', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(DeleteRolePerm, {
      attachTo: el, // Teleport가 실제 DOM에 붙도록 설정
      props: {
        role: {
          roleId: 1,
          roleName: 'test-roleName'
        },
        perm: {
          permissionId: 1,
          permissionName: 'test-permName'
        },
      }
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '"test-roleName" 에 부여된 권한을 회수하시겠습니까?',
      '권한: test-permName',
      '취소',
      '삭제'
    ]

    labels.forEach(label => {
      expect(document.body.innerHTML).toContain(label);
    });

    wrapper.unmount();
    document.body.removeChild(el);
  });

});

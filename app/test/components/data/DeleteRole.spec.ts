import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import DeleteRole from '@/components/data/DeleteRole.vue';

describe('DeleteRole.vue', () => {

  it('TC_VUE_ROLE_07_01', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(DeleteRole, {
      attachTo: el, // Teleport가 실제 DOM에 붙도록 설정
      props: {
        role: {
          roleId: 1,
          roleName: 'test-roleName'
        }
      }
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '역할을 삭제하시겠습니까?',
      '역할: test-roleName',
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

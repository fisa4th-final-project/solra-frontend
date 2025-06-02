import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import DeleteUser from '@/components/data/DeleteUser.vue';

describe('DeleteUser.vue', () => {

  it('TC_VUE_USER_02_01: 클릭 후 삭제 Dialog 렌더링 성공', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(DeleteUser, {
      attachTo: el, // Teleport가 실제 DOM에 붙도록 설정
      props: {
        user: {
          userId: 1,
          userLoginId: 'test-userLoginId'
        }
      }
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '사용자를 삭제하시겠습니까?',
      '사용자 ID: test-userLoginId',
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

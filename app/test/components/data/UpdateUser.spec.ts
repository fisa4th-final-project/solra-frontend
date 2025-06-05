import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import UpdateUser from '@/components/data/UpdateUser.vue';
import Content from '@/__mocks__/common/Content.vue';

describe('UpdateUser.vue', () => {

  it('TC_VUE_USER_02_01', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(UpdateUser, {
      attachTo: el, // Teleport가 실제 DOM에 붙도록 설정
      global: {
        stubs: {
          DeleteUser: Content,
        }
      },
      props: {
        userId: 1
      }
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
});

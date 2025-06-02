import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import UpdateRole from '@/components/data/UpdateRole.vue';
import Content from '@/__mocks__/common/Content.vue';

describe('UpdateRole.vue', () => {

  it('TC_VUE_ROLE_05_01: 클릭 후 입력 form 렌더링 성공', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(UpdateRole, {
      attachTo: el, // Teleport가 실제 DOM에 붙도록 설정
      global: {
        stubs: {
          GetPermList: Content
        }
      },
      props: {
        roleId: 1
      }
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '역할 설명',
    ]

    labels.forEach(label => {
      expect(document.body.innerHTML).toContain(label);
    });

    wrapper.unmount();
    document.body.removeChild(el);
  });
});

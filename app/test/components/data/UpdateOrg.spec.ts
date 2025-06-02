import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import UpdateOrg from '@/components/data/UpdateOrg.vue';

describe('UpdateOrg.vue', () => {

  it('TC_VUE_ORG_05_01: 클릭 후 입력 form 렌더링 성공', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(UpdateOrg, {
      attachTo: el // Teleport가 실제 DOM에 붙도록 설정
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '수정할 조직 이름'
    ]

    labels.forEach(label => {
      expect(document.body.innerHTML).toContain(label);
    });

    wrapper.unmount();
    document.body.removeChild(el);
  });
});

import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import UpdateNS from '@/components/data/UpdateNS.vue';

describe('UpdateNS.vue', () => {

  it('TC_VUE_NS_05_01', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(UpdateNS, {
      attachTo: el, // Teleport가 실제 DOM에 붙도록 설정
      props: {
        clusterId: 1,
        name: 'test-nsName'
      }
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '네임스페이스 labels',
      '네임스페이스 annotaions'
    ]

    labels.forEach(label => {
      expect(document.body.innerHTML).toContain(label);
    });

    wrapper.unmount();
    document.body.removeChild(el);
  });
});

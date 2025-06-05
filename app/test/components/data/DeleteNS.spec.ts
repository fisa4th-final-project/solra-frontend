import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import DeleteNS from '@/components/data/DeleteNS.vue';

describe('DeleteNS.vue', () => {

  it('TC_VUE_NS_06_01', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(DeleteNS, {
      attachTo: el, // Teleport가 실제 DOM에 붙도록 설정
      props: {
        clusterId: 1,
        name: 'test-nsName'
      }
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '네임스페이스를 삭제하시겠습니까?',
      '네임스페이스: test-nsName',
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

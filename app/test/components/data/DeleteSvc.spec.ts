import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import DeleteSvc from '@/components/data/DeleteSvc.vue';

describe('DeleteSvc.vue', () => {

  it('TC_VUE_SVC_02_01: 클릭 후 삭제 Dialog 렌더링 성공', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(DeleteSvc, {
      attachTo: el, // Teleport가 실제 DOM에 붙도록 설정
      props: {
        clusterId: 1,
        nsName: 'test-nsName',
        name: 'test-svcName'
      }
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '서비스를 삭제하시겠습니까?',
      '서비스: test-svcName',
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

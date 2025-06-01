import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import DeleteDeploy from '@/components/data/DeleteDeploy.vue';

describe('DeleteDeploy.vue', () => {

  it('TC_VUE_DEPLOY_02_01: 클릭 후 삭제 Dialog 렌더링 성공', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(DeleteDeploy, {
      attachTo: el, // Teleport가 실제 DOM에 붙도록 설정
      props: {
        clusterId: 1,
        nsName: 'test-nsName',
        name: 'test-deployName'
      }
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '디플로이먼트를 삭제하시겠습니까?',
      '디플로이먼트: test-deployName',
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

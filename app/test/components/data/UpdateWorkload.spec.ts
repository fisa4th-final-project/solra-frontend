import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import UpdateWorkload from '@/components/data/UpdateWorkload.vue';
import Content from '@/__mocks__/common/Content.vue';

describe('UpdateWorkload.vue', () => {

  it('TC_VUE_WL_02_01', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(UpdateWorkload, {
      attachTo: el, // Teleport가 실제 DOM에 붙도록 설정
      global: {
        stubs: {
          UpdateSvcInWorkload: Content,
          UpdateDeployInWorkload: Content
        }
      },
      props: {
        cluster: {
          clusterId: 1,
        },
        ns: {
          name: 'test-nsName'
        }
      }
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '워크로드 수정'
    ]

    labels.forEach(label => {
      expect(document.body.innerHTML).toContain(label);
    });

    wrapper.unmount();
    document.body.removeChild(el);
  });

});

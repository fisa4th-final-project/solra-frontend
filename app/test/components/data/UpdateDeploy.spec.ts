import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import UpdateDeploy from '@/components/data/UpdateDeploy.vue';
import Form from '@/__mocks__/common/Form.vue';

describe('UpdateDeploy.vue', () => {

  it('TC_VUE_DP_05_01', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(UpdateDeploy, {
      attachTo: el, // Teleport가 실제 DOM에 붙도록 설정
      global: {
        stubs: {
          SelectClusterList: Form,
          SelectNSList: Form
        }
      },
      props: {
        clusterId: 1,
        nsName: 'test-nsName',
        name: 'test-deployName'
      }
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      'Replica Set'
    ]

    labels.forEach(label => {
      expect(document.body.innerHTML).toContain(label);
    });

    wrapper.unmount();
    document.body.removeChild(el);
  });
});

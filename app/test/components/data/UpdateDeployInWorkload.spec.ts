import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import UpdateDeployInWorkload from '@/components/data/UpdateDeployInWorkload.vue';

const updateDeployInWorkloadWrapper = () => {
  return mount(UpdateDeployInWorkload, {
    props: {
      clusterId: 1,
      nsName: 'test-nsName',
      name: 'test-deployName'
    }
  });
}
describe('UpdateDeployInWorkload.vue', () => {

  it('TC_VUE_DEPLOY_07_01: 입력 form 렌더링 성공', async () => {

    const wrapper = updateDeployInWorkloadWrapper();
    
    const labels = [
      'Replica Set'
    ]

    labels.forEach(label => {
      expect(wrapper.html()).toContain(label);
    });

    wrapper.unmount();

  });
});

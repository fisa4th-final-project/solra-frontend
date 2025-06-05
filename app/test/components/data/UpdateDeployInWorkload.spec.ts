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

  it('TC_VUE_DP_06_01', async () => {

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

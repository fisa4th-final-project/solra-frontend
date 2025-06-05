import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CreateDeployInWorkload from '@/components/data/CreateDeployInWorkload.vue';

const createDeployInWorkloadWrapper = () => {
  return mount(CreateDeployInWorkload, {
    props: {
      clusterId: 1,
      nsName: 'test-ns'
    }
  });
}
describe('CreateDeployInWorkload.vue', () => {

  it('TC_VUE_DP_02_01', async () => {

    const wrapper = createDeployInWorkloadWrapper();
    
    const labels = [
      '디플로이먼트 이름',
      '컨테이너 이름',
      '컨테이너 적용 이미지',
      '컨테이너 포트'
    ]

    labels.forEach(label => {
      expect(wrapper.html()).toContain(label);
    });

    wrapper.unmount();

  });
});

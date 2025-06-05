import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import UpdateSvcInWorkload from '@/components/data/UpdateSvcInWorkload.vue';

const updateSvcInWorkloadWrapper = () => {
  return mount(UpdateSvcInWorkload, {
    props: {
      clusterId: 1,
      nsName: 'test-nsName',
      name: 'test-svcName'
    }
  });
}

describe('UpdateSvcInWorkload.vue', () => {

  it('TC_VUE_SVC_06_01', async () => {

    const wrapper = updateSvcInWorkloadWrapper();

    const labels = [
      '기본 정보',
      '연결할 리소스 이름',
      '서비스 타입',
      '포트 정보'
    ]

    labels.forEach(label => {
      expect(wrapper.html()).toContain(label);
    });

    wrapper.unmount();
  });
});

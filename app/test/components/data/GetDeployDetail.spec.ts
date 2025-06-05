import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import GetDeployDetail from '@/components/data/GetDeployDetail.vue'
import { apiHandler } from '@/lib/global/apiManager';
import { nextTick } from 'vue';

const getDeployDetailWrapper = () => {
  return mount(GetDeployDetail, {
    props: {
      title: 'test-cluster-detail-title',
      req: {
        clusterId: 1,
        nsName: 'test-nsName',
        deployName: 'test-deployName'
      }
    }
  });
};

describe('GetDeployDetail.vue', () => {

  const mockResponse = {
    name: 'test-deploy',
    replicas: 1,
    readyReplicas: 1,
    selector: {
      app: 'test-app',
    },
    images: ['test-app:1.0'],
  };

  it('TC_VUE_DP_03_01', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spy = vi.spyOn(apiHandler, 'getDeployDetailApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockResponse);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getDeployDetailWrapper();

    expect(spy).toHaveBeenCalled();

    // skeleton 표시 확인 (응답 오기 전)
    expect(wrapper.findComponent({ name: 'VProgressCircular' }).exists()).toBe(true);

    // API 응답 처리 완료 대기
    await flushPromises();
    await nextTick();

    await new Promise(resolve => setTimeout(resolve, 100)); // 100ms 대기

    // skeleton 사라지고 label 확인
    const labels = [mockResponse.name, mockResponse.images];
    labels.forEach(label => {
      expect(wrapper.html()).toContain(label);
    });

    wrapper.unmount();
  });
});

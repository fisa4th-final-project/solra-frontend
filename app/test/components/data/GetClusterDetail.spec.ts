import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import GetClusterDetail from '@/components/data/GetClusterDetail.vue'
import * as apiHandler from '@/lib/api/cluster/getClusterDetailApi';
import { nextTick } from 'vue';

const getClusterDetailWrapper = () => {
  return mount(GetClusterDetail, {
    props: {
      title: 'test-cluster-detail-title',
      req: {
        clusterId: 1
      }
    }
  });
};

describe('GetClusterDetail.vue', () => {

  const mockResponse = {
    clusterId: 1,
    orgId: 10,
    name: 'test-cluster',
    env: 'dev',
    caCert: 'hidden',
    saToken: 'hidden',
    apiServerUrl: 'https://...',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-02')
  };

  it('TC_VUE_CL_03_01', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spy = vi.spyOn(apiHandler, 'getClusterDetailApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockResponse);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getClusterDetailWrapper();

    expect(spy).toHaveBeenCalled();

    // skeleton 표시 확인 (응답 오기 전)
    expect(wrapper.findComponent({ name: 'VProgressCircular' }).exists()).toBe(true);

    // API 응답 처리 완료 대기
    await flushPromises();
    await nextTick();

    await new Promise(resolve => setTimeout(resolve, 100)); // 100ms 대기

    // skeleton 사라지고 label 확인
    const labels = Object.values(mockResponse);
    labels.forEach(label => {
      expect(wrapper.html()).toContain(label);
    });

    wrapper.unmount();
  });
});

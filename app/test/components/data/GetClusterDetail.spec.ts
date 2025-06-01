import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import GetClusterDetail from '@/components/data/GetClusterDetail.vue'
import * as apiHandler from '@/lib/api/cluster/getClusterDetailApi';

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

  it('TC_VUE_CLUSTER_03_02: skeleton 표시 후 label 정상 렌더링', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    vi.spyOn(apiHandler, 'getClusterDetailApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockResponse);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getClusterDetailWrapper();

    // skeleton 표시 확인 (응답 오기 전)
    expect(wrapper.findComponent({ name: 'VProgressCircular' }).exists()).toBe(true);

    // API 응답 처리 완료 대기
    await flushPromises();

    // skeleton 사라지고 label 확인
    const labels = Object.keys(mockResponse);
    labels.forEach(label => {
      expect(wrapper.html()).toContain(label);
    });

    wrapper.unmount();
  });
});

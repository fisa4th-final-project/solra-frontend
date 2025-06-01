import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import GetClusterList from '@/components/data/GetClusterList.vue'
import * as apiHandler from '@/lib/api/cluster/getClusterListApi';
import { nextTick } from 'vue';

const getClusterListWrapper = () => {
  return mount(GetClusterList, {
    props: {
      req: {
        orgId: 2
      }
    }
  });
};

describe('GetClusterList.vue', () => {

  const mockResponse = [
    {
      clusterId: 1,
      orgId: 2,
      name: 'test-cluster1',
      env: 'dev',
      caCert: 'hidden',
      saToken: 'hidden',
      apiServerUrl: 'https://...',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-02')
    },
    {
      clusterId: 2,
      orgId: 2,
      name: 'test-cluster2',
      env: 'dev',
      caCert: 'hidden',
      saToken: 'hidden',
      apiServerUrl: 'https://...',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-02')
    }
  ];

  it('TC_VUE_CLUSTER_04_01: skeleton 표시 후 label 정상 렌더링', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spy = vi.spyOn(apiHandler, 'getClusterListApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockResponse);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getClusterListWrapper();
    expect(spy).toHaveBeenCalled();

    const skeletonLabel = '정보를 불러올 수 없습니다.'
    // skeleton 표시 확인 (응답 오기 전)
    expect(wrapper.html()).toContain(skeletonLabel);

    // API 응답 처리 완료 대기
    await flushPromises();
    await nextTick();
    
    await new Promise(resolve => setTimeout(resolve, 100)); // 100ms 대기   

    // skeleton 사라지고 label 확인
    const labels = mockResponse.flatMap((obj) => Object.values(obj));
    labels.forEach(label => {
      expect(wrapper.html()).toContain(label);
    });

    wrapper.unmount();
  });


  it('TC_VUE_CLUSTER_04_02: 빈 List 응답 시 skeleton 렌더링 여부', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spy = vi.spyOn(apiHandler, 'getClusterListApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([]);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getClusterListWrapper();
    
    expect(spy).toHaveBeenCalled();

    // API 응답 처리 완료 대기
    await flushPromises();
    
    // skeleton 표시 확인 (빈 List 응답 시)
    const skeletonLabel = '정보를 불러올 수 없습니다.'
    expect(wrapper.html()).toContain(skeletonLabel);

    wrapper.unmount();

  });
});

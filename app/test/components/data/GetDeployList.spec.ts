import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import GetDeployList from '@/components/data/GetDeployList.vue'
import * as apiHandler from '@/lib/api/deploy/getDeployListApi';
import { nextTick } from 'vue';

const getDeployListWrapper = () => {
  return mount(GetDeployList, {
    props: {
      req: {
        clusterId: 1,
        nsName: 'test-nsName'
      }
    }
  });
};

describe('GetDeployList.vue', () => {

  const mockResponse = [
    {
      name: 'test-deploy-01',
      replicas: 1,
      readyReplicas: 1,
      selector: {
        app: 'test-app-01',
      },
      images: ['test-app:1.0'],
    },
    {
      name: 'test-deploy-02',
      replicas: 2,
      readyReplicas: 2,
      selector: {
        app: 'test-app-02',
      },
      images: ['test-app:2.0'],
    },
  ];

  it('TC_VUE_DP_04_01', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spy = vi.spyOn(apiHandler, 'getDeployListApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockResponse);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getDeployListWrapper();
    expect(spy).toHaveBeenCalled();

    const skeletonLabel = '정보를 불러올 수 없습니다.'
    // skeleton 표시 확인 (응답 오기 전)
    expect(wrapper.html()).toContain(skeletonLabel);

    // API 응답 처리 완료 대기
    await flushPromises();
    await nextTick();
    
    await new Promise(resolve => setTimeout(resolve, 100)); // 100ms 대기 

    // skeleton 사라지고 label 확인
    const labels = mockResponse.flatMap((obj) => obj.name || obj.images);
    labels.forEach(label => {
      expect(wrapper.html()).toContain(label);
    });

    wrapper.unmount();
  });
  it('TC_VUE_DP_04_02', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spy = vi.spyOn(apiHandler, 'getDeployListApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([]);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getDeployListWrapper();
    
    expect(spy).toHaveBeenCalled();

    // API 응답 처리 완료 대기
    await flushPromises();
    
    // skeleton 표시 확인 (빈 List 응답 시)
    const skeletonLabel = '정보를 불러올 수 없습니다.'
    expect(wrapper.html()).toContain(skeletonLabel);

    wrapper.unmount();

  });
});

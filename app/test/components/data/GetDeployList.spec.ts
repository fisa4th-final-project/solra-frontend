import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import GetDeployList from '@/components/data/GetDeployList.vue'
import * as apiHandler from '@/lib/api/deploy/getDeployListApi';

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

  it('TC_VUE_DEPLOY_04_01: skeleton 표시 후 label 정상 렌더링', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    vi.spyOn(apiHandler, 'getDeployListApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockResponse);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getDeployListWrapper();

    const skeletonLabel = '정보를 불러올 수 없습니다.'
    // skeleton 표시 확인 (응답 오기 전)
    expect(wrapper.html()).toContain(skeletonLabel);

    // API 응답 처리 완료 대기
    await flushPromises();

    // skeleton 사라지고 label 확인
    const labels = Object.keys(mockResponse);
    labels.forEach(label => {
      expect(wrapper.html()).toContain(label);
    });

    wrapper.unmount();
  });
  it('TC_VUE_DEPLOY_04_02: 빈 List 응답 시 skeleton 렌더링 여부', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    vi.spyOn(apiHandler, 'getDeployListApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([]);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getDeployListWrapper();
    
    // API 응답 처리 완료 대기
    await flushPromises();
    
    // skeleton 표시 확인 (빈 List 응답 시)
    const skeletonLabel = '정보를 불러올 수 없습니다.'
    expect(wrapper.html()).toContain(skeletonLabel);

    wrapper.unmount();

  });
});

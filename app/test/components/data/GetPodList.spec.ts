import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import GetPodList from '@/components/data/GetPodList.vue'
import { apiHandler } from '@/lib/global/apiManager';
import { nextTick } from 'vue';

const getPodListWrapper = () => {
  return mount(GetPodList, {
    props: {
      req: {
        clusterId: 1,
        nsName: 'test-nsName'
      }
    }
  });
};

describe('GetPodList.vue', () => {

  const mockResponse = [
    {
      name: 'test-pod-name-01',
      phase: 'test-pod-phase-01',
      podIP: 'test-pod-ip-01',
      nodeName: 'test-nodeName-01'
    },
    {
      name: 'test-pod-name-02',
      phase: 'test-pod-phase-02',
      podIP: 'test-pod-ip-02',
      nodeName: 'test-nodeName-02'
    },
  ];

  it('TC_VUE_POD_04_01: skeleton 표시 후 label 정상 렌더링', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spy = vi.spyOn(apiHandler, 'getPodListApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockResponse);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getPodListWrapper();

    expect(spy).toHaveBeenCalled();

    const skeletonLabel = '정보를 불러올 수 없습니다.'

    // skeleton 표시 확인 (응답 오기 전)
    expect(wrapper.html()).toContain(skeletonLabel);
    
    // API 응답 처리 완료 대기
    await flushPromises();
    await nextTick();

    await new Promise(resolve => setTimeout(resolve, 100)); // 100ms 대기


    // skeleton 사라지고 label 확인
    const labels = mockResponse.flatMap(obj => Object.values(obj));
    labels.forEach(label => {
      expect(wrapper.text()).toContain(label);
    });

    wrapper.unmount();
  });

  
  it('TC_VUE_POD_04_02: 빈 List 응답 시 skeleton 렌더링 여부', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spy = vi.spyOn(apiHandler, 'getPodListApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([]);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getPodListWrapper();
    
    expect(spy).toHaveBeenCalled();

    // API 응답 처리 완료 대기
    await flushPromises();
    
    // skeleton 표시 확인 (빈 List 응답 시)
    const skeletonLabel = '정보를 불러올 수 없습니다.'
    expect(wrapper.html()).toContain(skeletonLabel);

    wrapper.unmount();

  });
});

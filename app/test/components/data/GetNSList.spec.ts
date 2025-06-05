import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import GetNSList from '@/components/data/GetNSList.vue'
import { apiHandler } from '@/lib/global/apiManager';
import { nextTick } from 'vue';

const getNSListWrapper = () => {
  return mount(GetNSList, {
    props: {
      req: {
        clusterId: 1
      }
    }
  });
};

describe('GetNSList.vue', () => {

  const mockResponse = [
    {
      name: 'test-ns-name-01',
      status: 'test-ns-status-01',
      labels: '{}',
      annotations: '{}',
      createdAt: new Date('2025-05-19')
    },
    {
      name: 'test-ns-name-02',
      status: 'test-ns-status-02',
      labels: '{}',
      annotations: '{}',
      createdAt: new Date('2025-05-20')
    },
  ];

  it('TC_VUE_NS_04_01', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spy = vi.spyOn(apiHandler, 'getNSListApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockResponse);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getNSListWrapper();

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
      expect(wrapper.html()).toContain(label);
    });

    wrapper.unmount();
  });


  it('TC_VUE_NS_04_02', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spy = vi.spyOn(apiHandler, 'getNSListApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([]);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getNSListWrapper();
    
    expect(spy).toHaveBeenCalled();

    // API 응답 처리 완료 대기
    await flushPromises();

    // skeleton 표시 확인 (빈 List 응답 시)
    const skeletonLabel = '정보를 불러올 수 없습니다.'
    expect(wrapper.html()).toContain(skeletonLabel);

    wrapper.unmount();

  });
});

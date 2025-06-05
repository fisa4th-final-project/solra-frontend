import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import GetNSDetail from '@/components/data/GetNSDetail.vue'
import { apiHandler } from '@/lib/global/apiManager';
import { nextTick } from 'vue';

const getNSDetailWrapper = () => {
  return mount(GetNSDetail, {
    props: {
      title: 'test-ns-detail-title',
      req: {
        clusterId: 1,
        name: 'test-nsName'
      }
    }
  });
};

describe('GetNSDetail.vue', () => {

  const mockResponse = {
    name: 'test-ns-name',
    status: 'test-ns-status',
    labels: '{}',
    annotations: '{}',
    createdAt: new Date('2025-05-19')
  };

  it('TC_VUE_NS_03_01', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spy = vi.spyOn(apiHandler, 'getNSDetailApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockResponse);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getNSDetailWrapper();
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

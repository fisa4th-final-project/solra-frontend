import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import SelectNSList from '@/components/data/SelectNSList.vue'
import { apiHandler } from '@/lib/global/apiManager'
import { nextTick } from 'vue';

const selectNSListWrapper = (el?: HTMLDivElement) => {
  return mount(SelectNSList, {
    props: {
      form: {
        cluster: {
          clusterId: 2
        },
        ns: {
          name: ''
        }
      }
    },
    attachTo: el
  });
};

describe('SelectNSList.vue', () => {

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
      createdAt: new Date('2025-05-29')
    },
  ];

  it('TC_VUE_NS_02_01', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spy = vi.spyOn(apiHandler, 'getNSListApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockResponse);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = selectNSListWrapper();

    expect(spy).toHaveBeenCalled();

    // API 응답 처리 완료 대기
    await flushPromises();
    await nextTick();
  
    await new Promise(resolve => setTimeout(resolve, 100)); // 100ms 대기

    expect(wrapper.vm.nsList).toStrictEqual(mockResponse);

    wrapper.unmount();
  });

});

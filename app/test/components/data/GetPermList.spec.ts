import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import GetPermList from '@/components/data/GetPermList.vue'
import { apiHandler } from '@/lib/global/apiManager';
import { nextTick } from 'vue';

const getPermListWrapper = () => {
  return mount(GetPermList, {
    props: {
      req: {
        clusterId: 1
      }
    }
  });
};

describe('GetPermList.vue', () => {

  const mockResponse = [
    {
      permissionId: 1,
      permissionName: 'test-perm-name-01',
      description: 'test-perm-desc-01',
    },
    {
      permissionId: 2,
      permissionName: 'test-perm-name-02',
      description: 'test-perm-desc-02',
    },
  ];

  it('TC_VUE_PERM_04_01: label 정상 렌더링', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spy = vi.spyOn(apiHandler, 'getPermListApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockResponse);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getPermListWrapper();

    expect(spy).toHaveBeenCalled();

    // API 응답 처리 완료 대기
    await flushPromises();
    await nextTick();

    await new Promise(resolve => setTimeout(resolve, 100)); // 100ms 대기

    // label 확인
    const labels = mockResponse.flatMap((o) => Object.values(o));    
    labels.forEach(label => {
      expect(wrapper.html()).toContain(label);
    });

    wrapper.unmount();
  });
});

import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import SelectOrgList from '@/components/data/SelectOrgList.vue'
import { apiHandler } from '@/lib/global/apiManager'
import { nextTick } from 'vue';

const selectOrgListWrapper = (el?: HTMLDivElement) => {
  return mount(SelectOrgList, {
    props: {
      form: {
        org: {
          orgId: 0,
          orgName: ''
        }
      }
    },
    attachTo: el
  });
};

describe('SelectOrgList.vue', () => {

  const mockResponse = [
    {
      orgId: 1,
      orgName: 'test-orgName-01'
    },
    {
      orgId: 2,
      orgName: 'test-orgName-02'
    },
 
  ];

  it('TC_VUE_ORG_04_01', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spy = vi.spyOn(apiHandler, 'getOrgListApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockResponse);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = selectOrgListWrapper();

    expect(spy).toHaveBeenCalled();

    // API 응답 처리 완료 대기
    await flushPromises();
    await nextTick();
  
    await new Promise(resolve => setTimeout(resolve, 100)); // 100ms 대기

    expect(wrapper.vm.orgs).toStrictEqual(mockResponse);

    wrapper.unmount();
  });

  // TODO: row item 클릭 시 권한 상세 노출 확인
});

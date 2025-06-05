import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import SelectDeptList from '@/components/data/SelectDeptList.vue'
import { apiHandler } from '@/lib/global/apiManager'
import { nextTick } from 'vue';

const selectDeptListWrapper = (el?: HTMLDivElement) => {
  return mount(SelectDeptList, {
    props: {
      orgId: 1,
      form: {
        dept: {
          deptId: 0,
          deptName: ''
        }
      }
    },
    attachTo: el
  });
};

describe('SelectDeptList.vue', () => {

  const mockResponse = [
    {
      deptId: 1,
      orgId: 1,
      deptName: 'test-dept-name-01',
    },
    {
      deptId: 2,
      orgId: 2,
      deptName: 'test-dept-name-02',
    },
  ];

  it('TC_VUE_DEPT_05_01', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spy = vi.spyOn(apiHandler, 'getDeptListApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockResponse);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = selectDeptListWrapper();

    expect(spy).toHaveBeenCalled();

    // API 응답 처리 완료 대기
    await flushPromises();
    await nextTick();
  
    await new Promise(resolve => setTimeout(resolve, 100)); // 100ms 대기

    expect(wrapper.vm.depts).toStrictEqual(mockResponse);

    wrapper.unmount();
  });

});

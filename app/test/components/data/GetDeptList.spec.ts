import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import GetDeptList from '@/components/data/GetDeptList.vue'
import * as apiHandler from '@/lib/api/dept/getDeptListApi';
import { nextTick } from 'vue';

const getDeptListWrapper = () => {
  return mount(GetDeptList, {
    props: {
      req: {
        org_id: 1
      }
    }
  });
};

describe('GetDeptList.vue', () => {

  const mockResponse = [
    {
      deptId: 1,
      orgId: 1,
      deptName: 'test-deptName-01',
    },
    {
      deptId: 2,
      orgId: 2,
      deptName: 'test-deptName-02',
    }
  ];

  it('TC_VUE_DEPT_04_01', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spy = vi.spyOn(apiHandler, 'getDeptListApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockResponse);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getDeptListWrapper();
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


  it('TC_VUE_DEPT_04_02', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spy = vi.spyOn(apiHandler, 'getDeptListApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([]);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getDeptListWrapper();
    
    expect(spy).toHaveBeenCalled();

    // API 응답 처리 완료 대기
    await flushPromises();
    
    // skeleton 표시 확인 (빈 List 응답 시)
    const skeletonLabel = '정보를 불러올 수 없습니다.'
    expect(wrapper.html()).toContain(skeletonLabel);

    wrapper.unmount();

  });
});

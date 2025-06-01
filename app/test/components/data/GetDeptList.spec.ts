import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import GetDeptList from '@/components/data/GetDeptList.vue'
import * as apiHandler from '@/lib/api/dept/getDeptListApi';

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

  it('TC_VUE_DEPT_04_01: skeleton 표시 후 label 정상 렌더링', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    vi.spyOn(apiHandler, 'getDeptListApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockResponse);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getDeptListWrapper();

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
  it('TC_VUE_DEPT_04_02: 빈 List 응답 시 skeleton 렌더링 여부', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    vi.spyOn(apiHandler, 'getDeptListApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([]);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getDeptListWrapper();
    
    // API 응답 처리 완료 대기
    await flushPromises();
    
    // skeleton 표시 확인 (빈 List 응답 시)
    const skeletonLabel = '정보를 불러올 수 없습니다.'
    expect(wrapper.html()).toContain(skeletonLabel);

    wrapper.unmount();

  });
});

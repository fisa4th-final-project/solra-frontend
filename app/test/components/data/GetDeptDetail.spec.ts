import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import GetDeptDetail from '@/components/data/GetDeptDetail.vue'
import * as apiHandler from '@/lib/api/dept/getDeptDetailApi'

const getDeptDetailWrapper = () => {
  return mount(GetDeptDetail, {
    props: {
      title: 'test-cluster-detail-title',
      req: {
        deptId: 1
      }
    }
  });
};

describe('GetDeptDetail.vue', () => {

  const mockResponse = {
    deptId: 1,
    organizationId: 1,
    deptName: 'test-deptName'
  };

  it('TC_VUE_DEPT_03_01: skeleton 표시 후 label 정상 렌더링', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    vi.spyOn(apiHandler, 'getDeptDetailApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockResponse);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getDeptDetailWrapper();

    // skeleton 표시 확인 (응답 오기 전)
    expect(wrapper.findComponent({ name: 'VProgressCircular' }).exists()).toBe(true);

    // API 응답 처리 완료 대기
    await flushPromises();

    // skeleton 사라지고 label 확인
    const labels = Object.keys(mockResponse);
    labels.forEach(label => {
      expect(wrapper.html()).toContain(label);
    });

    wrapper.unmount();
  });
});

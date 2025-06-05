import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import GetDeptDetail from '@/components/data/GetDeptDetail.vue'
import * as apiHandler from '@/lib/api/dept/getDeptDetailApi'
import { nextTick } from 'vue';

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

  it('TC_VUE_DEPT_03_01', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spy = vi.spyOn(apiHandler, 'getDeptDetailApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockResponse);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getDeptDetailWrapper();

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

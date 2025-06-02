import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import GetOrgDetail from '@/components/data/GetOrgDetail.vue'
import * as apiHandler from '@/lib/api/org/getOrgDetailApi'
import { nextTick } from 'vue';

const getOrgDetailWrapper = () => {
  return mount(GetOrgDetail, {
    props: {
      title: 'test-org-detail-title',
      req: {
        orgId: 1
      }
    }
  });
};

describe('GetOrgDetail.vue', () => {

  const mockResponse = {
    orgId: 1,
    orgName: 'test-orgName'
  };

  it('TC_VUE_ORG_03_01: skeleton 표시 후 label 정상 렌더링', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spy = vi.spyOn(apiHandler, 'getOrgDetailApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockResponse);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getOrgDetailWrapper();

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

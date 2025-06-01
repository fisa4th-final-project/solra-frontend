import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import GetNodeDetail from '@/components/data/GetNodeDetail.vue'
import * as apiHandler from '@/lib/api/node/getNodeDetail.Api'

const getNodeDetailWrapper = () => {
  return mount(GetNodeDetail, {
    props: {
      title: 'test-node-detail-title',
      req: {
        clusterId: 1,
        nodeName: 'test-nodeName'
      }
    }
  });
};

describe('GetNodeDetail.vue', () => {

  const mockResponse = {
    name: 'test-node-name',
    status: 'test-node-status',
    capacity: {
      cpu: 'test-node-cap-cpu',
      ephemeralStorage: 'test-node-cap-stor',
      hugepages1Gi: 'test-node-cap-1Gi',
      hugepages2Mi: 'test-node-cap-2Mi',
      memory: 'test-node-cap-mem',
      pods: 'test-node-cap-pods'
    },
    allocatable: {
      cpu: 'test-node-all-cpu',
      ephemeralStorage: 'test-node-all-stor',
      hugepages1Gi: 'test-node-all-1Gi',
      hugepages2Mi: 'test-node-all-2Mi',
      memory: 'test-node-all-mem',
      pods: 'test-node-all-pods'
    }
  };

  it('TC_VUE_NODE_03_01: skeleton 표시 후 label 정상 렌더링', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    vi.spyOn(apiHandler, 'getNodeDetailApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockResponse);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getNodeDetailWrapper();

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

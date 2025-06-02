import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import GetNodeList from '@/components/data/GetNodeList.vue'
import * as apiHandler from '@/lib/api/node/getNodeListApi';
import { nextTick } from 'vue';

const getNodeListWrapper = () => {
  return mount(GetNodeList, {
    props: {
      req: {
        clusterId: 1
      }
    }
  });
};

describe('GetNodeList.vue', () => {

  const mockResponse = [
    {
      clusterId: '1',
      name: 'test-node-name-01',
      status: 'test-node-status-01',
      capacity: {
        cpu: 'test-node-cap-cpu-01',
        ephemeralStorage: 'test-node-cap-stor-01',
        hugepages1Gi: 'test-node-cap-1Gi-01',
        hugepages2Mi: 'test-node-cap-2Mi-01',
        memory: 'test-node-cap-mem-01',
        pods: 'test-node-cap-pod-01s'
      },
      allocatable: {
        cpu: 'test-node-all-cpu-01',
        ephemeralStorage: 'test-node-all-stor-01',
        hugepages1Gi: 'test-node-all-1Gi-01',
        hugepages2Mi: 'test-node-all-2Mi-01',
        memory: 'test-node-all-mem-01',
        pods: 'test-node-all-pods-01'
      }
    },
    {
      clusterId: '1',
      name: 'test-node-name-02',
      status: 'test-node-status-02',
      capacity: {
        cpu: 'test-node-cap-cpu-02',
        ephemeralStorage: 'test-node-cap-stor-02',
        hugepages1Gi: 'test-node-cap-1Gi-02',
        hugepages2Mi: 'test-node-cap-2Mi-02',
        memory: 'test-node-cap-mem-02',
        pods: 'test-node-cap-pod-02s'
      },
      allocatable: {
        cpu: 'test-node-all-cpu-02',
        ephemeralStorage: 'test-node-all-stor-02',
        hugepages1Gi: 'test-node-all-1Gi-02',
        hugepages2Mi: 'test-node-all-2Mi-02',
        memory: 'test-node-all-mem-02',
        pods: 'test-node-all-pods-02'
      }
    },
  ];

  it('TC_VUE_NODE_04_01: skeleton 표시 후 label 정상 렌더링', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spy = vi.spyOn(apiHandler, 'getNodeListApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockResponse);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getNodeListWrapper();
    expect(spy).toHaveBeenCalled();

    const skeletonLabel = '정보를 불러올 수 없습니다.'
    // skeleton 표시 확인 (응답 오기 전)
    expect(wrapper.html()).toContain(skeletonLabel);

    // API 응답 처리 완료 대기
    await flushPromises();
    await nextTick();
    
    await new Promise(resolve => setTimeout(resolve, 100)); // 100ms 대기
    

    // skeleton 사라지고 label 확인
    const labels = mockResponse.flatMap(obj => obj.name || obj.status);
    labels.forEach(label => {
      expect(wrapper.html()).toContain(label);
    });

    wrapper.unmount();
  });


  it('TC_VUE_NODE_04_02: 빈 List 응답 시 skeleton 렌더링 여부', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spy = vi.spyOn(apiHandler, 'getNodeListApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([]);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getNodeListWrapper();
    
    expect(spy).toHaveBeenCalled();
    // API 응답 처리 완료 대기
    await flushPromises();
    
    // skeleton 표시 확인 (빈 List 응답 시)
    const skeletonLabel = '정보를 불러올 수 없습니다.'
    expect(wrapper.html()).toContain(skeletonLabel);

    wrapper.unmount();

  });
});

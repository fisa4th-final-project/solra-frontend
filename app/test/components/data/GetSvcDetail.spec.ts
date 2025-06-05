import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import GetSvcDetail from '@/components/data/GetSvcDetail.vue'
import { apiHandler } from '@/lib/global/apiManager';
import { nextTick } from 'vue';

const getSvcDetailWrapper = () => {
  return mount(GetSvcDetail, {
    props: {
      title: 'test-ns-detail-title',
      req: {
        clusterId: 1,
        nsName: 'test-nsName',
        name: 'test-svcName'
      }
    }
  });
};

describe('GetSvcDetail.vue', () => {

  const mockResponse = {
    name: 'test-svc-name',
    type: 'test-svc-type',
    clusterIP: '10.5.100.122',
    selector: {
      app: 'test-app-name'
    },
    ports: [
      {
        protocol: 'TCP',
        port: 8080,
        targetPort: 30180,
        nodePort: 8080
      }
    ]
  };

  it('TC_VUE_SVC_03_01: skeleton 표시 후 label 정상 렌더링', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spy = vi.spyOn(apiHandler, 'getSvcDetailApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockResponse);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getSvcDetailWrapper();
    expect(spy).toHaveBeenCalled();

    // skeleton 표시 확인 (응답 오기 전)
    expect(wrapper.findComponent({ name: 'VProgressCircular' }).exists()).toBe(true);

    // API 응답 처리 완료 대기
    await flushPromises();
    await nextTick();

    await new Promise(resolve => setTimeout(resolve, 100)); // 100ms 대기

    // skeleton 사라지고 label 확인
    const labels = [
      mockResponse.name,
      mockResponse.clusterIP,
      mockResponse.type
    ];
    labels.forEach(label => {
      expect(wrapper.html()).toContain(label);
    });

    wrapper.unmount();
  });
});

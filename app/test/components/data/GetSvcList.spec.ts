import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import GetSvcList from '@/components/data/GetSvcList.vue'
import { apiHandler } from '@/lib/global/apiManager';
import { nextTick } from 'vue';

const getSvcListWrapper = () => {
  return mount(GetSvcList, {
    props: {
      req: {
        clusterId: 1,
        nsName: 'test-nsName'
      }
    }
  });
};

describe('GetSvcList.vue', () => {

  const mockResponse = [
    {
      name: 'test-svc-name-01',
      type: 'test-svc-type-01',
      clusterIP: '10.5.100.121',
      selector: {
        app: 'test-app-name-01'
      },
      ports: [
        {
          protocol: 'TCP',
          port: 8081,
          targetPort: 30181,
          nodePort: 8081
        }
      ]
    },
    {
      name: 'test-svc-name-02',
      type: 'test-svc-type-02',
      clusterIP: '10.5.100.122',
      selector: {
        app: 'test-app-name-02'
      },
      ports: [
        {
          protocol: 'UDP',
          port: 8082,
          targetPort: 30182,
          nodePort: 8082
        }
      ]
    },
  ];

  it('TC_VUE_SVC_04_01: skeleton 표시 후 label 정상 렌더링', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spy = vi.spyOn(apiHandler, 'getSvcListApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockResponse);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getSvcListWrapper();

    expect(spy).toHaveBeenCalled();

    const skeletonLabel = '정보를 불러올 수 없습니다.'

    // skeleton 표시 확인 (응답 오기 전)
    expect(wrapper.html()).toContain(skeletonLabel);
    
    // API 응답 처리 완료 대기
    await flushPromises();
    await nextTick();

    await new Promise(resolve => setTimeout(resolve, 100)); // 100ms 대기


    // skeleton 사라지고 label 확인
    const labels = [
      mockResponse[0].clusterIP,
      mockResponse[0].name,
      mockResponse[0].type,
      mockResponse[1].clusterIP,
      mockResponse[1].name,
      mockResponse[1].type,
    ]
    labels.forEach(label => {
      expect(wrapper.text()).toContain(label);
    });

    wrapper.unmount();
  });

  
  it('TC_VUE_SVC_04_02: 빈 List 응답 시 skeleton 렌더링 여부', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spy = vi.spyOn(apiHandler, 'getSvcListApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([]);
        }, 10); // 10ms 지연
      });
    });

    const wrapper = getSvcListWrapper();
    
    expect(spy).toHaveBeenCalled();

    // API 응답 처리 완료 대기
    await flushPromises();
    
    // skeleton 표시 확인 (빈 List 응답 시)
    const skeletonLabel = '정보를 불러올 수 없습니다.'
    expect(wrapper.html()).toContain(skeletonLabel);

    wrapper.unmount();

  });
});

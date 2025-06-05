import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import SelectClusterList from '@/components/data/SelectClusterList.vue'
import { apiHandler } from '@/lib/global/apiManager'
import { nextTick } from 'vue';

const selectClusterListWrapper = (el?: HTMLDivElement) => {
  return mount(SelectClusterList, {
    props: {
      form: {
        cluster: {
          clusterId: 0, // 상위 컴포넌트로 부터 빈 form을 받음
          name: ''
        }
      }
    },
    attachTo: el
  });
};

describe('SelectClusterList.vue', () => {

  const mockResponse = [
    {
      clusterId: 1,
      orgId: 1,
      name: 'test-cluster-name-01',
      env: 'test-cluster-env-01',
      caCert: 'test-cluster-cacert-01',
      saToken: 'test-cluster-satoken-01',
      apiServerUrl: 'test-cluster-api-01',
      createdAt: new Date('2025-05-19'),
      updatedAt: new Date('2025-05-19'),
    },
    {
      clusterId: 2,
      orgId: 2,
      name: 'test-cluster-name-02',
      env: 'test-cluster-env-02',
      caCert: 'test-cluster-cacert-02',
      saToken: 'test-cluster-satoken-02',
      apiServerUrl: 'test-cluster-api-02',
      createdAt: new Date('2025-05-29'),
      updatedAt: new Date('2025-05-29'),
    },
  ];

  it('TC_VUE_CL_02_01', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spy = vi.spyOn(apiHandler, 'getClusterListApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockResponse);
        }, 10); // 10ms 지연
      });
    });

    const el = document.createElement('div')
    document.body.appendChild(el);

    const wrapper = selectClusterListWrapper(el);

    expect(spy).toHaveBeenCalled();

    // API 응답 처리 완료 대기
    await flushPromises();
    await nextTick();
  
    await new Promise(resolve => setTimeout(resolve, 100)); // 100ms 대기

    expect(wrapper.vm.clusterList).toStrictEqual(mockResponse);

    wrapper.unmount();
    document.body.removeChild(el);
  });
});

import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import UpdateCluster from '@/components/data/UpdateCluster.vue'
import { apiHandler } from '@/lib/global/apiManager'
import { nextTick } from 'vue';

const updateClusterWrapper = (el?: HTMLDivElement) => {
  return mount(UpdateCluster, {
    props: {
      clusterId: 1
    },
    attachTo: el
  });
};

describe('UpdateCluster.vue', () => {

  const mockResponse = {
    clusterId: 1,
    orgId: 10,
    name: 'test-cluster',
    env: 'dev',
    caCert: 'hidden',
    saToken: 'hidden',
    apiServerUrl: 'https://...',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-02')
  };

  it('TC_VUE_CLUSTER_06_01: 클릭 후 입력 form 렌더링 성공', async () => {
    // skeleton을 테스트하기 위한 mock 구현
    const spy = vi.spyOn(apiHandler, 'getClusterDetailApi').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockResponse);
        }, 10); // 10ms 지연
      });
    });

    const el = document.createElement('div')
    document.body.appendChild(el);

    const wrapper = updateClusterWrapper(el);

    
    // API 응답 처리 완료 대기
    await flushPromises();
    await nextTick();

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    await new Promise(resolve => setTimeout(resolve, 100)); // 100ms 대기
    
    expect(spy).toHaveBeenCalled();

    const labels = [
      '클러스터 이름',
      '클러스터 환경',
      '클러스터 API 서버 엔드포인트',
      '클러스터 ca.cert',
      '클러스터 서비스 어카운트 oAuth'
    ]

    labels.forEach(label => {
      expect(document.body.innerHTML).toContain(label);
    });

    wrapper.unmount();
    document.body.removeChild(el);

  });

});

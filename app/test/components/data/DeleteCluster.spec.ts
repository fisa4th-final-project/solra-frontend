import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import DeleteCluster from '@/components/data/DeleteCluster.vue';

describe('DeleteCluster.vue', () => {

  it('TC_VUE_CLUSTER_02_01: 클릭 후 삭제 Dialog 렌더링 성공', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(DeleteCluster, {
      attachTo: el, // Teleport가 실제 DOM에 붙도록 설정
      props: {
        cluster: {
          clusterId: 1,
          name: 'test-clusterName'
        }
      }
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '클러스터 정보를 삭제하시겠습니까?',
      '클러스터: test-clusterName',
      '취소',
      '삭제'
    ]

    labels.forEach(label => {
      expect(document.body.innerHTML).toContain(label);
    });

    wrapper.unmount();
    document.body.removeChild(el);
  });

});

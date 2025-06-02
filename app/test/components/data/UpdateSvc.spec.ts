import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import UpdateSvc from '@/components/data/UpdateSvc.vue';

describe('UpdateSvc.vue', () => {

  it('TC_VUE_SVC_01_01: 클릭 후 입력 form 렌더링 성공', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(UpdateSvc, {
      attachTo: el, // Teleport가 실제 DOM에 붙도록 설정
      props: {
        clusterId: 1,
        nsName: 'test-nsName',
        name: 'test-svcName'
      }
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '기본 정보',
      '연결할 리소스 이름',
      '서비스 타입',
      '포트 정보'
    ]

    labels.forEach(label => {
      expect(document.body.innerHTML).toContain(label);
    });

    wrapper.unmount();
    document.body.removeChild(el);
  });
});

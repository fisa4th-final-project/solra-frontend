import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import CreateWorkload from '@/components/data/CreateWorkload.vue';
import Form from '@/__mocks__/common/Form.vue';

describe('CreateWorkload.vue', () => {

  it('TC_VUE_WORKLOAD_01_01: 클릭 후 입력 form 렌더링 성공', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(CreateWorkload, {
      attachTo: el, // Teleport가 실제 DOM에 붙도록 설정
      global: {
        stubs: {
          CreateDeployInWorkload: Form,
          CreateSvcInWorkload: Form
        }
      },
      props: {
        cluster: {
          clusterId: 1,
        },
        ns: {
          name: 'test-nsName'
        }
      }
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '워크로드 추가',
      'SVC 정의',
      'DEPLOY 정의'
    ]

    labels.forEach(label => {
      expect(document.body.innerHTML).toContain(label);
    });

    wrapper.unmount();
    document.body.removeChild(el);
  });

});

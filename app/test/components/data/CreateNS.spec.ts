import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import SideContents from '@/__mocks__/layout/SideContents.vue';
import CreateNS from '@/components/data/CreateNS.vue';
import Form from '@/__mocks__/common/Form.vue';

const createNSWrapper = () => {
  return mount(CreateNS, {
    global: {
      stubs: {
        SideContents: SideContents,
        SelectClusterList: Form,
      }
    }
  });
}
describe('CreateNS.vue', () => {

  it('TC_VUE_NAMESPACE_01_01: 클릭 후 입력 form 렌더링 성공', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(CreateNS, {
      attachTo: el, // Teleport가 실제 DOM에 붙도록 설정
      global: {
        stubs: {
          SelectClusterList: Form
        }
      }
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '네임스페이스 이름'
    ]

    labels.forEach(label => {
      expect(document.body.innerHTML).toContain(label);
    });

    wrapper.unmount();
    document.body.removeChild(el);
  });

  const baseValues = {
    cluster: {clusterId: 1, name: 'test-clusterName'},
    nsName: 'test-nsName',
  }

  const requiredFields = [
    'cluster',
    'nsName',
  ]

  requiredFields.forEach((field, idx) => {
    it(`TC_VUE_NAMESPACE_01_02_${idx}: ${field} 미입력 시 validate 실패`, async () => {
      const wrapper = createNSWrapper();

      // 모든 값 설정
      wrapper.vm.form.cluster = baseValues.cluster;
      await wrapper.find('[data-test="input-namespace-name"] input').setValue(baseValues.nsName);

      // 특정 필드만 비우기
      switch (field) {
        case 'cluster':
          wrapper.vm.form.cluster = {clusterId: 0, name:''}
          break;
        case 'nsName':
          await wrapper.find('[data-test="input-namespace-name"] input').setValue('');
          break;
      }

      await flushPromises();
      await nextTick();

      expect(wrapper.vm.valid).toBe(false);
    });
  });
});

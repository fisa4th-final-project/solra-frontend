import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import SideContents from '@/__mocks__/layout/SideContents.vue';
import CreateSvc from '@/components/data/CreateSvc.vue';
import Form from '@/__mocks__/common/Form.vue';

const createSvcWrapper = () => {
  return mount(CreateSvc, {
    global: {
      stubs: {
        SideContents: SideContents,
        SelectClusterList: Form,
        SelectNSList: Form
      }
    },
    props: {
      clusterId: 1,
      nsName: 'test-nsName'
    }
  });
}
describe('CreateSvc.vue', () => {

  it('TC_VUE_SVC_01_01: 클릭 후 입력 form 렌더링 성공', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(CreateSvc, {
      attachTo: el, // Teleport가 실제 DOM에 붙도록 설정
      global: {
        stubs: {
          SelectClusterList: Form,
          SelectNSList: Form
        }
      },
      props: {
        clusterId: 1,
        nsName: 'test-nsName'
      }
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '기본 정보',
      '서비스 이름',
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

  const baseValues = {
    svcName: 'test-svcName',
    appName: 'test-appName',
    svcType: 'NodePort',
    ports: [{
      protocol: 'test-tcp',
      port: 6001,
      targetPort: 6001,
      nodePort: 30001
    }]
  }

  const requiredFields = [
    'svcName',
    'appName',
    'svcType',
    'ports'
  ]

  requiredFields.forEach((field, idx) => {
    it(`TC_VUE_SVC_01_02_${idx}: ${field} 미입력 시 validate 여부`, async () => {
      const wrapper = createSvcWrapper();

      // 모든 값 설정
      await wrapper.find('[data-test="input-svc-name"] input').setValue(baseValues.svcName);
      await wrapper.find('[data-test="input-app-name"] input').setValue(baseValues.appName);
      await wrapper.find('[data-test="input-svc-type"] input').setValue(baseValues.svcType);
      wrapper.vm.form.ports = baseValues.ports;

      // 특정 필드만 비우기
      switch (field) {
        case 'svcName':
          await wrapper.find('[data-test="input-svc-name"] input').setValue('');
          await flushPromises();
          await nextTick();
          expect(wrapper.vm.valid).toBe(false);
          break;
        case 'appName': 
          await wrapper.find('[data-test="input-app-name"] input').setValue('');
          await flushPromises();
          await nextTick();
          expect(wrapper.vm.valid).toBe(false);
          break;
        case 'svcType': 
          await wrapper.find('[data-test="input-svc-type"] input').setValue('');
          await flushPromises();
          await nextTick();
          expect(wrapper.vm.valid).toBe(null); // select box는 빈 값일 때 null 처리
          break;
        case 'ports': 
          wrapper.vm.form.ports = [];
          await flushPromises();
          await nextTick();
          expect(wrapper.vm.valid).toBe(false);
          break;
      }
    });
  });

  // TODO: port 내에서도 required 체크 기능 추가 
});

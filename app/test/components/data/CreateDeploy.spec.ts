import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import SideContents from '@/__mocks__/layout/SideContents.vue';
import CreateDeploy from '@/components/data/CreateDeploy.vue';

const createClusterWrapper = () => {
  return mount(CreateDeploy, {
    global: {
      stubs: {
        SideContents: SideContents,
        SelectClusterList: true,
        SelectNSList: true
      }
    }
  });
}
describe('CreateDeploy.vue', () => {

  it('TC_VUE_DEPLOY_02_01: 클릭 후 입력 form 렌더링 성공', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(CreateDeploy, {
      attachTo: el // Teleport가 실제 DOM에 붙도록 설정
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '디플로이먼트 이름',
      '컨테이너 이름',
      '컨테이너 적용 이미지',
      '컨테이너 포트'
    ]

    labels.forEach(label => {
      expect(document.body.innerHTML).toContain(label);
    });

    wrapper.unmount();
    document.body.removeChild(el);
  });

    const baseValues = {
      cluster: {clusterId: 1, name: 'test-clusterName'},
      ns: {name: 'test-nsName'},
      deployName: 'test-deployName',
      containerName: 'test-containerName',
      containerImage: 'test-containerImage',
      containerPort: 'test-containerPort'
    }

    const requiredFields = [
      'cluster',
      'namespace',
      'deployName',
      'containerName',
      'containerImage',
      'containerPort'
    ]

    requiredFields.forEach((field, idx) => {
      it(`TC_VUE_DEPLOY_02_02_${idx}: ${field} 미입력 시 validate 실패`, async () => {
        const wrapper = createClusterWrapper();

        // 모든 값 설정
        wrapper.vm.form.cluster = baseValues.cluster;
        wrapper.vm.form.ns = baseValues.ns;
        await wrapper.find('[data-test="input-deploy-name"] input').setValue(baseValues.deployName);
        await wrapper.find('[data-test="input-container-name"] input').setValue(baseValues.containerName);
        await wrapper.find('[data-test="input-container-image"] input').setValue(baseValues.containerImage);
        await wrapper.find('[data-test="input-container-port"] input').setValue(baseValues.containerPort);

        // 특정 필드만 비우기
        switch (field) {
          case 'cluster':
            wrapper.vm.form.cluster = {clusterId: 0, name:''}
            break;
          case 'namespace':
            wrapper.vm.form.ns = {name: ''}
            break;
          case 'deployName':
            await wrapper.find('[data-test="input-deploy-name"] input').setValue('');
            break;
          case 'containerName':
            await wrapper.find('[data-test="input-container-name"] input').setValue('');
            break;
          case 'containerImage':
            await wrapper.find('[data-test="input-container-image"] input').setValue('');
            break;
          case 'containerPort':
            await wrapper.find('[data-test="input-container-port"] input').setValue('');
            break;
        }

        await flushPromises();
        await nextTick();

        expect(wrapper.vm.valid).toBe(false);
      });
    });
});

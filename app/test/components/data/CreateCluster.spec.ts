import { flushPromises, mount } from '@vue/test-utils'
import CreateCluster from '@/components/data/CreateCluster.vue'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue';
import SideContents from '@/__mocks__/layout/SideContents.vue';


vi.mock('@/lib/api/cluster/createClusterApi', () => ({
  createClusterApi: vi.fn(),
}));

const createClusterWrapper = () => {
  return mount(CreateCluster, {
    global: {
      stubs: {
        SideContents: SideContents,
        SelectOrgList: true
      }
    }
  });
}
describe('CreateCluster.vue', () => {

  it('TC_VUE_CLUSTER_01_01: 클릭 후 입력 form 렌더링 성공', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(CreateCluster, {
      attachTo: el // Teleport가 실제 DOM에 붙도록 설정
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '클러스터 이름',
      '클러스터 목적 (dev, prod 등)',
      '클러스터 API 서버 엔드포인트',
      '클러스터 ca.cert',
      '클러스터 서비스 어카운트 oAuth Token'
    ]

    labels.forEach(label => {
      expect(document.body.innerHTML).toContain(label);
    });

    wrapper.unmount();
    document.body.removeChild(el);
  });

    const baseValues = {
      org: { orgId: 45, orgName: 'Test Org' },
      name: 'Test Cluster',
      env: 'dev',
      caCert: 'dummy-ca',
      saToken: 'dummy-token',
      apiServerUrl: 'https://api.server'
    }

    const requiredFields = [
      'org',
      'name',
      'env',
      'caCert',
      'saToken',
      'apiServerUrl'
    ]

    requiredFields.forEach((field, idx) => {
      it(`TC_VUE_CLUSTER_01_02_${idx}: ${field} 미입력 시 validate 실패`, async () => {
        const wrapper = createClusterWrapper();

        // 모든 값 설정
        wrapper.vm.form.org = baseValues.org;
        await wrapper.find('[data-test="input-name"] input').setValue(baseValues.name);
        await wrapper.find('[data-test="input-env"] input').setValue(baseValues.env);
        await wrapper.find('[data-test="input-cacert"] input').setValue(baseValues.caCert);
        await wrapper.find('[data-test="input-satoken"] input').setValue(baseValues.saToken);
        await wrapper.find('[data-test="input-endpoints"] input').setValue(baseValues.apiServerUrl);

        // 특정 필드만 비우기
        switch (field) {
          case 'org':
            wrapper.vm.form.org = {orgId: 0, orgName:''}
            break;
          case 'name':
            await wrapper.find('[data-test="input-name"] input').setValue('');
            break;
          case 'env':
            await wrapper.find('[data-test="input-env"] input').setValue('');
            break;
          case 'caCert':
            await wrapper.find('[data-test="input-cacert"] input').setValue('');
            break;
          case 'saToken':
            await wrapper.find('[data-test="input-satoken"] input').setValue('');
            break;
          case 'apiServerUrl':
            await wrapper.find('[data-test="input-endpoints"] input').setValue('');
            break;
        }

        await flushPromises();
        await nextTick();

        expect(wrapper.vm.valid).toBe(false);
      });
    });
});

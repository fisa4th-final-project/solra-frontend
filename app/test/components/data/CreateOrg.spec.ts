import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import SideContents from '@/__mocks__/layout/SideContents.vue';
import CreateOrg from '@/components/data/CreateOrg.vue';

const createOrgWrapper = () => {
  return mount(CreateOrg, {
    global: {
      stubs: {
        SideContents: SideContents,
      }
    }
  });
}
describe('CreateOrg.vue', () => {

  it('TC_VUE_ORG_01_01', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(CreateOrg, {
      attachTo: el // Teleport가 실제 DOM에 붙도록 설정
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '생성할 조직 이름'
    ]

    labels.forEach(label => {
      expect(document.body.innerHTML).toContain(label);
    });

    wrapper.unmount();
    document.body.removeChild(el);
  });

  const baseValues = {
    orgName: 'test-orgName',
  }

  const requiredFields = [
    'orgName',
  ]

  requiredFields.forEach((field) => {
    it(`TC_VUE_ORG_01_02_${field}`, async () => {
      const wrapper = createOrgWrapper();

      // 모든 값 설정
      await wrapper.find('[data-test="input-org-name"] input').setValue(baseValues.orgName);

      // 특정 필드만 비우기
      switch (field) {
        case 'orgName':
          await wrapper.find('[data-test="input-org-name"] input').setValue('');
          break;
      }

      await flushPromises();
      await nextTick();

      expect(wrapper.vm.valid).toBe(false);
    });
  });
});

import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import SideContents from '@/__mocks__/layout/SideContents.vue';
import Form from '@/__mocks__/common/Form.vue';
import CreateOrgInUserGroup from '@/components/data/CreateOrgInUserGroup.vue';

const createOrgInUserGroupWrapper = () => {
  return mount(CreateOrgInUserGroup, {
    global: {
      stubs: {
        SideContents: SideContents,
        SelectOrgList: Form
      }
    },
    props: {
      form: {
        org: {
          orgId: 0,
          orgName: ''
        }
      }
    }
  });
}
describe('CreateOrgInUserGroup.vue', () => {

  it('TC_VUE_ORG_02_01', async () => {

    const wrapper = createOrgInUserGroupWrapper();

    const labels = [
      'mdi-plus'
    ]

    labels.forEach(label => {
      expect(wrapper.html()).toContain(label);
    });

    wrapper.unmount();
  });

  const baseValues = {
    orgName: 'test-orgName',
  }

  const requiredFields = [
    'orgName',
  ]

  requiredFields.forEach((field) => {
    it(`TC_VUE_ORG_02_02_${field}`, async () => {
      const wrapper = createOrgInUserGroupWrapper();

      // 폼 형식 노출
      wrapper.vm.isCreateOrg = true;
      await nextTick();

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

  it('TC_VUE_ORG_02_03', async () => {

    const wrapper = createOrgInUserGroupWrapper();

    // create org 버튼 클릭
    await wrapper.find('[data-test="btn-create-org"]').trigger('click');
    await nextTick();
    expect(wrapper.vm.isCreateOrg).toBe(true);

    // 취소 버튼 클릭
    await wrapper.find('[data-test="btn-select-org"]').trigger('click');
    await nextTick();
    expect(wrapper.vm.isCreateOrg).toBe(false);

    wrapper.unmount();
  });
});

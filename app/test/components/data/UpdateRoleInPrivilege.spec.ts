import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import UpdateRoleInPrivilege from '@/components/data/UpdateRoleInPrivilege.vue';

describe('UpdateRoleInPrivilege.vue', () => {

  it('TC_VUE_ROLE_06_01', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(UpdateRoleInPrivilege)
    
    const labels = [
      '역할 설명'
    ]

    labels.forEach(label => {
      expect(wrapper.html()).toContain(label);
    });

    wrapper.unmount();
  });
});

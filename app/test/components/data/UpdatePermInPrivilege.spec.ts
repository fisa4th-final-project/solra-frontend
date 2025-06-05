import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import UpdatePermInPrivilege from '@/components/data/UpdatePermInPrivilege.vue';

describe('UpdatePermInPrivilege.vue', () => {

  it('TC_VUE_PM_04_01', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(UpdatePermInPrivilege)
    
    const labels = [
      '권한 설명'
    ]

    labels.forEach(label => {
      expect(wrapper.html()).toContain(label);
    });

    wrapper.unmount();
  });
});

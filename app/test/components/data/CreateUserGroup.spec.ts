import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import CreateUserGroup from '@/components/data/CreateUserGroup.vue';
import Form from '@/__mocks__/common/Form.vue';

describe('CreateUserGroup.vue', () => {

  it('TC_VUE_UG_01_01', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(CreateUserGroup, {
      attachTo: el, // Teleport가 실제 DOM에 붙도록 설정
      global: {
        stubs: {
          CreateOrgInUserGroup: Form,
          CreateDeptInUserGroup: Form,
        }
      }
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '사용자 그룹 추가',
      '조직 선택',
      '부서 추가'
    ]

    labels.forEach(label => {
      expect(document.body.innerHTML).toContain(label);
    });

    wrapper.unmount();
    document.body.removeChild(el);
  });
});

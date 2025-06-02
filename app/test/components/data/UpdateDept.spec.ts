import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import UpdateDept from '@/components/data/UpdateDept.vue';
import Content from '@/__mocks__/common/Content.vue';

describe('UpdateDept.vue', () => {

  it('TC_VUE_DEPT_01_01: 클릭 후 입력 form 렌더링 성공', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(UpdateDept, {
      attachTo: el, // Teleport가 실제 DOM에 붙도록 설정
      global: {
        stubs: {
          DeleteDept: Content,
        }
      },
      props: {
        deptId: 1
      }
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '수정할 부서 이름'
    ]

    labels.forEach(label => {
      expect(document.body.innerHTML).toContain(label);
    });

    wrapper.unmount();
    document.body.removeChild(el);
  });
});

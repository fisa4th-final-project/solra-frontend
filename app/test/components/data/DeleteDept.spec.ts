import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import DeleteDept from '@/components/data/DeleteDept.vue';

describe('DeleteDept.vue', () => {

  it('TC_VUE_DEPT_07_01', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(DeleteDept, {
      attachTo: el, // Teleport가 실제 DOM에 붙도록 설정
      props: {
        dept: {
          deptId: 1,
          deptName: 'test-deptName'
        }
      }
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '부서를 삭제하시겠습니까?',
      '부서: test-deptName',
      '취소',
      '삭제'
    ]

    labels.forEach(label => {
      expect(document.body.innerHTML).toContain(label);
    });

    wrapper.unmount();
    document.body.removeChild(el);
  });

});

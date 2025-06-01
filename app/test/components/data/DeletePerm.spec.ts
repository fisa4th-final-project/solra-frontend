import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import DeletePerm from '@/components/data/DeletePerm.vue';

describe('DeletePerm.vue', () => {

  it('TC_VUE_PERM_02_01: 클릭 후 삭제 Dialog 렌더링 성공', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(DeletePerm, {
      attachTo: el, // Teleport가 실제 DOM에 붙도록 설정
      props: {
        perm: {
          permId: 1,
          permName: 'test-permName'
        }
      }
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '권한을 삭제하시겠습니까?',
      '권한: test-permName',
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

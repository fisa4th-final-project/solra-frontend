import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import DeleteOrg from '@/components/data/DeleteOrg.vue';

describe('DeleteOrg.vue', () => {

  it('TC_VUE_ORG_06_01', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(DeleteOrg, {
      attachTo: el, // Teleport가 실제 DOM에 붙도록 설정
      props: {
        org: {
          orgId: 1,
          orgName: 'test-orgName'
        }
      }
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '조직을 삭제하시겠습니까?',
      '조직: test-orgName',
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

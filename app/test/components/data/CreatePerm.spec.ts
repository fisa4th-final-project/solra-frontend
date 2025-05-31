import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue';
import SideContents from '@/__mocks__/layout/SideContents.vue';
import CreatePerm from '@/components/data/CreatePerm.vue';

const createPermWrapper = () => {
  return mount(CreatePerm, {
    global: {
      stubs: {
        SideContents: SideContents,
      }
    }
  });
}
describe('CreatePerm.vue', () => {

  it('TC_VUE_PERM_01_01: 클릭 후 입력 form 렌더링 성공', async () => {

    const el = document.createElement('div')
    document.body.appendChild(el)

    const wrapper = mount(CreatePerm, {
      attachTo: el // Teleport가 실제 DOM에 붙도록 설정
    });

    await wrapper.find('button').trigger('click');
    await nextTick();
    
    const labels = [
      '생성할 권한 이름',
      '권한 설명'
    ]

    labels.forEach(label => {
      expect(document.body.innerHTML).toContain(label);
    });

    wrapper.unmount();
    document.body.removeChild(el);
  });

  const baseValues = {
    permName: 'test-permName',
    permDesc: 'test-permDesc',
  }

  const requiredFields = [
    'permName',
    'permDesc'
  ]

  requiredFields.forEach((field, idx) => {
    it(`TC_VUE_PERM_01_02_${idx}: ${field} 미입력 시 validate 여부`, async () => {
      const wrapper = createPermWrapper();

      // 모든 값 설정
      await wrapper.find('[data-test="input-perm-name"] input').setValue(baseValues.permName);
      await wrapper.find('[data-test="input-perm-desc"] input').setValue(baseValues.permDesc);

      // 특정 필드만 비우기
      switch (field) {
        case 'permName':
          await wrapper.find('[data-test="input-perm-name"] input').setValue('');
          await flushPromises();
          await nextTick();
          expect(wrapper.vm.valid).toBe(false);
          break;
        case 'permDesc': // 값이 비어도 valid는 통과
          await wrapper.find('[data-test="input-perm-desc"] input').setValue('');
          await flushPromises();
          await nextTick();
          expect(wrapper.vm.valid).toBe(true);
          break;
      }

    });
  });
});

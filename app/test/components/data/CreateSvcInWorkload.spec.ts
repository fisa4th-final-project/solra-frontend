import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CreateSvcInWorkload from '@/components/data/CreateSvcInWorkload.vue';

const createSvcInWorkloadWrapper = () => {
  return mount(CreateSvcInWorkload, {
    props: {
      clusterId: 1,
      nsName: 'test-nsName'
    }
  });
}

describe('CreateSvcInWorkload.vue', () => {

  it('TC_VUE_SVC_02_01: 입력 form 렌더링 성공', async () => {

    const wrapper = createSvcInWorkloadWrapper();

    const labels = [
      '기본 정보',
      '서비스 이름',
      '연결할 리소스 이름',
      '서비스 타입',
      '포트 정보'
    ]

    labels.forEach(label => {
      expect(wrapper.html()).toContain(label);
    });

    wrapper.unmount();
  });
});

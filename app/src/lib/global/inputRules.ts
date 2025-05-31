export const rules = {
  required: (v: any) => {
    return v !== null && String(v).trim() !== '' || '필수 입력 항목입니다'
  },
  email: (v: string) =>
    /.+@.+\..+/.test(v) || '올바른 이메일 형식을 입력하세요.',
  portType: (v: string) => 
    v !== 'NodePort' && v !== 'ClusterIP' && v !== 'LoadBalancer' || '올바른 포트 타입을 선택해주세요'
}
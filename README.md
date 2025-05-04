# Solra-frontend

vue는 정적 파일을 기반으로 SPA에 특화된 프레임워크로 런타임 시점에 환경 변수 주입을 제공하지 않는다. 

또한 프론트 레이어 특성 상 api 서버 주소와 같이 공개 가능한 변수만을 지정하고, 민감 정보는 백 레이어에서 다룸으로써 높은 보안 수준의 변수 관리는 필요없을 것으로 예상된다.


.env 파일을 프로젝트 루트에 생성하고 다음처럼 작성:

```dotenv
VITE_API_URL=https://api.example.com
VITE_APP_VERSION=1.0.0
```

Vue 프로젝트에서 사용 시:
```js
console.log(import.meta.env.VITE_API_URL)
```
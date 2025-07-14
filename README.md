# Solra-frontend

# 기술 스택

- **Vue 3**

[소개 | Vue.js](https://v3-docs.vuejs-korea.org/guide/introduction.html)

- **Vite**

[시작하기](https://ko.vite.dev/guide/)

- **Vuetify**

[Get started with Vuetify 3 — Vuetify](https://vuetifyjs.com/en/getting-started/installation/#installation)

- **Vitest**

[Vitest](https://vitest.dev/guide/)

- **Vue Test Utils**

[Vue Test Utils](https://test-utils.vuejs.org/guide/)

## 리포지토리 구조

```java
solra-frontend/
│
├── .github/                 
│   └── workflows/    # Github Action을 이용한 CI 파이프라인
│
├── app/              # Vue 프로젝트
│
├── deploy/             
│   ├── base/         # 기본 워크로드
│   └── overlays/     # 환경 별로 덮어 쓸 내용
│       ├── dev/    
│       └── prod/
│
├── dockerfile        # CI 과정에서 빌드될 dockerfile
└── nginx.conf        # 정적 파일 서빙을 위한 nginx 설정
```

## Vue 프로젝트 구조

```java
app/src/
│
├── test/                   # 테스트 코드
│
├── assets/                 # 이미지, 폰트 등 정적 리소스
├── lib/                    
│   ├── api/                # 엔티티 별 apiHandler, DTO
│   └── global/             # 전역 사용될 패키지
│
├── components/             
│   ├── layout/             # 레이아웃 관련 컴포넌트 (사이드바 등)
│   ├── common/             # 버튼, 카드 등 공통 컴포넌트
│   └── data/               # API 연동과 관련된 컴포넌트
│
├── frames/                 # 페이지 레이아웃 템플릿
│   ├── MainFrame.vue       # 사이드바 + 헤더 포함한 레이아웃
│   └── SideContent.vue     # 상세 조회를 위한 사이드 컨텐츠 레이아웃
│
├── pages/                  # 실제 페이지 단위 컴포넌트
│   ├── LoginPage.vue       # 로그인 페이지
│   ├── UserPage.vue        # 예: 사용자 관리 페이지
│   └── SettingsPage.vue    # 예: 설정 페이지
│
├── router/                 # vue-router 설정
│
├── store/                  # Pinia 스토어
│
├── App.vue                 # 루트 컴포넌트
└── main.ts                 # 진입점
```

# 페이지 구성

## 기본 페이지 (전체 사용자)

| 대쉬보드 | 역할 별 접근 가능한 조회 컴포넌트의 집합 |
| --- | --- |
| 워크로드 | SVC와 DEPLOY를 하나의 워크로드로 관리할 수 있는 페이지 |
| 작업영역 | 소속 부서의 사용자와 자원관리를 위한 페이지 |

## 관리 페이지 (어드민 사용자)

| 사용자 그룹 | 조직 및 부서의 관리를 위한 페이지 |
| --- | --- |
| 역할 및 권한 | 역할에 포함된 권한을 조회, 조정할 수 있는 페이지 |
| 사용자 | 사용자를 추가, 관리할 수 있는 페이지 |
| 클러스터 | 조직 별 K8S 클러스터 조회 및 관리를 위한 페이지 |
| 노드 | 등록된 클러스터 별 노드를 조회할 수 있는 페이지 |

## 개발 페이지 (개발자)

| 데이터 컴포넌트 | 디자인 체크 및, 기능테스트 시 api와 연동되는 컴포넌트를 모아 사용해볼 수 있는 페이지 |
| --- | --- |

# 환경변수

<aside>
💡

프론트 레이어에서는 민감 변수 사용 절대 금지! 

스태틱 파일로 배포되므로 이미지에 변수가 노출되므로 외부 유출 가능한 변수만 지정할 것

</aside>

```scheme
VITE_API_URL=https://192.168.1.9:30080
VITE_APP_VERSION=1.0.0
```

# 개발 시

```bash
# app dir 이동
cd app

# 패키지 설치  
npm install

# 개발 런타임 실행 (hot reload 가능)
npm run dev

# 테스트 런타임 실행
npm run test
```

## 🧪 테스트 환경

---

## 📁 테스트 디렉토리 구조

```
app/
│
├── src/
│   ├── components/
│   │   └── data/
│   │       ├── GetPodList.vue
│   │       ├── GetDeployDetail.vue
│   │       └── ...
│
├── test/
│   └── components/
│       └── data/
│           ├── GetPodList.spec.ts
│           ├── GetDeployDetail.spec.ts
│           └── ...

```

---

## ⚙️ 테스트 설정 (vitest.config.ts)

```jsx
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
  },
});
```

<aside>
💡

`setup.ts` 에서 테스트에서 사용할 전역변수, 라이브러리 설정을 전역적으로 선언하고, 개별 테스트에서는 테스트와 관련된 비즈니스 로직을 구현하는데에 초점을 맞춘다.

</aside>

---
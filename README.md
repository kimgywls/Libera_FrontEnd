# Libera App

학생의 내신 성적 데이터를 바탕으로, 대학별 합격자 및 전형 기준 정보를 비교 분석하여 AI 기반으로 진학 가능성이 높은 대학 리스트를 예측하는 시스템의 프론트엔드 애플리케이션입니다.

## 🚀 주요 기능

### 1. 학생 관리 시스템
- **학생 목록 조회 및 검색**: 이름, 학교, 희망학교 등으로 학생 검색
- **학생 정보 등록**: PDF 업로드 지원으로 학생 정보 일괄 등록
- **학생 정보 수정**: 개인정보, 희망학교/학과, 완료상태 관리
- **학생 정보 삭제**: 개별 및 일괄 삭제 기능
- **학교 이력 관리**: 학생의 학교 이력 추적

### 2. 성적 관리 시스템
- **학기별 성적 입력**: 학년/학기별 과목 성적 등록 및 수정
- **성적 통계 분석**: GPA 계산, 성적 추이 분석
- **출석 관리**: 학기별 출석률 추적 및 관리
- **성적 분포 분석**: 과목별 성취도 분포 시각화
- **학기별 성적 추이**: 차트를 통한 성적 변화 분석

### 3. 체크리스트 시스템
- **기본 역량 체크리스트**: 학업역량, 진로역량, 공동체역량 평가
- **학교 유형별 체크리스트**: 일반고, 자사/자공고, 특수목적고 등
- **체크리스트 응답 수집**: 1-5점 척도로 세부 항목 평가
- **체크리스트 결과 분석**: 카테고리별 점수 계산 및 시각화
- **상세 결과 분석**: 메인/서브 카테고리별 세부 분석

### 4. 비교과 활동 관리
- **창의체험활동**: 자율활동, 동아리활동, 진로활동 등 기록
- **세부능력 및 특기사항**: 과목별 세부 능력과 특기사항 관리
- **행동특성 및 종합의견**: 학생의 행동 특성과 종합 의견 작성
- **활동 분류 관리**: 학년/학기별 활동 분류 및 정리
- **활동 요약 분석**: 비교과 활동 전체 요약 및 분석

### 5. 종합평가 시스템
- **AI 기반 자동 평가**: 체크리스트 결과를 바탕으로 한 자동 평가 생성
- **카테고리별 평가**: 학업역량, 진로역량, 공동체역량별 세부 평가
- **전체 평가 관리**: 학생 전체에 대한 종합적인 평가 작성
- **평가 내용 수정**: 자동 생성된 평가 내용 수정 및 편집
- **최종 평가 확정**: 최종 평가 내용 확정 및 저장

### 6. 대학 추천 시스템
- **AI 기반 대학 추천**: 학생 데이터를 바탕으로 한 맞춤형 대학 추천
- **학과별 추천**: 희망 학과별 도전/적정/안전 대학 분류
- **대학 정보 관리**: 대학별 입시 정보, 경쟁률, 합격선 등 관리
- **추천 결과 저장**: 추천 결과 저장 및 히스토리 관리
- **대학 목록 필터링**: 지역, 전형유형, 입학방법 등으로 필터링
- **숨김/표시 관리**: 추천 대학 목록에서 숨김/표시 기능

### 7. 결과 리포트 시스템
- **PDF 리포트 생성**: 학생별 종합적인 입시 결과 리포트 생성
- **차트 및 그래프**: 성적 추이, 체크리스트 결과 등 시각화
- **섹션별 구성**: 학생정보, 성적, 출석, 체크리스트, 비교과활동, 종합평가, 추천대학
- **리포트 다운로드**: PDF 형태로 리포트 다운로드 기능
- **커스터마이징**: 리포트 내용 및 디자인 커스터마이징

### 8. 대시보드 시스템
- **학생별 대시보드**: 개별 학생의 모든 정보를 한눈에 확인
- **위젯 기반 구성**: 각 기능별 위젯으로 정보 표시
- **실시간 데이터 업데이트**: 데이터 변경 시 실시간 반영
- **네비게이션**: 탭 기반의 직관적인 네비게이션
- **완료 상태 추적**: 각 기능별 완료 상태 표시
## 🛠 기술 스택

### Core
- **Next.js 15.3.5** - React 기반 풀스택 프레임워크
- **React 19.0.0** - 사용자 인터페이스 라이브러리
- **TypeScript 5** - 정적 타입 검사

### State Management & Data Fetching
- **@tanstack/react-query 5.82.0** - 서버 상태 관리 및 캐싱
- **SWR 2.3.4** - 데이터 페칭 라이브러리
- **Axios 1.10.0** - HTTP 클라이언트

### UI & Styling
- **Tailwind CSS 4** - 유틸리티 기반 CSS 프레임워크
- **Lucide React 0.525.0** - 아이콘 라이브러리
- **Recharts 3.1.0** - 차트 라이브러리

### PDF & Document
- **@react-pdf/renderer 4.3.0** - PDF 생성
- **html2canvas 1.4.1** - HTML을 캔버스로 변환
- **html2pdf.js 0.10.3** - HTML을 PDF로 변환
- **jsPDF 3.0.1** - PDF 생성 라이브러리
- **react-to-pdf 2.0.1** - React 컴포넌트를 PDF로 변환

### DevOps & Containerization
- **Docker** - 컨테이너화
- **Docker Compose** - 멀티 컨테이너 오케스트레이션

## 📁 프로젝트 구조

```
src/app/
├── components/           # 공통 컴포넌트
│   └── ErrorBoundary.tsx # 에러 바운더리
├── constants/           # 도메인별 상수
│   ├── index.ts
│   ├── score.ts        # 성적 관련 상수
│   ├── checklist.ts    # 체크리스트 관련 상수
│   └── university.ts   # 대학 관련 상수
├── contexts/           # React Context
│   └── StudentInfoContext.tsx
├── dashboard/          # 대시보드 페이지
│   ├── [id]/          # 학생별 대시보드
│   │   ├── scores/    # 성적 관리
│   │   ├── checklist/ # 체크리스트
│   │   ├── extracurricular/ # 비교과 활동
│   │   ├── comprehensive-evaluation/ # 종합평가
│   │   ├── university-list/ # 대학 추천
│   │   └── result-report/ # 결과 리포트
│   ├── _actions/      # API 액션
│   ├── _components/   # 대시보드 컴포넌트
│   └── _hooks/        # 커스텀 훅
├── lib/               # 유틸리티 라이브러리
│   └── api-client.ts  # 중앙화된 API 클라이언트
├── main/              # 메인 페이지
│   ├── _actions/      # API 액션
│   ├── _components/   # 메인 컴포넌트
│   ├── _hooks/        # 커스텀 훅
│   └── _utils/        # 유틸리티
├── types/             # TypeScript 타입 정의
│   ├── common.ts      # 공통 타입
│   ├── student.ts     # 학생 관련 타입
│   ├── score.ts       # 성적 관련 타입
│   ├── university.ts  # 대학 관련 타입
│   └── index.ts       # 타입 export
├── hooks/             # 공통 커스텀 훅
├── utils/             # 공통 유틸리티
├── layout.tsx         # 루트 레이아웃
└── page.tsx           # 홈페이지
```

## 🏗️ 아키텍처

### 1. 타입 시스템
- **공통 타입**: `BaseEntity`, `StudentBase`, `ApiResponse` 등
- **도메인별 타입**: 학생, 성적, 대학, 체크리스트 등
- **타입 안전성**: TypeScript를 통한 컴파일 타임 타입 검사

### 2. API 레이어
- **중앙화된 API 클라이언트**: `api-client.ts`
- **도메인별 서비스**: `StudentApiService`, `ScoreApiService` 등
- **에러 처리**: 커스텀 에러 클래스 및 인터셉터
- **로깅**: 개발 환경에서 요청/응답 로깅

### 3. 상태 관리
- **React Query**: 서버 상태 관리 및 캐싱
- **Context API**: 전역 상태 관리
- **SWR**: 데이터 페칭 및 동기화

### 4. 컴포넌트 구조
- **모듈화**: 기능별 디렉토리 구조
- **재사용성**: 공통 컴포넌트 분리
- **에러 바운더리**: React 에러 바운더리 패턴

## 🚀 시작하기

### 로컬 개발

#### 설치
```bash
npm install
```

#### 개발 서버 실행
```bash
npm run dev
```
개발 서버는 `http://localhost:3001`에서 실행됩니다.

#### 빌드
```bash
npm run build
```

#### 프로덕션 실행
```bash
npm start
```
프로덕션 서버는 `http://localhost:3000`에서 실행됩니다.

#### 린트 검사
```bash
npm run lint
```

### Docker를 사용한 개발

#### 개발 환경 실행
```bash
# 개발 컨테이너 빌드 및 실행
docker-compose up frontend_dev

# 백그라운드 실행
docker-compose up -d frontend_dev
```

#### 프로덕션 환경 실행
```bash
# 프로덕션 컨테이너 빌드 및 실행
docker-compose up frontend_prod

# 백그라운드 실행
docker-compose up -d frontend_prod
```

#### 모든 서비스 실행
```bash
# 모든 서비스 빌드 및 실행
docker-compose up

# 백그라운드 실행
docker-compose up -d
```

#### 컨테이너 관리
```bash
# 컨테이너 상태 확인
docker-compose ps

# 로그 확인
docker-compose logs frontend_dev
docker-compose logs frontend_prod

# 컨테이너 중지
docker-compose down

# 이미지 및 컨테이너 정리
docker-compose down --rmi all --volumes --remove-orphans
```

## 🐳 Docker 구성

### 개발 환경 (Dockerfile.dev)
- **베이스 이미지**: `node:18-alpine`
- **포트**: 3001
- **볼륨 마운트**: 소스 코드 변경 시 실시간 반영
- **환경**: 개발 모드

### 프로덕션 환경 (Dockerfile)
- **멀티 스테이지 빌드**: 빌드 최적화
- **베이스 이미지**: `node:18-alpine`
- **포트**: 3000
- **환경**: 프로덕션 모드
- **최적화**: 필요한 파일만 복사

### Docker Compose 서비스

#### frontend_dev
- 개발 환경용 컨테이너
- 핫 리로드 지원
- 소스 코드 볼륨 마운트

#### frontend_prod
- 프로덕션 환경용 컨테이너
- 최적화된 빌드
- 환경 변수 설정




## 📝 코딩 컨벤션

### 파일 명명
- 컴포넌트: PascalCase (예: `StudentInfo.tsx`)
- 훅: camelCase (예: `use-student-data.ts`)
- 액션: kebab-case (예: `fetch-student-detail.ts`)

### 디렉토리 구조
- 기능별로 디렉토리 분리
- 공통 컴포넌트는 `_components` 디렉토리
- API 액션은 `_actions` 디렉토리
- 커스텀 훅은 `_hooks` 디렉토리

### 타입 정의
- 공통 타입은 `types/common.ts`
- 도메인별 타입은 별도 파일로 분리
- API 응답 타입은 명시적으로 정의

### 커밋 규칙
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 스타일 변경 (로직 변경 없음)
- `refactor`: 코드 리팩토링
- `chore`: 빌드/배포/환경설정 등 기타 변경

## ✨ 문제 해결

### 일반적인 문제
1. **타입 에러**: `npm run lint`로 타입 검사
2. **API 에러**: 개발자 도구에서 네트워크 탭 확인
3. **빌드 에러**: `npm run build`로 빌드 검증

### Docker 관련 문제
1. **포트 충돌**: 다른 서비스가 3000/3001 포트를 사용 중인지 확인
2. **볼륨 마운트 문제**: Docker Desktop이 실행 중인지 확인
3. **빌드 실패**: Docker 캐시 정리 후 재빌드

### 디버깅
- 개발 환경에서 API 요청/응답 로깅 활성화
- React Developer Tools 사용
- 브라우저 개발자 도구 활용


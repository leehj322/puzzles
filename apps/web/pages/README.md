# Root `pages/` (Intentionally Empty)

이 폴더는 **Next.js의 Pages Router 자동 감지를 흡수**하기 위해 의도적으로 비워둔 디렉토리입니다.

## 배경

이 프로젝트는 두 개의 `pages` 개념을 동시에 사용합니다:

1. **Next.js의 Pages Router** — 루트 또는 `src/pages/`에 위치한 페이지들을 자동으로 라우팅하는 레거시 라우팅 시스템
2. **FSD(Feature-Sliced Design)의 pages 레이어** — `src/pages/`에 위치하며, App Router 라우트(`app/[locale]/...`)에서 import해서 합성하는 페이지 단위 UI 레이어

App Router(`app/`) 사용 시 Next.js는 여전히 `src/pages/`를 Pages Router 후보로 스캔하여 다음과 같은 에러를 발생시킵니다:

> `pages` and `app` directories should be under the same folder

또한 FSD pages 슬라이스의 파일들이 의도치 않게 Pages Router 라우트로 등록될 수 있습니다.

## 해결책

루트에 빈 `pages/` 디렉토리를 두면 Next.js의 Pages Router 검색이 이쪽으로 고정됩니다. 그 결과:

- 루트 `app/` (App Router) ↔ 루트 `pages/` (Pages Router) — 두 디렉토리가 동일한 부모(프로젝트 루트) 아래 있어 Next.js의 "같은 폴더" 요구사항을 만족
- `src/pages/`는 Pages Router 후보에서 제외되어 FSD pages 레이어로 자유롭게 사용 가능

## 주의사항

- 이 폴더에 `.tsx`/`.ts`/`.jsx`/`.js` 파일을 추가하지 마세요 — 의도치 않은 라우트가 생깁니다.
- 이 README.md만 존재해도 Next.js는 폴더의 존재를 인식합니다.
- FSD pages 레이어는 `src/pages/`에 작성하고 `@/pages/*` 경로 별칭으로 import하세요.

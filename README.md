# Puzzles

다양한 퍼즐을 즐길 수 있는 웹/모바일 플랫폼.
MVP 범위: 4×4 슬라이딩 퍼즐 (15-puzzle), placeholder 이미지 4종.

## 모노레포 구조

이 저장소는 **pnpm workspaces + Turborepo** 기반 모노레포입니다.

```
puzzles/
├── apps/
│   ├── web/                # Next.js 16 (App Router) 웹앱
│   └── mobile/             # Expo 모바일앱 (스캐폴드)
├── packages/
│   ├── core/               # @puzzles/core — 플랫폼 무관 도메인 로직
│   ├── i18n/               # @puzzles/i18n — locale + 메시지 리소스
│   ├── eslint-config/      # @puzzles/eslint-config — 공유 ESLint 규칙
│   └── tsconfig/           # @puzzles/tsconfig — 공유 TS 베이스
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

## Tech Stack

### 공유

- **TypeScript (strict)**
- **Vitest** — 도메인 로직 단위 테스트 (`@puzzles/core`)
- **ESLint flat config** — `@puzzles/eslint-config`로 통일

### Web (`apps/web`)

- **Next.js 16** (App Router) + **React 19**
- **next-intl** — `[locale]` 라우팅, ko / en
- **Tailwind CSS v4** — 디자인 토큰을 CSS 변수로 매핑
- **Zustand** — 퍼즐 게임 클라이언트 상태
- **next-themes** — 라이트/다크 테마 전환

### Mobile (`apps/mobile`)

- **Expo** + **expo-router** + **React Native**
- 현재는 빈 스캐폴드, 추후 구현 예정

## Scripts

루트에서 turbo 파이프라인으로 모든 워크스페이스를 한 번에 실행할 수 있습니다.

```bash
pnpm install
pnpm dev          # 모든 앱 dev (현재 web만 실질 실행)
pnpm build        # 모든 워크스페이스 build
pnpm test         # 모든 워크스페이스 vitest
pnpm typecheck    # 모든 워크스페이스 tsc --noEmit
pnpm lint         # 모든 워크스페이스 eslint
```

특정 워크스페이스만:

```bash
pnpm --filter @puzzles/web dev
pnpm --filter @puzzles/core test
```

## FSD 구조 (각 앱 내부)

각 앱은 [Feature-Sliced Design v2.1](https://feature-sliced.design)을 따르며,
**`app + pages + entities + shared`** 4개 레이어를 사용합니다.

`apps/web/` 예시:

```
apps/web/
├── app/                                 # Next.js App Router (얇은 라우트 어댑터)
│   └── [locale]/
│       ├── layout.tsx                   # 루트 레이아웃 + 프로바이더 + Header
│       ├── page.tsx                     # → @/pages/home
│       ├── puzzles/
│       │   ├── page.tsx                 # → @/pages/puzzle-types
│       │   └── [puzzleType]/
│       │       ├── page.tsx             # → @/pages/puzzle-list
│       │       └── play/[id]/page.tsx   # → @/pages/puzzle-play
│       └── not-found.tsx
├── pages/                               # 빈 상태 유지 (Next.js Pages Router 충돌 방지)
│   └── README.md
├── src/
│   ├── app/                             # FSD app 레이어 (providers, styles, ui chrome)
│   ├── pages/                           # FSD pages 레이어
│   └── shared/                          # web 전용 shared (ui, lib/cn, i18n routing 등)
├── middleware.ts                        # next-intl 미들웨어
├── next.config.ts
└── tsconfig.json                        # @/app/*, @/pages/*, @/shared/*
```

도메인 로직(`board`, `puzzle-image`, `puzzle-type`, `format-time`)과 i18n
메시지/locale은 각각 `@puzzles/core`, `@puzzles/i18n`로 분리되어 web/mobile이
공유합니다.

자세한 배경:

- `apps/web/pages/README.md` — Next.js Pages Router 자동 감지를 흡수하기 위한 빈 디렉토리
- `.cursor/skills/feature-sliced-design/SKILL.md` — FSD 적용 규칙
- `.cursor/skills/design-system/SKILL.md` — 디자인 시스템 (DESIGN.md 정합)

## 디자인 토큰

라이트 톤은 `.cursor/DESIGN.md` §2 기준. 다크 톤은 동일한 "warm" 무드를 유지하는
가설 토큰입니다 — 디자인이 보강되면 `apps/web/src/app/styles/tokens.css` 한 곳만
수정하면 전체에 반영됩니다.

## i18n

- 기본 locale: `ko` (`@puzzles/i18n`의 `DEFAULT_LOCALE`로 상수화)
- 메시지: `packages/i18n/src/messages/{ko,en}.json`
- 헤더의 `LocaleSwitcher`로 KO ↔ EN 전환

## 테스트

순수 함수(`@puzzles/core`의 `board`, `format-time`)는 100% 단위 테스트로 검증:

```bash
pnpm test
# core: 22 passed (board, format-time)
# web: 2 passed (cn)
```

## 배포 (Vercel)

`apps/web`을 Vercel에 import하면 모노레포 자동 감지로 빌드 가능합니다.
환경 변수는 현재 필요하지 않습니다.

## 추후 로드맵

1. 이미지 업로드 기능 (S3 presigned URL, 정사각형 크롭 UI)
2. 사용자/기록, 리더보드
3. 다른 퍼즐 종류 (직소, 스도쿠, 메모리)
4. React Native (Expo) 모바일앱 실 구현

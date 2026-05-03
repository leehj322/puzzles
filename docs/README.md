<p align="center">
  <img src="./assets/logo.svg" alt="Puffy logo" width="96" height="96" />
</p>

<h1 align="center">Puffy</h1>

<p align="center">
  다양한 퍼즐을 즐길 수 있는 웹/모바일 플랫폼.
</p>

현재 6종의 퍼즐을 플레이할 수 있습니다 — 슬라이딩, 스도쿠, 2048,
노노그램, 라이트아웃, 사과게임. UI는 `ko / en / ja` 3개 locale을 지원합니다.

## 모노레포 구조

이 저장소는 **pnpm workspaces + Turborepo** 기반 모노레포입니다.

```
puzzles/
├── apps/
│   ├── web/                # Next.js 16 (App Router) 웹앱
│   └── mobile/             # Expo 모바일앱 (스캐폴드)
├── packages/
│   ├── core/               # @puzzles/core — 플랫폼 무관 게임/도메인 로직
│   ├── i18n/               # @puzzles/i18n — locale + 메시지 리소스 (ko/en/ja)
│   ├── toast/              # @puzzles/toast — sonner 기반 토스트 래퍼
│   ├── eslint-config/      # @puzzles/eslint-config — 공유 ESLint 규칙
│   └── tsconfig/           # @puzzles/tsconfig — 공유 TS 베이스
├── docs/                   # 프로젝트 문서 (this file)
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
- **next-intl** — `[locale]` 라우팅, `ko / en / ja`
- **Tailwind CSS v4** — 디자인 토큰을 CSS 변수로 매핑
- **Zustand** — 퍼즐별 클라이언트 상태
- **next-themes** — 라이트/다크 테마 전환
- **lucide-react** — 아이콘
- **framer-motion** — 마이크로 인터랙션, 일러스트 애니메이션

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
│       ├── browse/
│       │   ├── page.tsx                 # → @/pages/puzzle-types
│       │   └── [puzzleType]/page.tsx    # → @/pages/puzzle-list
│       ├── play/
│       │   ├── [puzzleType]/page.tsx    # 단일 인스턴스 게임 (2048, fruit-box, lights-out)
│       │   └── [puzzleType]/[id]/page.tsx  # 엔트리별 게임 (sliding, sudoku, nonogram)
│       └── not-found.tsx
├── pages/                               # 빈 상태 유지 (Next.js Pages Router 충돌 방지)
│   └── README.md
├── src/
│   ├── app/                             # FSD app 레이어 (providers, styles, ui chrome)
│   ├── pages/                           # FSD pages 레이어 (홈, 목록, 게임 6종 등)
│   └── shared/                          # web 전용 shared (ui, lib/cn, i18n routing 등)
├── middleware.ts                        # next-intl 미들웨어
├── next.config.ts
└── tsconfig.json                        # @/app/*, @/pages/*, @/shared/*
```

각 게임은 자체 FSD page slice로 분리되어 있어 (`puzzle-play-sliding`,
`puzzle-play-sudoku`, `puzzle-play-2048`, `puzzle-play-nonogram`,
`puzzle-play-lights-out`, `puzzle-play-fruit-box`), 도메인 로직은 모두
`@puzzles/core`에서 가져옵니다.

i18n 메시지/locale, 게임 로직(`board`, `puzzle`, `game`, `format-time`) 등은
`@puzzles/i18n`, `@puzzles/core`로 분리되어 web/mobile이 공유합니다.

자세한 배경:

- `apps/web/pages/README.md` — Next.js Pages Router 자동 감지를 흡수하기 위한 빈 디렉토리
- `.cursor/skills/feature-sliced-design/SKILL.md` — FSD 적용 규칙
- `.cursor/skills/design-system/SKILL.md` — 디자인 시스템 (DESIGN.md 정합)

## 디자인 토큰

라이트 톤은 `.cursor/DESIGN.md` §2 기준. 다크 톤은 동일한 "candy kawaii"
무드를 유지합니다 — 디자인이 보강되면 `apps/web/src/app/styles/tokens.css`
한 곳만 수정하면 전체에 반영됩니다.

## i18n

- 기본 locale: `ko` (`@puzzles/i18n`의 `DEFAULT_LOCALE`로 상수화)
- 메시지: `packages/i18n/src/messages/{ko,en,ja}.json`
- 헤더의 `LocaleSwitcher`로 KO ↔ EN ↔ JA 전환

## 테스트

순수 함수(`@puzzles/core`의 게임 로직, `format-time`)는 단위 테스트로 검증:

```bash
pnpm test
# core: 79 passed
#   sliding (31), 2048 (15), fruit-box (15), lights-out (10),
#   format-time (4), nonogram (4)
# web: 2 passed (cn)
```

## 배포 (Vercel)

`apps/web`을 Vercel에 import하면 모노레포 자동 감지로 빌드 가능합니다.
환경 변수는 현재 필요하지 않습니다.

## 추후 로드맵

1. 추가 퍼즐 — 지뢰찾기, 카드 짝맞추기 (메모리), 직소
2. 이미지 업로드 기능 (S3 presigned URL, 정사각형 크롭 UI)
3. 로컬 베스트 기록 / 통계 (DB 없이 localStorage 기반)
4. 일일 챌린지 (시드 기반 동일 보드)
5. 사용자/기록, 리더보드
6. React Native (Expo) 모바일앱 실 구현

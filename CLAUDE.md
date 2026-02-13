# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
pnpm dev              # Start development server with HMR
pnpm build            # Production build with Vite
pnpm preview          # Preview production build locally

# Code Quality
pnpm lint             # Run ESLint with strict rules
pnpm format           # Format code with Prettier
pnpm format:check     # Check if code is properly formatted

# Testing & Documentation
pnpm storybook        # Start Storybook development server
pnpm build-storybook  # Build static Storybook for deployment

# Setup
pnpm prepare          # Setup Husky git hooks (run after clone)
```

## Architecture Overview

**HOUME** is an AI-powered interior design platform built with React 19 + TypeScript + Vite. The codebase uses feature-based organization with domain-driven design principles.

### Tech Stack

- **Frontend**: React 19.1.0 + TypeScript 5.8.3 + Vite 7.0.0
- **Styling**: Vanilla Extract (zero-runtime CSS-in-JS) + CSS Variables design system
- **State Management**: Zustand (auth) + TanStack Query (server state) + @use-funnel (wizards)
- **Routing**: React Router DOM 7.6.3 with Data APIs
- **Package Manager**: pnpm 10.18.2 (required)
- **Node Version**: 22.x (specified in .nvmrc)

### Key Folder Structure

```
src/
├── pages/                    # Feature-based organization
│   ├── home/                # Landing page with animations
│   ├── imageSetup/          # Onboarding funnel (formerly "onboarding")
│   ├── generate/            # AI image generation workflow
│   ├── login/ & signup/     # Authentication (Kakao OAuth)
│   └── mypage/              # User profile and history
├── shared/                  # Cross-cutting concerns
│   ├── apis/               # HTTP client setup and utilities
│   ├── components/         # Reusable UI components (documented in Storybook)
│   ├── styles/             # Design tokens and global styles
│   ├── hooks/              # Custom React hooks
│   └── types/              # Shared TypeScript definitions
└── routes/                 # Routing configuration with object-based router
```

Each `pages/` feature contains its complete domain:

- `apis/` - Feature-specific API calls
- `components/` - Feature UI components
- `hooks/` - Business logic hooks
- `stores/` - Local Zustand stores
- `types/` - Feature TypeScript definitions

### Path Aliases (Configured in vite.config.ts)

```typescript
@/           → src/
@pages       → src/pages/
@layout      → src/layout/
@routes      → src/routes/
@stories     → src/stories/
@shared      → src/shared/
@apis        → src/shared/apis/
@assets      → src/shared/assets/
@components  → src/shared/components/
@constants   → src/shared/constants/
@hooks       → src/shared/hooks/
@styles      → src/shared/styles/
@types       → src/shared/types/
@utils       → src/shared/utils/
```

### State Management Patterns

- **Server State**: TanStack Query for API data with caching and synchronization
- **Global Client State**: Zustand stores (primarily for authentication with localStorage persistence)
- **Funnel/Wizard State**: @use-funnel for multi-step workflows (onboarding, generation)
- **Local Component State**: React hooks (useState, useReducer)

### Authentication Architecture

- **Kakao OAuth** integration for social login
- **JWT tokens** with automatic refresh via axios interceptors in `shared/apis/`
- **Protected routes** using authentication guards
- **Auth state** managed in Zustand store with persistence

### Styling System

- **Vanilla Extract** for type-safe CSS-in-JS (zero runtime)
- **Design tokens** system in `shared/styles/` (colors, fonts, spacing, animations)
- **Component documentation** in Storybook with visual regression testing
- **Global styles** and CSS variables for consistent theming

### Development Workflow

- **Git Flow** with feature branches (e.g., `feature/issue-number/#123`)
- **Husky pre-commit hooks** run lint-staged for code quality
- **2+ reviewer approval** required for PR merges to main branch
- **Issue-driven development** with numbered branches matching GitHub issues

### Testing Strategy

- **Vitest** for unit testing
- **Storybook** for component development and visual testing
- **Playwright** for browser testing of Storybook stories
- **Chromatic** for visual regression testing

### Build Configuration

- **Vite plugins**: Vanilla Extract, SVGR (SVG as components)
- **TypeScript strict mode** with comprehensive path mapping
- **Code splitting ready** architecture for production optimization
- **Vercel deployment** with SPA routing configuration

## Key Architectural Patterns

### API Layer Architecture

The codebase uses a centralized API system with strict type safety:

- **Request Wrapper**: All API calls use `shared/apis/request.ts` wrapper function
- **Endpoint Constants**: API endpoints are centralized in `shared/constants/apiEndpoints.ts` with type safety
- **Response Structure**: Standardized `BaseResponse<T>` wrapper for all API responses
- **Error Handling**: Centralized error handling with automatic token refresh in axios interceptors

**API Call Pattern:**

```typescript
// Always use the request wrapper with explicit typing
export const getFloorPlan = async (): Promise<FloorPlanResponse['data']> => {
  return request<FloorPlanResponse['data']>({
    method: HTTPMethod.GET,
    url: API_ENDPOINT.IMAGE_SETUP.FLOOR_PLAN,
  });
};
```

**Token Refresh Mechanism:**

- Axios interceptors automatically detect `ACCESS_TOKEN_EXPIRED` errors (code check in response)
- Attempts token refresh via `/reissue` endpoint with `withCredentials: true`
- Updates both `localStorage` and Zustand store synchronously
- Retries original request with new token automatically
- Throws `SESSION_EXPIRED` error if refresh fails (handled by UI layer)

### ImageSetup Funnel Architecture

The main user onboarding flow (`pages/imageSetup/`) is a 4-step wizard:

1. **HouseInfo**: Basic housing information (type, structure, area)
2. **FloorPlan**: Floor plan template selection with mirror toggle
3. **InteriorStyle**: Mood board selection for interior styling
4. **ActivityInfo**: Activity type and furniture selection with validation rules

Each step uses `@use-funnel/react-router` for state management and navigation, with context passed between steps and strong TypeScript validation.

**Funnel Pattern:**

- Each step has strict input/output type definitions in `types/funnel/steps.ts`
- Validation rules centralized in `types/funnel/validation.ts` (e.g., `HOUSE_INFO_VALIDATION`, `MAIN_ACTIVITY_VALIDATION`)
- Business logic encapsulated in step-specific hooks (`hooks/use[Step].ts`)

**Funnel History Management:**

```typescript
// Use history.replace() to update current step without browser history
history.replace('FloorPlan', data);
// Use history.push() to navigate to next step with browser history
history.push('InteriorStyle', data);
```

- `history.replace()`: Updates current step data without creating browser back button entry
- `history.push()`: Navigates to next step, allows browser back button to return to previous step
- This pattern preserves user input when navigating back while preventing duplicate history entries

### Component Organization

- **Feature Components**: Specific to pages, co-located with business logic
- **Shared Components**: Reusable UI components documented in Storybook
- **No Barrel Exports**: Direct imports prevent bundling issues
- **Vanilla Extract**: All styling is type-safe with zero runtime CSS-in-JS

## Development Guidelines

### Naming Conventions

Following the team's established conventions from the README:

**Files & Folders:**

- Components: `PascalCase.tsx` (e.g., `Button.tsx`, `UserProfile.tsx`)
- Folders: `camelCase` (e.g., `userProfile/`, `sharedComponents/`)
- Styles: `*.css.ts` for Vanilla Extract (e.g., `Button.css.ts`)
- Hooks: `use*.ts` (e.g., `useUserList.ts`, `useModal.ts`)
- API functions: `{resource}Api.ts` (e.g., `userApi.ts`) - though this project uses per-feature `apis/` folders
- Types: `*.ts` (e.g., `user.ts`, `common.ts`)

**Code:**

- Variables/Functions: `camelCase` (e.g., `userName`, `getUserData`)
- Constants: `BIG_SNAKE_CASE` (e.g., `MAX_LENGTH`, `API_KEY`)
- Components/Classes: `PascalCase` (e.g., `RankTable`, `UserProfile`)
- Functions: Use verb + noun (e.g., `getUserData`, `createNewUser`, `handleButtonClick`)
- Boolean functions: `is/has/can` prefix (e.g., `isLoggedIn`, `hasPermission`)
- API functions: HTTP method + noun (e.g., `getUserList`, `postComment`, `deleteArticle`)
- TanStack Query hooks: `use + action + resource + Query/Mutation` (e.g., `useGetUserListQuery`, `useCreateUserMutation`)

### Type Safety Requirements

- **Explicit Return Types**: All async functions must specify `Promise<T>` return types
- **API Type Consistency**: Use `request<T>()` wrapper with explicit generic types
- **No Any Types**: Strict TypeScript configuration prohibits `any` usage
- **Interface vs Type**: Use interfaces for objects/API responses, types for unions/functions
- **Props Types**: Component props should be named `ComponentNameProps` (e.g., `ButtonProps`)
- **No Prefixes**: Avoid `I`, `T`, or `Type` prefixes/suffixes (except generic `T`)

### Import/Export Patterns

**No Barrel Exports**: The codebase deliberately avoids index.ts re-exports to prevent bundling issues.

```typescript
// ❌ Bad - Don't create barrel exports
// components/index.ts
export { Button } from './Button';
export { Input } from './Input';

// ✅ Good - Direct imports with path aliases
import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
```

**Path Aliases**: Always prefer path aliases over relative imports:

```typescript
// ✅ Good
import { getUserList } from '@apis/user';
import Button from '@components/Button';

// ❌ Bad
import { getUserList } from '../../../shared/apis/user';
```

**Default Exports**: Single-component files use default exports:

```typescript
// Button.tsx
export default function Button() {}

// Usage
import Button from '@components/Button';
```

### Code Quality Standards

- **ESLint Configuration**: Strict rules with React hooks exhaustive deps checking
- **Prettier Formatting**: Automated formatting with pre-commit hooks
- **Import Organization**: Auto-sorted imports with path alias preference (via ESLint plugin)
- **Commit Conventions**: Conventional commits with 2+ reviewer approval required
- **Pre-commit Hooks**: Husky + lint-staged runs ESLint --fix and Prettier on staged files

### Query Key Pattern

The codebase uses a simple object pattern for TanStack Query keys:

```typescript
// shared/constants/queryKey.ts
export const QUERY_KEY = {
  LANDING: 'landing',
  MYPAGE_USER: 'mypage-user',
  MYPAGE_IMAGES: 'mypage-images',
  // Simple string constants, no factory pattern needed for this app
};

// Usage in hooks
const { data } = useQuery({
  queryKey: [QUERY_KEY.MYPAGE_USER],
  queryFn: getUserData,
});
```

Note: Unlike larger applications, this codebase uses simple string constants rather than factory functions for query keys. Dynamic parameters (like IDs) are appended as additional array elements when needed.

## Git Workflow

### Branch Strategy

- **Main branches**: `main` (production) and `develop` (integration/development base)
- **Feature branches**: Branch from `develop`, merge back to `develop`
- **Branch naming**: `type/description/#issue-number`
  - Examples: `feat/login-page/#12`, `fix/button-style/#25`

### Issue-Driven Development

- **Every feature requires a GitHub issue** created before implementation
- **Issue format**: `[type] title` (e.g., `[feat] 로그인 페이지 구현`)
- **PR format**: `[type] title` (e.g., `[feat] 로그인 페이지 구현`)

### Commit Convention

**Format**: `type: title` (e.g., `feat: 로그인 기능 구현`)

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactoring (no behavior change)
- `style`: Code formatting, semicolons, etc. (no business logic change)
- `design`: UI/CSS changes
- `chore`: Build scripts, configs, dependencies (no production code change)
- `docs`: Documentation
- `test`: Tests
- `comment`: Comments
- `rename`: Renaming files/folders
- `remove`: File deletion

### Pull Request Process

- **2+ reviewer approval required** before merge
- **Review acknowledgment**: Leave emoji reactions after reviewing
- **Re-request review**: After addressing feedback, re-request review from reviewers
- **PR destination**: Feature branches merge into `develop`, `develop` merges into `main` for releases

## Known Technical Debt

- `src/routes/router.tsx:11` - 라우트 lazy loading 필요
- `src/pages/generate/pages/loading/LoadingPage.tsx:53` - 커스텀 훅 분리 필요
- `src/pages/imageSetup/types/funnel/steps.ts:8,42` - 타입 DRY 리팩토링 필요
- `src/shared/apis/queryClient.ts:15` - staleTime 검토 필요

# important-instruction-reminders

Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (\*.md) or README files. Only create documentation files if explicitly requested by the User.

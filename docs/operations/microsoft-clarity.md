# Microsoft Clarity (Prod/Preview Split)

This document explains how HOUME-CLIENT loads Microsoft Clarity (heatmaps / session replay) and how to split data between Vercel **Production** and **Preview** deployments.

## Goal

- Avoid mixing Production and Preview data by using different Clarity Project IDs.
- Load Clarity only when an explicit Project ID is provided (no ID, no script).

## Environment Variable

- `VITE_CLARITY_PROJECT_ID`
  - Type: string
  - Scope: Vercel Environment Variables
  - Behavior: when unset/empty, the client does not load Clarity.

## Vercel Setup

1. Create two Clarity projects:
   - Production project (real users)
   - Preview project (QA / feature branch previews)
2. In Vercel, set `VITE_CLARITY_PROJECT_ID` with different values by environment:
   - Production scope: Production Project ID
   - Preview scope: Preview Project ID
3. (Optional) Keep it unset in Development to avoid local noise.

## Client Behavior

- Implementation:
  - `src/shared/config/clarity.ts` (`initClarity`)
  - `src/main.tsx` (calls `initClarity()` during app bootstrap)
- Loading rules:
  - If `VITE_CLARITY_PROJECT_ID` is missing or blank: do nothing.
  - If present: injects the Clarity script tag (`https://www.clarity.ms/tag/<projectId>`).

## Verification Checklist

- Network:
  - Confirm a request to `https://www.clarity.ms/tag/<projectId>` is made on page load.
- Clarity dashboard:
  - Preview deployments should only show up in the Preview project.
  - Production deployments should only show up in the Production project.

## Disable / Rollback

- Unset `VITE_CLARITY_PROJECT_ID` (or set it to an empty value) in the relevant Vercel environment.

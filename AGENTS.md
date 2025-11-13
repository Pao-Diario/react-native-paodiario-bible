# Repository Guidelines

## Project Structure & Module Organization
Source lives under `src/`, with the `Bible/` directory housing feature modules (context providers, readers, pickers, hooks, and `assets/`). Shared UI sits in `src/components/`, cross-cutting logic in `src/services/`, visual tokens in `src/themes/`, and reusable declarations in `src/types/`. `src/index.ts` is the public surface; keep new exports centralized there so `lib/src/index.js` (generated output) stays aligned. The `example/` React Native app is the integration playground and should be updated whenever you ship a breaking change.

## Build, Test, and Development Commands
Run `npm install` once, then use the scripts below:

```bash
npm run build        # transpile TypeScript to `lib/` via tsc (strict mode)
npm run deploy       # build, pack, and publish to npm
cd example && npm run ios|android # boot the sample app against the local tarball
cd example && npm run start       # launch Metro for manual testing
```

Rebuild before committing so the checked-in `lib/` mirrors `src/`. When iterating on the example, re-pack the module (`npm run build && npm pack`) and update the tarball reference in `example/package.json` if the version changes.

## Coding Style & Naming Conventions
Use TypeScript, strict null checks, and two-space indentation. Prefer double quotes in JSX/TSX, keep props sorted logically (state, callbacks, render helpers), and colocate styles with their components using `styled-components`. Components should be PascalCase, hooks start with `use`, context providers end with `Provider` or `Wrapper`, and files exporting multiple items stay in kebab-case directories for clarity. Avoid default exports for hooks unless mirroring existing patterns.

## Testing Guidelines
Automated tests run in the example workspace: `cd example && npm test` (Jest with React Native Testing Library). When adding coverage, place specs next to the feature (`src/Bible/Reader/__tests__/Reader.spec.tsx`) and favor behavior-driven names (`renders verse actions when audio mode enabled`). Document manual validation steps in the PR when touching UI or native bridges, and keep screenshot/video evidence for regressions that are hard to capture with Jest.

## Commit & Pull Request Guidelines
Follow Conventional Commits (`feat:`, `fix:`, `chore:`) as seen in `git log`. Each PR should describe the change, list affected packages (module vs example), call out breaking API updates, and link to any related issue. Include screenshots for UI adjustments, update README/AGENTS when altering developer workflows, and ensure `npm run build` plus `cd example && npm test` have been executed locally.

## Native Configuration Tips
The example app documents required native setup (e.g., `npx rnvi-update-plist package.json ios/example/Info.plist` for vector icons, installing `react-native-fs` and `react-native-track-player`). Reflect any new native dependency steps here and inside `README.md` so downstream apps can mirror the configuration without guesswork.

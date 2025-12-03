# Repository Guidelines

## Project Structure & Module Organization
Source lives in `src/`, with the `Bible/` folder holding feature modules (context, readers, pickers, hooks, and `assets/`). UI primitives sit in `src/components/`, cross-cutting helpers in `src/services/`, visual tokens in `src/themes/`, and shared types in `src/types/`. Export everything through `src/index.ts` so the generated `lib/` mirror stays accurate. The `example/` React Native app is the integration playground; keep it updated whenever the public API or native setup changes.

## Build, Test, and Development Commands
Install dependencies in both the root and example once, then rely on:

```bash
npm run build                 # transpile TypeScript into lib/ via tsc
npm run deploy                # build, pack, and publish to npm
cd example && npm run start   # launch Metro against the linked workspace
cd example && npm run ios|android # boot the sample app
cd example && npm test        # run Jest suite
```

Always rebuild before publishing so `lib/` stays in sync. When validating the example against local changes, run `npm run build && npm pack` (root) before reinstalling the tarball or just rely on the `file:..` link.

## Coding Style & Naming Conventions
Use TypeScript with strict mode and two-space indentation. Prefer double quotes in TS/TSX and colocate styles via `styled-components`. Components are PascalCase, hooks start with `use`, context providers end with `Provider`/`Wrapper`, and files grouping related exports live inside directories named after the feature (e.g., `ReaderModal/`). Keep props ordered by data, callbacks, render helpers.

## Testing Guidelines
Jest (configured in `example/`) handles automated checks. Place new specs next to the feature (`src/Bible/Reader/__tests__/Reader.spec.tsx`) and favor behavior-focused names (`renders highlight controls when verse selected`). Document manual steps for UI or native changes in PRs and attach screenshots when visuals shift.

## Commit & Pull Request Guidelines
Follow Conventional Commits (`feat:`, `fix:`, `chore:`) as shown in history. Every PR should outline the change, list test commands (`npm run build`, `cd example && npm test`), and link issues. Include screenshots or videos for UI tweaks, mention breaking API updates explicitly, and update README/AGENTS when developer workflows shift.

## Native Configuration Tips
Mirror the instructions in `README.md` for required native dependencies (`react-native-fs`, `react-native-share`, `react-native-track-player`). Run `npx rnvi-update-plist package.json ios/example/Info.plist` after installing vector icons on iOS. Any new native module must document installation steps here and in the README so consumers can mirror the setup quickly.

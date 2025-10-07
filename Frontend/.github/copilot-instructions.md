# Copilot Instructions for MyZomato Frontend

## Project Overview
- This is a React single-page application bootstrapped with Vite for fast development and HMR.
- The codebase is minimal and uses JavaScript (not TypeScript).
- Main entry: `src/main.jsx` renders `App.jsx`.
- Static assets are in `public/` and `src/assets/`.

## Key Files & Structure
- `src/App.jsx`: Main app component, root of UI logic.
- `src/main.jsx`: ReactDOM render entry point.
- `src/App.css`, `src/index.css`: Global and app-specific styles.
- `vite.config.js`: Vite build configuration.
- `eslint.config.js`: ESLint rules (expand as needed).
- `index.html`: Vite HTML template.

## Developer Workflows
- **Start dev server:** `npm run dev` (Vite HMR)
- **Build for production:** `npm run build`
- **Preview production build:** `npm run preview`
- **Lint:** `npx eslint .`

## Patterns & Conventions
- Components are function-based and reside in `src/`.
- Asset imports use relative paths (e.g., `import logo from './assets/react.svg'`).
- No custom routing, state management, or API integration present by default.
- CSS is imported directly in JS files.
- No TypeScript or test setup out of the box.

## External Integrations
- Uses Vite plugins for React (`@vitejs/plugin-react` or `@vitejs/plugin-react-swc`).
- No backend or API calls in the starter template.

## How to Extend
- Add new components in `src/` and import into `App.jsx`.
- For global styles, edit `src/index.css`; for component styles, use CSS modules or scoped CSS in new files.
- To add TypeScript, follow Vite/React TS template guidance.

## Example: Adding a Component
```js
// src/MyComponent.jsx
export default function MyComponent() {
  return <div>Hello from MyComponent!</div>;
}
// In App.jsx
import MyComponent from './MyComponent';
```

## References
- See `README.md` for Vite/React plugin details and ESLint expansion tips.
- For advanced config, check `vite.config.js` and official Vite/React docs.

---
_If any conventions or workflows are unclear, please ask for clarification or provide feedback to improve these instructions._

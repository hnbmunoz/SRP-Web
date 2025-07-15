# baseLayout
A Base Layout of the Front End using ReactJs
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Application Structure

The application structure is organized as follows:

- `.gitignore`: Specifies intentionally untracked files that Git should ignore.
- `eslint.config.js`: Configuration file for ESLint, a JavaScript linter.
- `index.html`: The main HTML file for the application.
- `package-lock.json`: Records the exact versions of dependencies used in the project.
- `package.json`: Contains metadata about the project, including dependencies and scripts.
- `README.md`: Provides an overview of the project.
- `tsconfig.app.json`: Configuration file for the TypeScript compiler, specific to the application.
- `tsconfig.json`: Base configuration file for the TypeScript compiler.
- `tsconfig.node.json`: Configuration file for the TypeScript compiler, specific to Node.js.
- `vite.config.ts`: Configuration file for Vite, a build tool.
- `public/`: Contains static assets that are served directly.
  - `vite.svg`: Vite logo.
- `src/`: Contains the source code for the application.
  - `App.css`: CSS file for the main App component.
  - `App.tsx`: The main App component.
  - `index.css`: Global CSS file.
  - `main.tsx`: Entry point for the application.
  - `vite-env.d.ts`: TypeScript declaration file for Vite environment variables.
  - `assets/`: Contains assets.
    - `react.svg`: React logo.
  - `components/`: Contains React components.
    - `Header.module.scss`: CSS module for the Header component.
    - `Header.tsx`: The Header component.
    - `Login.tsx`: The Login component.
    - `NotFound.tsx`: The NotFound component.
    - `SidePanel.tsx`: The SidePanel component.
    - `custom/`: Contains custom components.
      - `Loading.tsx`: The Loading component.
  - `routes/`: Contains React Router routes.
    - `PrivateRoutes.tsx`: Defines private routes.
    - `PublicRoutes.tsx`: Defines public routes.
  - `store/`: Contains Redux store files.
    - `authStore.ts`: Redux store for authentication.
    - `pageStore.ts`: Redux store for pages.

## Storybook

This project uses Storybook for component development and testing.

### Running Storybook

To start Storybook, run the following command:

```bash
npm run storybook
```

This will open Storybook in your browser at http://localhost:6006.

### Building Storybook

To build Storybook, run the following command:

```bash
npm run storybook:build
```

This will create a static Storybook build in the `storybook-static` directory.

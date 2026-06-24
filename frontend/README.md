# Household-Economics (Frontend)

## 💽 Installation

To install the dependencies, simply run the following command:

```sh
make i
```

## 🚀 Execution

To start the application, simply run the following command:

```sh
make run
```

## 📂 Project structure

```
frontend/
├── public
│   └── expense.png
├── src
│   ├── core/...
│   └── ui
│       ├── app/...
│       ├── components
│       │   ├── Footer/...
│       │   └── Sidebar/...
│       ├── pages
│       │   ├── Categories/...
│       │   ├── Configuration/...
│       │   ├── DailyRegister/...
│       │   ├── Dashboard/...
│       │   ├── ExpenseTracking/...
│       │   ├── MonthlyBudget/...
│       │   ├── SavingsInvestments/...
│       │   └── Wishlist/...
│       ├── routes
│       │   ├── components
│       │   │   ├── PageLoader/...
│       │   │   ├── RouteError/...
│       │   │   └── Router/...
│       │   ├── index.ts
│       │   └── paths.ts
│       ├── styles
│       │   └── global.css
│       └── main.tsx
├── .gitignore
├── eslint.config.js
├── index.html
├── Makefile
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 🎯 Additional considerations for developers

### Makefile (Available scripts)

- Install dependencies:

  ```sh
  make i
  ```

- Start development server:

  ```sh
  make run
  ```

- Build for production:

  ```sh
  make build
  ```

- Lint the codebase:

  ```sh
  make lint
  ```

- Format the codebase:

  ```sh
  make format
  ```

- Chack the codebase format:
  ```sh
  make format-check
  ```

### Workflow

1. **Feature branching:** Each new feature or fix must be developed on a separate branch; these new branches must be created from `release` and never from `main`.
2. **Commits:** Descriptive and following the `"type: message"` convention. Example:
   - feat: add Google authentication.
   - fix: fix error when validating empty credentials.
   - docs: Update installation instructions.
   - refactor: Simplify user validation logic.
3. **Pull requests:** Before merging changes into `release`, a `pull request` must be created and reviewed and approved.
4. **Code review:** Include a clear description of the changes and how to test them.

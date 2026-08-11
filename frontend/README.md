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

### Environment variables

The project requires certain environment variables to run, these variables must be defined in a `.env` file in the project root directory.

An example of what the `.env` file should look like:

```sh
VITE_API_URL=http://127.0.0.1:8080
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 📂 Project structure

```
frontend/
├── public
│   ├── _headers
│   ├── _redirects
│   └── household-economics.ico
├── src
│   ├── core
│   │   ├── auth/...
│   │   ├── business
│   │   │   ├── annual-budget/...
│   │   │   ├── categories/...
│   │   │   ├── currency-type/...
│   │   │   ├── current-user/...
│   │   │   ├── daily-register/...
│   │   │   │   ├── expense/...
│   │   │   │   └── income/...
│   │   │   ├── dashboard/...
│   │   │   ├── family/...
│   │   │   ├── monthly-tracking/...
│   │   │   ├── record-types/...
│   │   │   └── savings-investments/...
│   │   ├── client/...
│   │   ├── env.ts
│   │   └── errors.ts
│   └── ui
│       ├── app/...
│       ├── components
│       │   ├── AppModal/...
│       │   ├── Button/...
│       │   ├── DateInput/...
│       │   ├── FeatureCard/...
│       │   ├── Footer/...
│       │   ├── Input/...
│       │   ├── NumberInput/...
│       │   ├── Select/...
│       │   ├── Sidebar/...
│       │   └── Tooltip/...
│       ├── contexts
│       │   ├── ApiActivityContext/...
│       │   └── ModalContext/...
│       ├── handlers
│       │   ├── ApiActivityHandler/...
│       │   └── AuthTokenHandler/...
│       ├── hooks/...
│       ├── layouts
│       │   ├── PrivateLayout/...
│       │   └── PublicLayout/...
│       ├── pages
│       │   ├── AnnualBudget/...
│       │   ├── Categories/...
│       │   ├── Dashboard/...
│       │   ├── FamilySettings/...
│       │   ├── Home/...
│       │   ├── MonthlyTracking/...
│       │   ├── PrivacyPolicy/...
│       │   └── SavingsInvestments/...
│       ├── routes
│       │   ├── components
│       │   │   ├── AcessError/...
│       │   │   ├── AccessGuard/...
│       │   │   ├── PageLoader/...
│       │   │   ├── PendingAccess/...
│       │   │   ├── RouteError/...
│       │   │   └── Router/...
│       │   ├── index.ts
│       │   └── paths.ts
│       ├── styles/...
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

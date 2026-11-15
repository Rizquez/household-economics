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

## 🎯 Additional considerations for developers

### Workflow

1. **Feature branching:** Each new feature or fix must be developed on a separate branch; these new branches must be created from `release` and never from `main`.
2. **Commits:** Descriptive and following the `"type: message"` convention. Example:
   - feat: add Google authentication.
   - fix: fix error when validating empty credentials.
   - docs: Update installation instructions.
   - refactor: Simplify user validation logic.
3. **Pull requests:** Before merging changes into `release`, a `pull request` must be created and reviewed and approved.
4. **Code review:** Include a clear description of the changes and how to test them.

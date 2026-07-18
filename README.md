# Household Economics - v1.0.0

## 🧾 Project description

Household Economics is an app designed to simplify household financial management. Its goal is to centralize the planning, tracking, and organization of family finances on a single platform, providing a simple interface and tools to help users make better financial decisions.

The app is intended for both individuals and families who want a comprehensive overview of their financial situation without having to rely on multiple separate tools.

The project is divided into three completely independent applications:

- **Backend:** An API responsible for business logic and communication with the database.
- **Database:** An independent library that encapsulates data models and database access services.
- **Frontend:** A web application responsible for user interaction.

Each of these projects has its own documentation and can evolve independently.

## 📑 Context

Household financial management is often spread across spreadsheets, banking apps, wish lists, note-taking apps, and other standalone tools. As a result, information ends up being duplicated, and it becomes difficult to get a clear picture of the family’s financial situation.

Household Economics was created with the goal of consolidating all that information into a single platform, allowing users to record, plan, and review all aspects of household finances in one place.

The project is designed to become the central hub for managing family finances over the long term.

### Who is it designed for?

Currently, the app is designed for:

- People who want to keep better track of their personal finances.
- Couples who manage their household finances together.
- Families looking to plan budgets, control expenses, and track their savings and investments.

### Use cases

The app’s main features include:

- Income and expense management.
- Organization of financial categories.
- Annual budget planning.
- Daily recording of financial transactions.
- Monthly tracking of financial status.
- Visualization via a dashboard with indicators and charts.
- Monthly savings management.
- Investment tracking.
- Household financial management.

## 🛠️ Key features

Household Economics has been developed using a modular architecture that clearly separates the responsibilities of each application.

Its key features include:

- REST API developed with FastAPI.
- Standalone data access library based on SQLAlchemy.
- Frontend developed with React, TypeScript, and Vite.
- Modular architecture based on the separation of business logic and the user interface.
- Database completely decoupled from the backend.
- Authentication via Google and Microsoft OAuth (Clerk).
- Architecture designed for managing families and multiple users.
- Separation between development and production environments.
- Migration system using Alembic.

## 🚀 Getting started

1. Clone this repository:
    - (ssh):
        ```sh
        git clone git@github.com:Rizquez/household-economics.git
        ```

    - (http):
        ```sh
        git clone https://github.com/Rizquez/household-economics.git
        ```

2. Access the project directory:
    ```sh
    cd household-economics
    ```

3. Activate workspace: 

    This repository requires the `household-economics.code-workspace` file to be present in the root of the directory. The file must contain at least the following:

    ```json
    {
        "folders": [
            {
                "name": ".github",
                "path": ".github"
            },
            {
                "name": "backend",
                "path": "backend"
            },
            {
                "name": "database",
                "path": "database"
            },
            {
                "name": "frontend",
                "path": "frontend"
            }
        ]
    }
    ```

    This tells the workspace which folders should be included in it.

## 📂 Project structure

```
├── .github
│   ├── workflows
│   │   ├── database-migration.yml
│   │   ├── format-check.yml
│   │   └── main-source-check.yml
│   └── CODEOWNERS
├── backend/...
├── database/...
├── frontend/...
├── .gitignore
├── LICENSE
└── README.md
```

## 📚 Documentation

Each project has its own documentation, which explains its installation, configuration, and operation:

- [Backend (README)](./backend/README.md)
- [Database (README)](./database/README.md)
- [Frontend (README)](./frontend/README.md)

## 🚧 Roadmap

Household Economics will continue to evolve through new versions.

Some of the features planned for future versions include:

- Comprehensive management of family members.
- Invitation system.
- Roles and permissions.
- Financial goals.
- Notifications.
- Advanced statistics.
- Mobile app/PWA.

## 🎯 Project philosophy

Household Economics is not intended to replace a banking app or a professional accounting tool.

Its goal is to become the hub of household financial organization, providing a simple, intuitive experience that is fully tailored to a family’s real needs.

Every new feature is designed according to three fundamental principles:

- Simplicity over complexity.
- Organization over automation.
- Useful information over data overload.

## 🔒 License

This project is licensed under the MIT license, which allows its use, distribution, and modification under the conditions specified in the `LICENSE` file.

## 👨‍💻 Autor

- Pedro Rizquez: pedro.rizquez.94@hotmail.com

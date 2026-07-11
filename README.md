# Household-Economics

## 🧾 Project description

Household Economics is an application designed to assist with household financial management. The goal of the project is to centralize the planning, tracking, and organization of household finances on a single platform, providing a simple interface and tools that facilitate decision-making.

The project is divided into three independent applications:

- **Backend:** An API responsible for business logic and communication with the database.
- **Database:** A library that encapsulates data models and data access services.
- **Frontend:** A web application developed for user interaction.

Each of these projects maintains its own documentation and can evolve independently.

## 📑 Context

Household financial management is often spread across spreadsheets, note-taking apps, banks, wish lists, and other standalone tools. This leads to duplicate information and makes it difficult to get a comprehensive view of the family’s financial situation.

This project was created with the goal of consolidating that information into a single app, allowing users to manage the various aspects of household finances in an organized manner.

### Who is it useful for?

Currently, the project is designed for families or individuals who want to maintain greater control over their personal finances using a single tool.

### Examples of use

- Managing income and expense categories.
- Organizing annual budgets.
- Recording daily financial transactions.
- Tracking expenses.
- Managing wish lists.
- Monitoring savings and investments.


## 🛠️ Key features

The project is currently under active development.

The architecture is organized into several independent projects with clearly defined responsibilities:

- Backend based on FastAPI.
- Independent library for database access using SQLAlchemy.
- Frontend developed with React, TypeScript, and Vite.
- Modular architecture designed to separate business logic from the user interface.
- Authentication via Google OAuth.

## 🚀 Getting Started

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

In each `README` file, you'll find information about installing and running each project:

* [Backend (README)](./backend/README.md)
* [Database (README)](./database/README.md)
* [Frontend (README)](./frontend/README.md)

## 🔒 License

This project is licensed under the MIT license, which allows its use, distribution, and modification under the conditions specified in the `LICENSE` file.

## ⚙ Contact, support, and development

- Pedro Rizquez: pedro.rizquez.94@hotmail.com

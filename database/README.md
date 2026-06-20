# Household-Economics (Database)

## 💽 Installation

1. Create a development environment using the `virtualenv` library:
    ```sh
    virtualenv venv
    ```

    - If you don't have the library installed, you can run:
        ```sh
        python -m venv env
        ```

2. Install the dependencies:
    ```sh
    pip install -r requirements.txt
    ```

> [!IMPORTANT]
> If you're using operating systems such as macOS or Linux, use the `pip3` and `python3` commands.

## 🚀 Execution

### Alembic (Migration)

To generate a migration correctly, you must be in the `./household-economics/database/` directory. Once there, you'll need to run a series of commands:

- Generate the migration:
    ```sh
    alembic revision --autogenerate -m "Here is where you should enter the message describing the change"
    ```

- Commit the migration changes to the database::
    ```sh
    alembic upgrade head
    ```

- Undo the most recent changes made to the database:
    ```sh
    alembic downgrade -1
    ```

> [!NOTE]
> You can apply changes by specifying the specific revision ID associated with a particular migration.

### Environment variables

The project requires certain environment variables to run, these variables must be defined in a `.env.local` file in the project root directory.

An example of what the `.env.local` file should look like:

```sh
POSTGRES_URI=postgresql://xxxxx:xxxxx@xxxxx-xxxxx:xxxxx/xxxxx
```

> [!IMPORTANT]
> This project does not have an execution command, since it is installed on the `backend` as a library and used as such.

## 📂 Project structure

```
database/
├── alembic
│   ├── versions/...
│   ├── env.py
│   └── script.py.mako
├── database_package
│   └── __init__.py
├── models
│   ├── __init__.py
│   ├── base.py
│   └── categories.py
├── services
│   ├── __init__.py
│   ├── base.py
│   └── categories.py
├── .gitignore
├── alembic.ini
├── db.py
├── pyproject.toml
├── README.md
└── requirements.txt
```

## 🎯 Additional considerations for developers

### Semantic versioning criteria (x.xx.xxx)

The criteria for each version number are described below:

- **Major (x):** Increments when there are significant changes that make previous versions incompatible.
- **Minor (xx):** Increases when new features compatible with the previous version are added.
- **Patch (xxx):** Increases when minor bug fixes that do not affect functionality are made.

### Workflow

1. **Feature branching:** Each new feature or fix must be developed on a separate branch; these new branches must be created from `release` and never from `main`.
2. **Commits:** Descriptive and following the `"type: message"` convention. Example:
    - feat: add Google authentication.
    - fix: fix error when validating empty credentials.
    - docs: Update installation instructions.
    - refactor: Simplify user validation logic.
3. **Pull requests:** Before merging changes into `release`, a `pull request` must be created and reviewed and approved.
4. **Code review:** Include a clear description of the changes and how to test them. 

### Forward references and modern typing (PEP 484 / PEP 563)

The project uses *Forward References* following modern Python recommendations for static typing.

To do this, two complementary mechanisms are combined:

- `from __future__ import annotations`, which delays the evaluation of all type annotations.
- `TYPE_CHECKING`, which allows imports to be performed only during static analysis (for example, with *mypy* or editors such as VS Code), avoiding runtime dependencies.

Example:

```python
from __future__ import annotations
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from models import MyFirstClass

class MySecondClass:
    def do_something(self, first: MyFirstClass) -> None:
        pass
```

This combination allows you to:

- Avoid import cycles.
- Not execute unnecessary imports at runtime.
- Write clean and readable type annotations without having to use manual strings.
- Maintain compatibility with static analysis tools.

During normal program execution, `TYPE_CHECKING` evaluates to `False`, so protected imports are not performed. Type annotations are not evaluated at runtime thanks to `from __future__ import annotations`.

### Convention for private attributes and methods (Name mangling)

In Python, there is no true encapsulation as in other languages (Java, C++), but it can be simulated using conventions. In this project, the mechanism known as `Name Mangling` is used to name private attributes and methods, which involves using a double underscore (__) at the beginning of the name.

This mechanism not only indicates the intention to keep these elements private, but Python also internally modifies their names to avoid collisions, especially in inherited classes.

How does it work? When an attribute is defined as `__my_attribute` within a class, Python internally converts it to `_ClassName__my_attribute`, making accidental or unwanted external access difficult.

Example:

```python
class Engine:
    def __init__(self):
        self.__status = "on"

    @property
    def status(self):
        return self.__status

m = Engine()
print(m.status)            # ✔️ Output: on
print(m.__status)          # ❌ Error: AttributeError
print(m._Engine__status)   # ✔️ Access possible, but not recommended (Output: on)
```
> [!WARNING]
> Although technically accessible via the mangled name, its direct use is discouraged outside the context of the class itself.

## 📖 Additional documentation

- [Alembic](https://alembic.sqlalchemy.org/en/latest/)

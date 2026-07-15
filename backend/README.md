# Household-Economics (Backend)

## 💽 Installation

1. Create a development environment using the `virtualenv` library:
    ```sh
    virtualenv venv
    ```

    - If you don't have the library installed, you can run:
        ```sh
        python -m venv env
        ```

2. Activate environment:
    - (Windows)
        ```sh
        venv\Scripts\activate
        ```
    - (macOS/Linux)
        ```sh
        source venv/bin/activate
        ```

3. Install the dependencies:
    ```sh
    pip install -r requirements.txt
    ```

> [!NOTE]
> If you're using operating systems such as macOS or Linux, use the `pip3` and `python3` commands.

## 🚀 Execution

To start the application, you must first enable the service by running the following command in the console:

```sh
python app.py
```

Once it has started, the API will be available to receive requests.

It's recommend using `Postman`, `cURL`, or another similar tool to interact with the API.

### Environment variables

The project requires certain environment variables to run, these variables must be defined in a `.env` file in the project root directory.

An example of what the `.env` file should look like:

```sh
POSTGRES_URI=postgresql://xxxxx:xxxxx@xxxxx-xxxxx:xxxxx/xxxxx
ENVIRONMENT=LOCAL
CLERK_ISSUER=https://xxxxxxxx-xxxx-xx.clerk.accounts.dev
CLERK_JWKS_URL=https://xxxxxxxx-xxxx-xx.clerk.accounts.dev/.well-known/jwks.json
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_SERVICE_ID=service_xxxxxxx
EMAIL_TEMPLATE_ID=template_xxxxxxx
EMAIL_USER_ID=xxxxxxxxxxxxxxx_x
EMAIL_PRIVATE_KEY=xxxxxxxxxxxxxxxxxxxxx
```

### SSL certificates (macOS)

If `HTTPS` requests fail with an error similar to:

```text
ssl.SSLCertVerificationError:
[SSL: CERTIFICATE_VERIFY_FAILED]
certificate verify failed: unable to get local issuer certificate
```

Python is unable to locate a valid `Certificate Authority (CA)` bundle.

Install or update the `certifi` package:

```sh
pip install --upgrade certifi
```

Then define the following environment variables, pointing to the CA bundle provided by `certifi`:

```sh
SSL_CERT_FILE=/path/to/venv/lib/python3.x/site-packages/certifi/cacert.pem
REQUESTS_CA_BUNDLE=/path/to/venv/lib/python3.x/site-packages/certifi/cacert.pem
```

You can obtain the correct path by running:

```sh
python -c "import certifi; print(certifi.where())"
```

To verify that Python can establish secure `HTTPS connections` correctly, run:

```sh
python -c "import urllib.request; print(urllib.request.urlopen('https://www.google.com').status)"
```

The expected output is:

```text
200
```

If this command succeeds, the backend will also be able to securely retrieve `Clerk's JWKS` and validate authentication tokens.

## 📂 Project structure

```
backend/
├── src
│   ├── app
│   │   ├── __init__.py
│   │   ├── builder.py
│   │   └── settings.py
│   ├── auth
│   │   ├── __init__.py
│   │   ├── clerk.py
│   │   └── depends.py
│   ├── business
│   │   ├── core
│   │   │   ├── __init__.py
│   │   │   └── base.py
│   │   ├── services
│   │   │   ├── __init__.py
│   │   │   └── email.py
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── budget.py
│   │   ├── category.py
│   │   ├── dashboard.py
│   │   ├── expense.py
│   │   ├── family.py
│   │   ├── income.py
│   │   ├── monthly_tracking.py
│   │   ├── record_type.py
│   │   └── savings_investment.py
│   ├── routes
│   │   ├── helpers
│   │   │   ├── __init__.py
│   │   │   └── validate.py
│   │   ├── __init__.py
│   │   ├── budget.py
│   │   ├── category.py
│   │   ├── dashboard.py
│   │   ├── expense.py
│   │   ├── family.py
│   │   ├── income.py
│   │   ├── monthly_tracking.py
│   │   ├── record_type.py
│   │   ├── savings_investment.py
│   │   └── user.py
│   ├── schemas
│   │   ├── core
│   │   │   ├── __init__.py
│   │   │   └── base.py
│   │   ├── enums
│   │   │   ├── __init__.py
│   │   │   └── role.py
│   │   ├── helpers
│   │   │   ├── __init__.py
│   │   │   └── handler.py
│   │   ├── __init__.py
│   │   ├── budget.py
│   │   ├── category.py
│   │   ├── dashboard.py
│   │   ├── expense.py
│   │   ├── family.py
│   │   ├── income.py
│   │   ├── monthly_tracking.py
│   │   ├── record_type.py
│   │   ├── savings_investment.py
│   │   └── user.py
│   ├── constants.py
│   ├── env.py
│   └── setup.py
├── .gitignore
├── app.py
├── README.md
├── requirements_base.txt
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

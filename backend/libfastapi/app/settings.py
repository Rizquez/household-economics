import os
from typing import Union
from dotenv import load_dotenv

load_dotenv(dotenv_path=".env.local", override=True)


class Base:
    PORT: int = 8080
    WORKERS: int = 1
    VERSION = "0.0.1"
    ROOT: str = "/api/v1"


class Local(Base):
    HOST: str = "127.0.0.1"
    DEBUG: bool = True
    RELOAD: bool = True


class Render(Base):
    HOST: str = "0.0.0.0"
    DEBUG: bool = False
    RELOAD: bool = False


def get_settings() -> Union[Local, Render]:
    env = os.getenv("ENVIRONMENT", "LOCAL")
    if env == "RENDER":
        return Render()

    return Local()

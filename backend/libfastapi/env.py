import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=".env.local", override=True)

def _get_environment():
    return os.environ.get("ENVIRONMENT", "undefined")

def is_local_environment():
    return _get_environment() == "LOCAL"

def is_render_environment():
    return _get_environment() == "RENDER"
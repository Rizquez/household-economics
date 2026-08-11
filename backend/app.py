import uvicorn
from fastapi import status, Response

from src.app import builder_app, get_settings
from src.setup import setup_layers
from src.routes import setup_routers
from src.schemas.helpers import handling_errors_schemas

settings = get_settings()
app = builder_app(settings)

setup_layers()
setup_routers(app)
handling_errors_schemas(app)


@app.get("/", include_in_schema=False)
def health_check() -> Response:
    return Response(status_code=status.HTTP_204_NO_CONTENT)


if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.RELOAD,
        workers=settings.WORKERS,
    )

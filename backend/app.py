import uvicorn
from typing import Dict
from fastapi import status
from fastapi.responses import JSONResponse

from libfastapi.app import builder_app, get_settings

app = builder_app()
settings = get_settings()


@app.get("/")
def index() -> Dict[str, str]:
    return JSONResponse(content=app.description, status_code=status.HTTP_200_OK)


if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.RELOAD,
        workers=settings.WORKERS,
    )

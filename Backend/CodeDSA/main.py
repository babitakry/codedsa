from fastapi import FastAPI
from .routers import auth
from .database import engine
from . import models

app = FastAPI()
# To create table must be write this
models.Base.metadata.create_all(engine)

app.include_router(auth.router)
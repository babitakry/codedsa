from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth
from .database import engine
from . import models

app = FastAPI()

# ----------Connection---------------------

# Allow React frontend
origins = [
    "http://localhost:5173",  # React dev server
    # Add your production frontend URL here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # frontend address
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# To create table must be write this
models.Base.metadata.create_all(engine)

app.include_router(auth.router)
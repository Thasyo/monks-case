from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import users, metrics

app = FastAPI(title = "Case Técnico - MONKS")

origins = [
    "*",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://172.18.0.4:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(metrics.router, prefix="/metrics", tags=["Metrics"])

@app.get("/")
def root():
    return {"message": "API do case técnico rodando!"}
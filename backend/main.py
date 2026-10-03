from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from backend.linux_engine import run_command

app = FastAPI()
app.mount("/static", StaticFiles(directory="frontend"), name="static")

class CommandRequest(BaseModel):
    command: str

@app.get("/")
def home():
    return FileResponse("frontend/index.html")

@app.post("/api/terminal")
def terminal(request: CommandRequest):
    result = run_command(request.command)
    return {
        "output": result 
    }
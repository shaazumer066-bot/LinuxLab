from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()
app.mount("/static", StaticFiles(directory="frontend"), name="static")

@app.get("/")
def home():
    return FileResponse("frontend/index.html")
import json
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Optional
from pathlib import Path

app = FastAPI()

# CORS settings
origins = [
    "https://chat.openai.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Keep track of todo's. Does not persist if Python session is restarted.
_TODOS = {}

class Todo(BaseModel):
    todo: str

class TodoIndex(BaseModel):
    todo_idx: int

@app.post("/todos/{username}")
async def add_todo(username: str, todo: Todo):
    if username not in _TODOS:
        _TODOS[username] = []
    _TODOS[username].append(todo.todo)
    return {"response": "OK"}

@app.get("/todos/{username}", response_model=List[str])
async def get_todos(username: str):
    return _TODOS.get(username, [])

@app.delete("/todos/{username}")
async def delete_todo(username: str, todo_idx: TodoIndex):
    # fail silently, it's a simple plugin
    if 0 <= todo_idx.todo_idx < len(_TODOS[username]):
        _TODOS[username].pop(todo_idx.todo_idx)
    return {"response": "OK"}

@app.get("/logo.png")
async def plugin_logo():
    filename = 'logo.png'
    return FileResponse(filename, media_type='image/png')

@app.get("/.well-known/ai-plugin.json")
async def plugin_manifest():
    # file_path = Path(__file__).parent / ".well-known/ai-plugin.json"  # Assuming the file is in the same directory as your app

    # with open(file_path, "r") as f:
    #     text = f.read()
    #     # Modify the content as per the requirements
    #     text = text.replace("PLUGIN_HOSTNAME", f"http://{ML_HOST}:{ML_PORT}/chatgpt")
    
    # # Convert the modified text to a JSON object to ensure correct formatting
    # json_content = json.loads(text)

    # # Return the JSON response with the appropriate media type
    # return Response(content=json.dumps(json_content), media_type="application/json")

    file_path = Path(__file__).parent / ".well-known/ai-plugin.json"  # Assuming the file is in the same directory as your app
    return FileResponse(file_path, media_type="application/json", filename="ai-plugin.json")

    # with open("./.well-known/ai-plugin.json") as f:
    #     text = f.read()
    #     # This is a trick we do to populate the PLUGIN_HOSTNAME constant in the OpenAPI spec
    #     text = text.replace("PLUGIN_HOSTNAME", f"http://{ML_HOST}:{ML_PORT}/chatgpt/")
    #     return json.loads(text)
    
@app.get("/openapi.yaml")
async def openapi_spec():
    # file_path = Path(__file__).parent / "openapi.yaml"  # Assuming the file is in the same directory as your app

    # with open(file_path, "r") as f:
    #     text = f.read()
    #     # This is a trick we do to populate the PLUGIN_HOSTNAME constant in the OpenAPI spec
    #     text = text.replace("PLUGIN_HOSTNAME", f"http://{ML_HOST}:{ML_PORT}/chatgpt")
    
    # return Response(content=text, media_type="application/x-yaml")

    file_path = Path(__file__).parent / "openapi.yaml"  # Assuming the file is in the same directory as your app
    return FileResponse(file_path, media_type="application/x-yaml", filename="openapi.yaml")

    # with open("openapi.yaml") as f:
    #     text = f.read()
    #     # This is a trick we do to populate the PLUGIN_HOSTNAME constant in the OpenAPI spec
    #     text = text.replace("PLUGIN_HOSTNAME", f"http://{ML_HOST}:{ML_PORT}/chatgpt/")
    #     return text

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8450)

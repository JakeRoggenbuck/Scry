from fastapi import FastAPI
from fastapi.responses import JSONResponse
from database import Database


app = FastAPI()
database = Database()


@app.get("/")
def read_root():
    return {"Collections": ["ports", "ssh_logins", "user_connections", "network_traffic"]}


@app.get("/collection/{collection_name}")
def read_item(collection_name: str):
    headers = {'Access-Control-Allow-Origin': '*'}
    documents = database.database[collection_name].find({})
    _all = []
    for doc in documents:
        full = {}
        for key, value in doc.items():
            if key != "_id":
                full[key] = value
        _all.append(full)
    return JSONResponse(content=_all, headers=headers)

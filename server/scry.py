from fastapi import FastAPI
from database import Database


app = FastAPI()
database = Database()


@app.get("/")
def read_root():
    return {"Collections": ["ports", "ssh_logins", "user_connections", "network_traffic"]}


@app.get("/collection/{collection_name}")
def read_item(collection_name: str):
    documents = database.database[collection_name].find({})
    _all = []
    for doc in documents:
        full = {}
        for key, value in doc.items():
            if key != "_id":
                full[key] = value
        _all.append(full)
    return _all

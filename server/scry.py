from fastapi import FastAPI
from fastapi.responses import JSONResponse
from database import Database


app = FastAPI()
database = Database()


@app.get("/")
def read_root():
    return {
        "Collections": ["ports", "ssh_logins", "user_connections", "network_traffic", "storage"]
    }


@app.get("/collection/{collection_name}")
def read_item(collection_name: str):
    headers = {'Access-Control-Allow-Origin': '*'}
    documents = []
    for doc in database.database[collection_name].find({}):
        doc.pop("_id")
        documents.append(doc)
    return JSONResponse(content=documents, headers=headers)

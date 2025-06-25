from fastapi import FastAPI
from pydantic import BaseModel
import chromadb
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer
import requests
import os

print("ChromaDB will persist to:", os.path.abspath("./chroma_db"))

app = FastAPI()
chroma_client = chromadb.Client(Settings(persist_directory="./chroma_db"))
collection = chroma_client.get_or_create_collection("second_brain")
model = SentenceTransformer("all-MiniLM-L6-v2")

class ContentItem(BaseModel):
    id: str
    text: str
    metadata: dict = {}

class QueryRequest(BaseModel):
    query: str
    n_results: int = 5

class LLMRequest(BaseModel):
    context: str
    question: str

@app.post("/add_content")
def add_content(item: ContentItem):
    embedding = model.encode([item.text])[0].tolist()
    print(f"Adding content with id={item.id} to ChromaDB...")
    collection.add(
        ids=[item.id],
        embeddings=[embedding],
        documents=[item.text],
        metadatas=[item.metadata]
    )
    print(f"Added content with id={item.id}.")
    return {"status": "ok"}

@app.get("/list_docs")
def list_docs():
    docs = collection.get()
    return docs

@app.post("/llm")
def llm_endpoint(req: LLMRequest):
    prompt = f"""Context:\n{req.context}\n\nQuestion: {req.question}\n\nAnswer as helpfully as possible:"""
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={"model": "mistral", "prompt": prompt, "stream": False}
    )
    return {"answer": response.json()["response"]}

@app.post("/query")
def query_content(req: QueryRequest):
    embedding = model.encode([req.query])[0].tolist()
    results = collection.query(
        query_embeddings=[embedding],
        n_results=req.n_results
    )
    return results




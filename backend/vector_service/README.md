# Vector Service for Second Brain

This is a Python FastAPI service that provides vector embedding and semantic search for your Second Brain app using ChromaDB and HuggingFace sentence-transformers.

## Setup

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the service:**
   ```bash
   uvicorn app:app --reload --host 127.0.0.1 --port 8001
   ```

## API Endpoints

### Add Content
- **POST** `/add_content`
- **Body:**
  ```json
  {
    "id": "unique_id",
    "text": "The content to embed",
    "metadata": { "userId": "..." }
  }
  ```

### Query Content
- **POST** `/query`
- **Body:**
  ```json
  {
    "query": "What is ...?",
    "n_results": 5
  }
  ```

## Data Persistence
- Embeddings are stored in `./chroma_db` (local folder).

---

You can now connect your Node.js backend to this service for vector search and chat features. 
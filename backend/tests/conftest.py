import pytest
import pytest_asyncio
import os
import sys

# Ensure backend root is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

os.environ["ENVIRONMENT"] = "test"
os.environ["MONGODB_URI"] = "mock://localhost:27017/test_db"
os.environ["MONGODB_DATABASE_NAME"] = "test_study_blueprint"
os.environ["APP_SESSION_SECRET"] = "test-secret-key-study-blueprint-32-chars-long"

from httpx import AsyncClient, ASGITransport
from app.main import app
from app.database.mongodb import connect_to_mongo, close_mongo_connection
from scripts.seed_database import seed_data

@pytest_asyncio.fixture(autouse=True)
async def setup_test_db():
    await connect_to_mongo()
    from app.database.mongodb import get_database
    await seed_data(get_database())
    yield
    await close_mongo_connection()

@pytest_asyncio.fixture
async def async_client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        yield client

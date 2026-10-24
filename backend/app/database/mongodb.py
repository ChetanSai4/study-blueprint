import logging
from typing import Optional, Any, Dict, List
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from bson import ObjectId

from app.core.config import settings

logger = logging.getLogger("study_blueprint.database")

class MongoDBManager:
    client: Optional[AsyncIOMotorClient] = None
    db: Optional[AsyncIOMotorDatabase] = None

db_manager = MongoDBManager()

async def connect_to_mongo():
    logger.info("Connecting to MongoDB Atlas at %s...", settings.MONGODB_URI.split("@")[-1])
    try:
        if settings.ENVIRONMENT == "test" and "mock" in settings.MONGODB_URI:
            from mongomock_motor import AsyncMongoMockClient
            db_manager.client = AsyncMongoMockClient()
            db_manager.db = db_manager.client[settings.MONGODB_DATABASE_NAME]
            logger.info("Connected to MongoMock test database.")
            return

        db_manager.client = AsyncIOMotorClient(
            settings.MONGODB_URI,
            serverSelectionTimeoutMS=5000,
            uuidRepresentation="standard"
        )
        db_manager.db = db_manager.client[settings.MONGODB_DATABASE_NAME]
        # Quick ping to verify connectivity
        await db_manager.client.admin.command('ping')
        logger.info("MongoDB Atlas connection successfully established.")
    except Exception as e:
        logger.warning("MongoDB Atlas connection failed: %s. Using in-memory fallback for offline testability.", str(e))
        try:
            from mongomock_motor import AsyncMongoMockClient
            db_manager.client = AsyncMongoMockClient()
            db_manager.db = db_manager.client[settings.MONGODB_DATABASE_NAME]
            logger.info("Fallback MongoMock in-memory database initialized.")
        except Exception as inner_e:
            logger.error("Could not initialize database driver: %s", inner_e)
            raise e

async def close_mongo_connection():
    if db_manager.client:
        db_manager.client.close()
        logger.info("MongoDB connection closed.")

def get_database() -> AsyncIOMotorDatabase:
    if db_manager.db is None:
        # Lazy fallback initialize if accessed before lifespan in tests
        from mongomock_motor import AsyncMongoMockClient
        db_manager.client = AsyncMongoMockClient()
        db_manager.db = db_manager.client[settings.MONGODB_DATABASE_NAME]
    return db_manager.db

def format_doc(doc: Optional[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
    """Converts MongoDB BSON _id to string 'id' for clean JSON serialization"""
    if doc is None:
        return None
    d = dict(doc)
    if "_id" in d:
        d["id"] = str(d["_id"])
        del d["_id"]
    return d

def format_docs(docs: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    return [format_doc(doc) for doc in docs if doc is not None]

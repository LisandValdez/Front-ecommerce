#database.py

import os
from pymongo import MongoClient

def connect_to_mongodb():
    mongodb_uri = os.getenv('MONGODB_URI', 'mongodb+srv://martinvaldez735:lisandro1@cluster0.ixbjj4o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    print(f"Connecting to MongoDB with URI: {mongodb_uri}")
    client = MongoClient(mongodb_uri)
    db = client['NEXTMONGO_ECOMMERCE']
    products_collection = db['products']
    return products_collection

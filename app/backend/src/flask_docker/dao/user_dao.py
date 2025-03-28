import pymongo


def insert_user(data):
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["Biowallet"]
    collection = db["User"]
    collection.insert_one(data)

def get_user_by_id(id):
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["Biowallet"]
    collection = db["User"]
    result = collection.find_one({"id" : id})
    return result
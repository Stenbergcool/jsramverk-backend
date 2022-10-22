const mongo = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
require("dotenv").config();
const dbName = "artikel";

const database = {
    getDb: async function getDb(collectionName = "artiklar") {

        let dsn = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.c4pzlrh.mongodb.net/?retryWrites=true&w=majority`;

        if(process.env.NODE_ENV === "test") {
            dsn="mongodb://localhost:27017/test";
        }


        const client = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        try {
        const db = await client.db(dbName);
        const collection = await db.collection(collectionName);
        return {
            collection:  collection,
            client: client,
        };
        } catch(e) {
            return {
                errors: {
                    message: "sumting wong",
                }
            };
        }
    },

    insertOne: async function insertOne(object) {
        const client = await this.getDb();
        const result = await client.collection.insertOne(object);
        client.client.close();
        return result;
    },

    findAll: async function findAll(collectionName = "artiklar") {
        const client = await this.getDb(collectionName);
        const result = await client.collection.find().toArray();
        client.client.close();
        return result;
    },

    updateOne: async function updateOne(update) {
        try{
        const client = await this.getDb();
        const result = await client.collection.updateOne( {_id: ObjectID(update._id)}, {$set: {Text: update.Text, Allowed_users: update.Allowed_users}});
        client.client.close();
        return result;
        }
        catch(e){
            return e;
        }
    }
};

module.exports = database;
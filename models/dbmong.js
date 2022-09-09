
const mongo = require("mongodb").MongoClient;
var ObjectID = require('mongodb').ObjectID;
require('dotenv').config()
const collectionName = "artiklar"
const dbName = "artikel"

const database = {
    getDb: async function getDb() {

        let dsn = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.c4pzlrh.mongodb.net/?retryWrites=true&w=majority`;
        const client = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        try {
        const db = await client.db(dbName);
        const collection = await db.collection(collectionName)
        return {
            collection:  collection,
            client: client,
        }
        } catch(e) {
            return {
                errors: {
                    message: error.message,
                }
            };
        }
    },

    insertOne: async function insertOne(object) {
        const client = await this.getDb()
        const result = await client.collection.insertOne(object)
        return result
    },

    findAll: async function findAll() {
        const client = await this.getDb()
        const result = await client.collection.find().toArray();
        return result
    },

    updateOne: async function updateOne(update) {
        console.log(update)
        const client = await this.getDb()
        const result = await client.collection.updateOne( {_id: ObjectID(update[0])}, {$set: {Text: update[1]}})
        console.log(result)
    }
}

module.exports = database;
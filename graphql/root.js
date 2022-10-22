const {
    GraphQLObjectType,
    GraphQLList
} = require("graphql");

const userType = require("./docType.js");

const dbmong = require("../models/dbmong.js");

const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({
        Docs: {
            type: new GraphQLList(userType),
            description: "List of all docs",
            resolve: async function() {
                const allDocs = await dbmong.findAll();

                return allDocs;
            }
        }
    })
});

module.exports = RootQueryType;
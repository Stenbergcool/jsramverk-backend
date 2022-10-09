const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

const docType = new GraphQLObjectType({
    name: 'Documents',
    description: 'This represents a document',
    fields: () => ({
        Heading: { type: new GraphQLNonNull(GraphQLString) },
        Text: { type: new GraphQLNonNull(GraphQLString) },
        Author: { type: new GraphQLNonNull(GraphQLString) },
        Allowed_users: { type: new GraphQLList(GraphQLString) }
    })
})

module.exports = docType;
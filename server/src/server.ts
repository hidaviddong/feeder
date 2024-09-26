
import { startStandaloneServer } from '@apollo/server/standalone'
import { getDatabase } from './db';
import { ApolloServer } from '@apollo/server';

const typeDefs = `#graphql
  type Blog {
    id: ID!
    title: String!
    link: String!
    author: String!
    date: String!
    description: String!
    source: String!
  }

  type BlogsBySource {
    source: String!
    blogs: [Blog!]!
  }

  type Query {
    sources:[String!]!
    blogs(source:String!):[Blog!]!
  }
`;

const resolvers = {
  Query: {
    sources:async ()=>{
      const db = await getDatabase();
      return db.collection('blogs').distinct('source');
    },
    blogs: async (_, { source }) => {
      const db = await getDatabase();
      if (source === 'All Blogs') {
        return db.collection('blogs').find().toArray();
      }
      return db.collection('blogs').find({ source }).toArray();
    },
  },
  Blog: {
    id: (parent) => parent._id.toString(),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export async function main() {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
}

main();
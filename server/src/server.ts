
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
    blogs: [Blog!]!
    blogsBySource: [BlogsBySource!]!
  }
`;

const resolvers = {
  Query: {
    blogs: async () => {
      const db = await getDatabase();
      return db.collection('blogs').find().toArray();
    },
    blogsBySource: async () => {
      const db = await getDatabase();
      const sources = await db.collection('blogs').distinct('source');
      const result = await Promise.all(sources.map(async (source: string) => {
          const blogs = await db.collection('blogs').find({ source }).toArray();
          return { source, blogs };
      }));
      return result;
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
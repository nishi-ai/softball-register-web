import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

const getDBClient = async (): Promise<MongoClient> => {
  const client = new MongoClient(uri, options);
  client.connect();
  return client;
};

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default getDBClient;

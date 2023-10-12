import { MongoClient } from "mongodb";
import 'dotenv/config';

// Add your MongoDb connection string below
const connectionString = process.env.connectionString;

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  console.log("connected");
} catch(e) {
  console.error(e);
}

let db = conn.db("Marketplace");

export default db;
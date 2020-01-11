import { init } from "@lib/mongo";

export async function get(req, res) {
  const { db } = await init();
  const posts = await db.collection("posts").find({}).toArray();
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  res.end(JSON.stringify(posts));
}
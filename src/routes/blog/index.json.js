import { init } from "@lib/mongo";

export async function get(req, res) {
  const { db } = await init();
  const posts = await db.collection("posts").find({}).toArray();
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  res.end(JSON.stringify(posts));
}

export async function post(req, res) {
  const { db } = await init();
  const post = req.body;
  const result = await db.collection("posts").insertOne(post);
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  post._id = result.insertedId;
  res.end(JSON.stringify(post));
}
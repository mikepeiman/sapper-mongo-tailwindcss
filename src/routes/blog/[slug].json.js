import { init } from "@lib/mongo";
const { ObjectID } = require('mongodb');

export async function get(req, res, next) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { slug } = req.params;

  const { db } = await init();
  const post = await db.collection("posts").findOne({ slug });

  if (post) {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify(post));
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({
      message: `Not found`
    }));
  }
}

export async function del(req, res, next) {
  const { slug } = req.params;

  const { db } = await init();
  const result = await db.collection("posts").removeOne({ slug });
  res.end(JSON.stringify(result));
}

export async function patch(req, res, next) {
  const { slug } = req.params;
  const { db } = await init();
  delete req.body._id
  const result = await db.collection("posts").updateOne(
    { '_id': ObjectID(slug) }, // this is not really slug, it's id
    { '$set': req.body });
  res.end(JSON.stringify(result));
}
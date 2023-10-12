import express from "express";
import db from "../database/connection.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get product by ID
router.get("/products/:id", async (req, res) => {
  let collection =  db.collection("products");
  
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.find(query).toArray();

  if (!result.length) {
    res.send("Not found").status(404);
  } else { 
    res.send(result).status(200);
  }
});

// Get all product or get product by contain name
router.get("/products", async (req, res) => {
  let collection =  db.collection("products");

  let query = {};

  if(Object.keys(req.query).length !== 0) {
    query = {"name" : {$regex : req.query.name, '$options' : 'i'}};
  }

  let results = await collection.find(query).toArray();
  
  res.send(results).status(200);
});

// Add Products
router.post("/products", async (req, res) => {
  let collection = db.collection("products");

  let result = await collection.insertOne(req.body);

  res.send(result).status(204);
});

// Update products
router.put("/products/:id", async (req, res) => {
  let collection =  db.collection("products");;
  const query = { _id: new ObjectId(req.params.id) };
  const updates = {
    $set: req.body
  };

  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

// Delete single product by ID
router.delete("/products/:id", async (req, res) => {
  let collection =  db.collection("products");;
  const query = { _id: new ObjectId(req.params.id) };
  
  let result = await collection.deleteOne(query);
  res.send(result).status(200);
});

// Delete all products
router.delete("/products", async (req, res) => {
  let collection =  db.collection("products");;
  
  let result = await collection.deleteMany({});
  res.send(result).status(200);
});


export default router;
import express from 'express';
import db from '../db/user.model.js';
// import { ObjectId } from 'mongodb';

const router = express.Router();

router.get('/search-products', async (req, res) => {
  let collection = await db.collection('testingMainData');
  let queryParam = await req.query.search;
  
// Actual code that works
  const pipelineStages = [
    {
      $match: {
        "products.title": queryParam
      }
    },
    {
      $project: {
        _id: 0,
        product: {
          $filter: {
            input: "$products",
            as: "product",
            cond: { $eq: [ "$$product.title", queryParam ] }
          }
        }
      }
    }
  ];

  let results = await collection.aggregate(pipelineStages).toArray()
//   let results = await collection.aggregate([
//     {
//       $match: 
//       // {
//         // $or:[
//           // {"products.id": test},
//           {"products.title": 'Medium Stuff Satche'}
        
//       // }
//     },
//     {
//       $project: {
//         product: {
//           $filter: {
//             input: "$products",
//             as: "product",
//             cond:
//             //  { $or: [
//               // {$eq: [ "$$product.id", "1" ]},
//               {$eq: [ "$$product.title", 'Medium Stuff Satche' ]}
//             // ] }
//           }
//         }
//       }
//     }
//   ]
// )
  res.send(results).status(200);
});

router.get('/all-products', async (req, res) => {
    let collection = await db.collection('testingMainData');
  let results = await collection.find({}).toArray()
    res.send(results).status(200);
});

// Add a new document to the collection
router.post("/", async (req, res) => {
  let collection = await db.collection("posts");
  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});


export default router;
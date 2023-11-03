const express= require('express');
const app = express();
const port= process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
// middleware
app.use(cors());
app.use(express.json());
// checking if env variables are working or not
console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);

// database connection


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.231nuf3.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // deploy korar time nicher line o comment kore dibo
    await client.connect();

    const serviceCollection=client.db("carDoctor").collection("services");
    const orderCollection=client.db("carDoctor").collection("orders");

    // finding all services
    app.get('/services',async(req,res)=>{
        const cursor=serviceCollection.find();
        const services=await cursor.toArray();
        res.send(services);


    })
  
   app.get('/services/:id',async(req,res)=>{
    const id=req.params.id;
    console.log('getting specific service',id);
    const query={_id:new ObjectId(id)};
    const options = {
      
      // Include only the `title` and `price` fields in the returned document
      projection: { title: 1, price: 1,service_id:1,
      img :1 },
    };
    const result= await serviceCollection.findOne(query,options);
    res.send(result);
  })
  // find one with query
  app.get('/orders',async(req,res)=>{
    console.log(req.query.email);
    let query={};
    if(req.query?.email){
      query={email:req.query.email}
    }
    const cursor=orderCollection.find(query);
    const orders=await cursor.toArray();
    res.send(orders);

  })

  // insert a document in the database
  app.post('/orders',async(req,res)=>{
    const data=req.body;
    console.log('inserting new order',data);
  
    const result=await orderCollection.insertOne(data);
    res.send(result);
  })
  // delete api
  
  app.delete('/orders/:id',async(req,res)=>{
    const id=req.params.id;
    console.log('deleting specific order',id);
    const query={_id:new ObjectId(id)};
    const result=await orderCollection.deleteOne(query);
    res.send(result);
  })

  // update
  app.patch('/orders/:id',async(req,res)=>{

    const id=req.params.id;
    const updatedOrder=req.body;
    console.log('updating order',id,updatedOrder);
    const filter={_id:new ObjectId(id)};
    
    const updatedDoc={
      $set:{

        status:updatedOrder.status
      },
    }
    const result=await orderCollection.updateOne(filter,updatedDoc);
    res.send(result);
  })




  // orders

  // app.get('/orders',async(req,res)=>{
  //   const result=orderCollection.find().toArray();
  //   res.send(result);

  // })








    // Send a ping to confirm a successful connection

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

















// routes
app.get('/',(req,res)=>{
    res.send('doctor server is running');
})



// listen
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
























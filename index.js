const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// collegeData
// gZRHAAysV62c0Ao0



// const uri = "mongodb+srv://collegeData:gZRHAAysV62c0Ao0@cluster0.lgdhrpf.mongodb.net/?retryWrites=true&w=majority";


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lgdhrpf.mongodb.net/?retryWrites=true&w=majority`;

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
    const collegeCollection = client.db('collegeDB').collection('colleges')



    //college data post
    app.post('/colleges', async(req, res)=>{
      const collegeData = req.body
      console.log(collegeData);
      const result = await collegeCollection.insertOne(collegeData)
      res.send(result)
    })

    //get all colleges
    app.get('/colleges', async(req, res)=>{
    const result = await collegeCollection.find().toArray()
      res.send(result)
    })

    // get a gingle data of college
    app.get('/colleges/:id', async(req, res)=>{
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await collegeCollection.findOne(query)
      res.send(result)
    })



    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res)=>{
    res.send('Collge start')
})

app.listen(port, ()=>{
    console.log(`College is running on port ${port}`)
})
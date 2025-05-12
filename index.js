const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6plf0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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


        const allmyworksCollention = client.db('KajTrackr').collection('allmyworks')
        const historyCollention = client.db('KajTrackr').collection('history')
        const announsmentCollention = client.db('KajTrackr').collection('announsment')
        const usersCollention = client.db('KajTrackr').collection('users')

        // read data from allmyworksCollention

        app.get('/myworks/:email', async (req, res) => {
            const userEmail = req.params.email
            // console.log(userEmail)
            const filter = { userEmaol: userEmail }
            const result = await allmyworksCollention.find(filter).toArray()
            res.send(result)
        })

        // add  data into  allmyworksCollention

        app.post('/addworks', async (req, res) => {
            const addWork = req.body
            // console.log(addWork)
            const result = await allmyworksCollention.insertOne(addWork)
            res.send(result)
        })


        // History red from historyCollention
        app.get('/myworkshistory/:email', async (req, res) => {
            const userEmail = req.params.email
            // console.log(userEmail)
            const filter = { userEmaol: userEmail }

            const result = await historyCollention.find(filter).toArray()
            res.send(result)
        })


        // History  post historyCollention
        app.post('/myworkshistory', async (req, res) => {
            const addWork = req.body
            // console.log(addWork)
            const result = await historyCollention.insertOne(addWork)

            res.send(result)
        })

        // delete data from allmyworksCollention
        app.delete('/deletework/:id', async (req, res) => {
            const deleteId = req.params.id;
            // console.log(deleteId)
            const quary = { _id: new ObjectId(deleteId) }
            const result = await allmyworksCollention.deleteOne(quary)
            res.send(result)
        })

        // delete data from historyCollention
        // app.delete('/myworkshistory', async (req, res) => {
        // //     const sevenDaysAgo = new Date();
        // //     console.log(sevenDaysAgo)
        // //  const data=   sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        // //  console.log(data)
        // //     const result =   await historyCollention.deleteMany({ date: { $lt: sevenDaysAgo } });
        // //     console.log(result)
        // const delere = req.body
        // // console.log(delere)
        //     const result = await historyCollention.deleteMany(delere)
        //     res.send(result)
        // })

        app.delete("/myworkshistory", async (req, res) => {
            const allData = await historyCollention.find().sort({ date: 1 }).toArray(); // সব ডাটা তারিখ অনুযায়ী পুরাতন থেকে সাজানো

            const total = allData.length;
            // console.log(total)
            if (total > 5) {
                const dataDelete = allData.slice(0, total - 3); // শেষ ৩টা বাদ দিয়ে বাকি গুলো রাখা
                const idsToDelete = dataDelete.map((item) => item._id); // ডিলিট করার জন্য আইডিগুলো বের করা
                // console.log(idsToDelete)
                const result = await historyCollention.deleteMany({ _id: { $in: idsToDelete } }); // ডাটাবেজ থেকে পুরাতন গুলো ডিলিট করা
                res.status(201).send(result)
                //   res.json({
                //     message: `✅ Deleted ${idsToDelete.length} old data, kept last 3.`,
                //   });
                //   
            } else {
                res.json({
                    message: `ℹ️ Not enough data to delete. Total: ${total}. Kept all.`,
                });
            }
        });







        // announsmentCollention
        app.post('/announsment', async (req, res) => {
            const AddAnounse = req.body
            console.log(AddAnounse)
            const result = await announsmentCollention.insertOne(AddAnounse)
            res.send(result)
        })

        app.get('/announsment', async (req, res) => {
            const result = await announsmentCollention.find().toArray()
            res.send(result)
        })



        app.delete('/announsment/:id', async (req, res) => {
            const deleteId = req.params.id;
            // console.log(deleteId)
            const quary = { _id: new ObjectId(deleteId) }
            const result = await announsmentCollention.deleteOne(quary)
            res.send(result)
        })

        // All youiser
        // app.post('/users', async (req, res) => {
        //     const Addusers = req.body
        //     console.log(Addusers)
        //     const result = await usersCollention.insertOne(Addusers)
        //     res.send(result)
        // })




        app.get('/users', async (req, res) => {
            const result = await usersCollention.find().toArray()
            res.send(result)
        })



// Post single users
app.post('/users', async (req, res) => {
    const user = req.body;
    const query = { email: user.email };
  
    const existingUser = await usersCollention.findOne(query);
    if (existingUser) {
      return res.send({ message: "User already exists" });
    }
  
    const result = await usersCollention.insertOne(user);
    res.send(result);
  });
  

  app.get('/useronly/:email', async (req, res) => {
    const email = req.params.email;
    const user = await usersCollention.findOne({ email });
    res.send(user);
  });


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




app.get('/', (req, res) => {
    res.send('KajTRaker is working!');
});

app.listen(port, () => {
    console.log(`KajTRaker running on port ${port}`);
});

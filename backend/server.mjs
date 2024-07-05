import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';

const app = express();
const port = 5001;

const uri =
  'mongodb+srv://mmdj2:MwZw8uwc6ef4HR8@cluster0.zbvy7xs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
let client;
let db;
let trackingsCollection;

app.use(cors());
app.use(express.json());

async function connectDB() {
  if (client) return;

  client = new MongoClient(uri);
  await client.connect();
  db = client.db('trackingsDB');
  trackingsCollection = db.collection('trackings');
}

app.get('/api/trackings', async (req, res) => {
  try {
    await connectDB();
    const allTrackings = await trackingsCollection.find().toArray();
    res.status(200).send(allTrackings);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve trackings' });
  }
});

app.post('/api/trackings', async (req, res) => {
  try {
    await connectDB();
    const tracking = req.body;
    await trackingsCollection.insertOne(tracking);
    res.status(201).send(tracking);
  } catch (error) {
    res.status(500).send({ error: 'Failed to save tracking' });
  }
});

app.delete('/api/trackings/:id', async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    await trackingsCollection.deleteOne({ id });
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete tracking' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

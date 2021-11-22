// domain.com/api/new-meetup

import { MongoClient } from "mongodb";

async function handler(req, res) {
  // In the api recives req, res

  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://quocbao19982009:Qscesz123@cluster0.g9eyr.mongodb.net/meetup?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);
    console.log(result);

    client.close();

    res.status(201).json({ messages: "Meetup Inserted!" });
  }
}
export default handler;

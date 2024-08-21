import * as functions from "firebase-functions";
import * as express from "express";
import * as admin from "firebase-admin";

admin.initializeApp();

const app = express();
app.use(express.json());

// Define a POST
app.post("/create", async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).send("No data provided");
  }

  try {
    const docRef = admin.firestore().collection("yourCollection").doc();
    await docRef.set(data);

    return res.status(200).send("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
    return res.status(500).send("Error writing document");
  }
});

// Update an existing document
app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  if (!data) {
    return res.status(400).send("No data provided");
  }

  try {
    const docRef = admin.firestore().collection("yourCollection").doc(id);
    await docRef.update(data);

    return res.status(200).send(`Document with ID ${id} successfully updated!`);
  } catch (error) {
    console.error("Error updating document: ", error);
    return res.status(500).send("Error updating document");
  }
});

// Delete a document
app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const docRef = admin.firestore().collection("yourCollection").doc(id);
    await docRef.delete();

    res.status(200).send(`Document with ID ${id} successfully deleted!`);
  } catch (error) {
    console.error("Error deleting document: ", error);
    res.status(500).send("Error deleting document");
  }
});

exports.api = functions.region("us-central1").https.onRequest(app);

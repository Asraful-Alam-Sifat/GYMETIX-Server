const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Gymetix API Server</title>

<script src="https://cdn.tailwindcss.com"></script>

<style>
body{
    background:
    radial-gradient(circle at top,#111827 0%,#030712 50%);
}
</style>

</head>

<body class="min-h-screen flex items-center justify-center text-white px-4">

<div class="w-full max-w-4xl">

    <div class="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-10 shadow-2xl">

        <div class="flex items-start justify-between mb-8">

            <div>
                <h1 class="text-5xl font-bold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                    Gymetix API Server
                </h1>

                <p class="mt-4 text-gray-400 max-w-2xl leading-relaxed">
                    Welcome to the official backend service for the Gymetix
                    Fitness & Gym Management Platform. This server handles
                    users, trainers, classes, bookings, community posts,
                    authentication and payment processing.
                </p>
            </div>

            <span class="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
                ● Active
            </span>

        </div>

        <div class="border-t border-gray-800 my-8"></div>

        <div class="grid md:grid-cols-4 gap-4 mb-8">

            <div class="bg-gray-800/50 rounded-xl p-4">
                <p class="text-gray-500 text-xs uppercase">
                    Status
                </p>

                <h3 class="text-green-400 font-bold mt-2">
                    Online
                </h3>
            </div>

            <div class="bg-gray-800/50 rounded-xl p-4">
                <p class="text-gray-500 text-xs uppercase">
                    Database
                </p>

                <h3 class="font-bold mt-2">
                    MongoDB Atlas
                </h3>
            </div>

            <div class="bg-gray-800/50 rounded-xl p-4">
                <p class="text-gray-500 text-xs uppercase">
                    Runtime
                </p>

                <h3 class="font-bold mt-2">
                    Node.js
                </h3>
            </div>

            <div class="bg-gray-800/50 rounded-xl p-4">
                <p class="text-gray-500 text-xs uppercase">
                    Version
                </p>

                <h3 class="font-bold mt-2">
                    v1.0.0
                </h3>
            </div>

        </div>

        <h2 class="text-2xl font-bold mb-5">
            Available Endpoints
        </h2>

        <div class="space-y-3">

            <div class="bg-gray-800/40 hover:bg-gray-800 transition rounded-xl p-4 flex justify-between items-center">
                <div>
                    <h3 class="font-mono text-red-400">
                        /users
                    </h3>
                    <p class="text-sm text-gray-400">
                        Retrieve all registered users
                    </p>
                </div>

                <span class="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">
                    GET
                </span>
            </div>

            <div class="bg-gray-800/40 hover:bg-gray-800 transition rounded-xl p-4 flex justify-between items-center">
                <div>
                    <h3 class="font-mono text-red-400">
                        /trainers
                    </h3>
                    <p class="text-sm text-gray-400">
                        Retrieve all approved trainers
                    </p>
                </div>

                <span class="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">
                    GET
                </span>
            </div>

            <div class="bg-gray-800/40 hover:bg-gray-800 transition rounded-xl p-4 flex justify-between items-center">
                <div>
                    <h3 class="font-mono text-red-400">
                        /forums
                    </h3>
                    <p class="text-sm text-gray-400">
                        Retrieve community posts
                    </p>
                </div>

                <span class="bg-gradient-to-r from-red-500 to-orange-400 text-black text-semibold px-3 py-1 rounded-lg text-sm">
                    POST
                </span>
            </div>

            <div class="bg-gray-800/40 hover:bg-gray-800 transition rounded-xl p-4 flex justify-between items-center">
                <div>
                    <h3 class="font-mono text-red-400">
                        <a href="/classes" target="_blank" class="url">/classes</a>
                    </h3>
                    <p class="text-sm text-gray-400">
                        Retrieve all gym classes
                    </p>
                </div>

                <span class="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">
                    GET
                </span>
            </div>

            <div class="bg-gray-800/40 hover:bg-gray-800 transition rounded-xl p-4 flex justify-between items-center">
                <div>
                    <h3 class="font-mono text-red-400">
                        <a href="/featured-classes" target="_blank" class="url">/featured-classes</a>
                    </h3>
                    <p class="text-sm text-gray-400">
                        Retrieve all featured gym classes
                    </p>
                </div>

                <span class="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">
                    GET
                </span>
            </div>

        </div>

        <div class="mt-8 pt-6 border-t border-gray-800 flex justify-between text-sm text-gray-500">

            <span>
                Gymetix Backend Infrastructure
            </span>

            <span>
                Express • MongoDB • JWT
            </span>

        </div>

    </div>

</div>

</body>
</html>`);
});

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const db = client.db("gymetix"); 
    const usersCollection = db.collection("users");
    const classesCollection = db.collection("classes");

    // ── User Routes ─────
    app.post("/user", async (req, res) => {
      try {
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to create user" });
      }
    });

    app.get("/user", async (req, res) => {
      try {
        const users = await usersCollection.find().toArray();
        res.send(users);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to fetch users" });
      }
    });

    // ── All Classes Route ─────
    app.get("/classes", async (req, res) => {
      try {
        const classes = await classesCollection.find().toArray();
        res.send(classes);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to fetch classes" });
      }
    });

    // ── Featured Classes Route (Using optimized find logic) ──
    app.get("/featured-classes", async (req, res) => {
      try {
        const featured = await classesCollection
          .find()
          .sort({ rating: -1, booked: -1 })
          .limit(6)
          .toArray();

        res.send(featured);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to fetch featured classes" });
      }
    });

    await client.db("admin").command({ ping: 1 });

  } catch (error) {
    console.error(error);
  }
}

run().catch(console.dir);

// Only listen if we are NOT in the Vercel environment
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

// Always export for Vercel
module.exports = app;
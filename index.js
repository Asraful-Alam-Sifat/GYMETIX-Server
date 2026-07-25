const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

dotenv.config();
app.use(cors());

app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});
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
body{ background: radial-gradient(circle at top,#111827 0%,#030712 50%); }
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
                    Fitness & Gym Management Platform.
                </p>
            </div>
            <span class="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
                ● Active
            </span>
        </div>
        <div class="border-t border-gray-800 my-8"></div>
        <div class="grid md:grid-cols-4 gap-4 mb-8">
            <div class="bg-gray-800/50 rounded-xl p-4">
                <p class="text-gray-500 text-xs uppercase">Status</p>
                <h3 class="text-green-400 font-bold mt-2">Online</h3>
            </div>
            <div class="bg-gray-800/50 rounded-xl p-4">
                <p class="text-gray-500 text-xs uppercase">Database</p>
                <h3 class="font-bold mt-2">MongoDB Atlas</h3>
            </div>
            <div class="bg-gray-800/50 rounded-xl p-4">
                <p class="text-gray-500 text-xs uppercase">Runtime</p>
                <h3 class="font-bold mt-2">Node.js</h3>
            </div>
            <div class="bg-gray-800/50 rounded-xl p-4">
                <p class="text-gray-500 text-xs uppercase">Version</p>
                <h3 class="font-bold mt-2">v1.0.0</h3>
            </div>
        </div>
        <h2 class="text-2xl font-bold mb-5">Available Endpoints</h2>
        <div class="space-y-3">
            <div class="bg-gray-800/40 hover:bg-gray-800 transition rounded-xl p-4 flex justify-between items-center">
                <div>
                    <h3 class="font-mono text-red-400"><a href="/user" target="_blank">/users</a></h3>
                    <p class="text-sm text-gray-400">Retrieve all registered users</p>
                </div>
                <span class="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">GET</span>
            </div>
            <div class="bg-gray-800/40 hover:bg-gray-800 transition rounded-xl p-4 flex justify-between items-center">
                <div>
                    <h3 class="font-mono text-red-400"><a href="/classes" target="_blank">/classes</a></h3>
                    <p class="text-sm text-gray-400">Retrieve all gym classes</p>
                </div>
                <span class="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">GET</span>
            </div>
            <div class="bg-gray-800/40 hover:bg-gray-800 transition rounded-xl p-4 flex justify-between items-center">
                <div>
                    <h3 class="font-mono text-red-400"><a href="/bookings" target="_blank">/bookings</a></h3>
                    <p class="text-sm text-gray-400">Check or retrieve bookings</p>
                </div>
                <span class="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">GET</span>
            </div>
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
  },
});

let db;

// Connect MongoDB only once
async function connectDB() {
  if (!db) {
    await client.connect();
    console.log("✅ MongoDB Connected");
    db = client.db("gymetix");
  }
  return db;
}

// User Routes
app.post("/user", async (req, res) => {
  try {
    const db = await connectDB();
    const usersCollection = db.collection("user");
    const result = await usersCollection.insertOne(req.body);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/user", async (req, res) => {
  try {
    const db = await connectDB();
    const usersCollection = db.collection("user");
    const users = await usersCollection.find().toArray();
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Classes Routes
app.get("/classes", async (req, res) => {
  try {
    const db = await connectDB();
    const classesCollection = db.collection("classes");

    const { search, category, status } = req.query;
    let query = {};

    if (status) query.status = status;
    if (search) query.title = { $regex: search, $options: "i" };
    if (category && category !== "all") {
      const categoriesArray = Array.isArray(category) ? category : [category];
      query.category = { $in: categoriesArray };
    }

    const classes = await classesCollection.find(query).toArray();
    res.send(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/classes/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const classesCollection = db.collection("classes");

    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid class ID format" });
    }

    const query = { _id: new ObjectId(id) };
    const classItem = await classesCollection.findOne(query);

    if (!classItem) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.send(classItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/featured-classes", async (req, res) => {
  try {
    const db = await connectDB();
    const classesCollection = db.collection("classes");

    const featured = await classesCollection
      .find()
      .sort({ rating: -1, booked: -1 })
      .limit(6)
      .toArray();

    res.send(featured);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/trainers", async (req, res) => {
  try {
    const db = await connectDB();
    const usersCollection = db.collection("user");
    const trainers = await usersCollection.find({ role: "trainer" }).toArray();
    res.send(trainers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// BOOKINGS ROUTES
app.get("/bookings", async (req, res) => {
  try {
    const db = await connectDB();
    const bookingsCollection = db.collection("bookings");

    const { userId, classId, status } = req.query;

    // If userId and classId are provided, check if a paid/valid booking exists
    if (userId && classId) {
      const existingBooking = await bookingsCollection.findOne({
        userId: userId,
        classId: classId,
        status: "paid" 
      });

      return res.send({ hasBooked: !!existingBooking });
    }

    
    let query = {};
    if (userId) query.userId = userId;
    if (status) query.status = status;

    const bookings = await bookingsCollection.find(query).toArray();
    res.send(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: error.message });
  }
});

// POST /bookings - Validation check only (Does NOT create premature DB entry)
app.post("/bookings", async (req, res) => {
  try {
    const db = await connectDB();
    const bookingsCollection = db.collection("bookings");

    const { userId, classId } = req.body;

    if (!userId || !classId) {
      return res.status(400).json({ 
        message: "Missing required booking details (userId or classId)." 
      });
    }

   
    const existingBooking = await bookingsCollection.findOne({
      userId: userId,
      classId: classId,
      status: "paid"
    });

    if (existingBooking) {
      return res.status(400).json({ 
        message: "You have already booked this class." 
      });
    }

    res.status(200).json({
      success: true,
      message: "Validation passed. Proceed to payment."
    });

  } catch (error) {
    console.error("Error validating booking:", error);
    res.status(500).json({ message: error.message });
  }
});

// Stripe checkout ------
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// POST /create-checkout-session
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { classId, bookingId, userId: bodyUserId, userEmail: bodyUserEmail, className, price, trainerName, image, category, schedule, time } = req.body;

    const db = await connectDB();
    
 let userId = bodyUserId || "";
    let userEmail = bodyUserEmail || ""; 
    
    if (bookingId && ObjectId.isValid(bookingId)) {
      const existingBooking = await db.collection("bookings").findOne({ _id: new ObjectId(bookingId) });
      if (existingBooking) {
        userId = existingBooking.userId || userId;
        userEmail = existingBooking.userEmail || userEmail;
      }
    }

    const classItem = await db.collection("classes").findOne({ _id: new ObjectId(classId) });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: className || classItem?.title || "Gym Class Booking",
            },
            unit_amount: Math.round((price || classItem?.price || 20) * 100), 
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: userEmail || undefined,
      success_url: `${process.env.CLIENT_URL || "http://localhost:3000"}/dashboard/user/booked-classes?success=true`,
      cancel_url: `${process.env.CLIENT_URL || "http://localhost:3000"}/classes/${classId}?canceled=true`,
      metadata: {
        userId: userId || "",
        classId,
        bookingId: bookingId || "",
        userEmail: userEmail || "",
        className: className || classItem?.title || "",
        price: String(price || classItem?.price || 20),
        trainerName: trainerName || classItem?.trainer?.name || "",
        image: image || classItem?.image || "",
        category: category || classItem?.category || "",
        schedule: typeof schedule === 'string' ? schedule : JSON.stringify(schedule || classItem?.schedule || []),
        time: time || classItem?.time || ""
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ message: error.message });
  }
});


// STRIPE WEBHOOK ROUTE 

app.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { userId, classId, userEmail, className, price, trainerName, image, category, schedule, time } = session.metadata;

    try {
      const db = await connectDB();
      
      let parsedSchedule = schedule;
      try {
        parsedSchedule = JSON.parse(schedule);
      } catch (e) {
   
      }

     
      const newBooking = {
        userId,
        classId,
        userEmail,
        className,
        price: Number(price),
        trainerName,
        image,
        category,
        schedule: parsedSchedule,
        time,
        status: "paid",
        paymentIntentId: session.payment_intent,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await db.collection("bookings").insertOne(newBooking);
      
     
      await db.collection("classes").updateOne(
        { _id: new ObjectId(classId) },
        { $inc: { booked: 1 } }
      );

      console.log(`✅ Payment confirmed via Webhook. Booking successfully created for class ${classId}.`);
    } catch (dbError) {
      console.error("Database insert error via webhook:", dbError);
    }
  }

  res.json({ received: true });
});


// DELETE BOOKING ROUTE 

app.delete("/bookings/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const bookingsCollection = db.collection("bookings");
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid booking ID format" });
    }

    const result = await bookingsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: error.message });
  }
});

// Only listen locally
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

dotenv.config();
app.use(cors());

app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
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
<title>Gymetix API Server & Route Explorer</title>
<script src="https://cdn.tailwindcss.com"></script>
<style>
body { background: radial-gradient(circle at top, #111827 0%, #030712 60%); }
</style>
</head>
<body class="min-h-screen text-gray-100 px-4 py-12">
<div class="w-full max-w-6xl mx-auto space-y-8">

    <!-- Header Section -->
    <div class="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
                <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-red-500 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                    Gymetix API Server
                </h1>
                <p class="mt-3 text-gray-400 max-w-2xl text-sm md:text-base leading-relaxed">
                    Official backend ecosystem for Gymetix. Dynamic route navigation with built-in access for public, secure, and admin endpoints.
                </p>
            </div>
            <div class="flex items-center gap-3 bg-gray-800/80 px-4 py-2 rounded-full border border-gray-700/50">
                <span class="relative flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span class="text-green-400 text-sm font-semibold tracking-wide">API Active</span>
            </div>
        </div>

        <div class="border-t border-gray-800/80 my-6"></div>

        <!-- System Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-800/40 border border-gray-800 rounded-2xl p-4">
                <p class="text-gray-500 text-xs font-semibold uppercase tracking-wider">Status</p>
                <h3 class="text-green-400 font-bold text-lg mt-1">Online</h3>
            </div>
            <div class="bg-gray-800/40 border border-gray-800 rounded-2xl p-4">
                <p class="text-gray-500 text-xs font-semibold uppercase tracking-wider">Database</p>
                <h3 class="text-gray-200 font-bold text-lg mt-1">MongoDB Atlas</h3>
            </div>
            <div class="bg-gray-800/40 border border-gray-800 rounded-2xl p-4">
                <p class="text-gray-500 text-xs font-semibold uppercase tracking-wider">Authentication</p>
                <h3 class="text-amber-400 font-bold text-lg mt-1">JWT / Bearer Token</h3>
            </div>
            <div class="bg-gray-800/40 border border-gray-800 rounded-2xl p-4">
                <p class="text-gray-500 text-xs font-semibold uppercase tracking-wider">Version</p>
                <h3 class="text-gray-200 font-bold text-lg mt-1">v1.0.0</h3>
            </div>
        </div>
    </div>

    <!-- Routes Grid -->
    <div class="grid lg:grid-cols-2 gap-8">

        <!-- Public Routes -->
        <div class="bg-gray-900/60 backdrop-blur-lg border border-gray-800/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
            <div>
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-bold text-gray-100 flex items-center gap-2">
                        <span class="p-1.5 bg-green-500/10 text-green-400 rounded-lg text-sm">🔓</span> Public Endpoints
                    </h2>
                    <span class="text-xs text-gray-400 bg-gray-800 px-2.5 py-1 rounded-md">Open Access</span>
                </div>
                <p class="text-xs text-gray-400 mb-6">Standard read endpoints accessible directly in browser or client UI.</p>

                <div class="space-y-3">
                    <div class="bg-gray-800/30 hover:bg-gray-800/60 transition border border-gray-800 rounded-xl p-3.5 flex items-center justify-between">
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded">GET</span>
                                <a href="/classes" target="_blank" class="font-mono text-sm text-gray-200 hover:text-orange-400 transition">/classes</a>
                            </div>
                            <p class="text-xs text-gray-400 mt-1">Fetch active gym classes (supports filters)</p>
                        </div>
                        <a href="/classes" target="_blank" class="text-xs text-orange-400 hover:underline">View JSON ↗</a>
                    </div>

                    <div class="bg-gray-800/30 hover:bg-gray-800/60 transition border border-gray-800 rounded-xl p-3.5 flex items-center justify-between">
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded">GET</span>
                                <a href="/featured-classes" target="_blank" class="font-mono text-sm text-gray-200 hover:text-orange-400 transition">/featured-classes</a>
                            </div>
                            <p class="text-xs text-gray-400 mt-1">Top-rated and most booked classes</p>
                        </div>
                        <a href="/featured-classes" target="_blank" class="text-xs text-orange-400 hover:underline">View JSON ↗</a>
                    </div>

                    <div class="bg-gray-800/30 hover:bg-gray-800/60 transition border border-gray-800 rounded-xl p-3.5 flex items-center justify-between">
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded">GET</span>
                                <a href="/trainers" target="_blank" class="font-mono text-sm text-gray-200 hover:text-orange-400 transition">/trainers</a>
                            </div>
                            <p class="text-xs text-gray-400 mt-1">List all registered fitness trainers</p>
                        </div>
                        <a href="/trainers" target="_blank" class="text-xs text-orange-400 hover:underline">View JSON ↗</a>
                    </div>

                    <div class="bg-gray-800/30 hover:bg-gray-800/60 transition border border-gray-800 rounded-xl p-3.5 flex items-center justify-between">
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded">GET</span>
                                <a href="/community-posts" target="_blank" class="font-mono text-sm text-gray-200 hover:text-orange-400 transition">/community-posts</a>
                            </div>
                            <p class="text-xs text-gray-400 mt-1">Get public forum posts and comments</p>
                        </div>
                        <a href="/community-posts" target="_blank" class="text-xs text-orange-400 hover:underline">View JSON ↗</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Protected / Secure Routes -->
        <div class="bg-gray-900/60 backdrop-blur-lg border border-gray-800/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
            <div>
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-bold text-gray-100 flex items-center gap-2">
                        <span class="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg text-sm">🔒</span> Secured Endpoints
                    </h2>
                    <span class="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">Auth / JWT Required</span>
                </div>
                <p class="text-xs text-gray-400 mb-6">User/Trainer/Admin routes that require headers or parameters.</p>

                <div class="space-y-3">
                    <div class="bg-gray-800/30 hover:bg-gray-800/60 transition border border-gray-800 rounded-xl p-3.5 flex items-center justify-between">
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">GET / POST</span>
                                <span class="font-mono text-sm text-gray-200">/bookings</span>
                            </div>
                            <p class="text-xs text-gray-400 mt-1">User class bookings and checkout access</p>
                        </div>
                        <button onclick="openTester('GET', '/bookings?userId=EXAMPLE_ID')" class="text-xs bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3 py-1 rounded-lg hover:bg-amber-500/20 transition">
                            Test Route
                        </button>
                    </div>

                    <div class="bg-gray-800/30 hover:bg-gray-800/60 transition border border-gray-800 rounded-xl p-3.5 flex items-center justify-between">
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">POST / DELETE</span>
                                <span class="font-mono text-sm text-gray-200">/favorites</span>
                            </div>
                            <p class="text-xs text-gray-400 mt-1">Manage user bookmarked classes</p>
                        </div>
                        <button onclick="openTester('GET', '/favorites?userId=EXAMPLE_ID')" class="text-xs bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3 py-1 rounded-lg hover:bg-amber-500/20 transition">
                            Test Route
                        </button>
                    </div>

                    <div class="bg-gray-800/30 hover:bg-gray-800/60 transition border border-gray-800 rounded-xl p-3.5 flex items-center justify-between">
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">POST / PATCH</span>
                                <span class="font-mono text-sm text-gray-200">/trainer-applications</span>
                            </div>
                            <p class="text-xs text-gray-400 mt-1">Trainer promotion application workflow</p>
                        </div>
                        <button onclick="openTester('GET', '/trainer-applications')" class="text-xs bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3 py-1 rounded-lg hover:bg-amber-500/20 transition">
                            Test Route
                        </button>
                    </div>

                    <div class="bg-gray-800/30 hover:bg-gray-800/60 transition border border-gray-800 rounded-xl p-3.5 flex items-center justify-between">
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded">PATCH / GET</span>
                                <span class="font-mono text-sm text-gray-200">/user & /user/:id</span>
                            </div>
                            <p class="text-xs text-gray-400 mt-1">Admin manage role status / soft-blocks</p>
                        </div>
                        <button onclick="openTester('GET', '/user')" class="text-xs bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3 py-1 rounded-lg hover:bg-amber-500/20 transition">
                            Test Route
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<!-- API Route Tester Modal -->
<div id="testerModal" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div class="bg-gray-900 border border-gray-800 w-full max-w-2xl rounded-2xl p-6 shadow-2xl relative space-y-4">
        <div class="flex justify-between items-center">
            <h3 class="text-lg font-bold text-gray-100 flex items-center gap-2">
                ⚙️ Secure Route Request Tester
            </h3>
            <button onclick="closeTester()" class="text-gray-400 hover:text-white text-xl font-bold">&times;</button>
        </div>

        <div class="space-y-3 text-sm">
            <div>
                <label class="block text-xs font-semibold text-gray-400 mb-1">Target Endpoint</label>
                <div class="flex gap-2">
                    <select id="reqMethod" class="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-xs font-bold focus:outline-none">
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PATCH">PATCH</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                    <input type="text" id="reqUrl" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 font-mono text-xs text-amber-300 focus:outline-none" placeholder="/route-path">
                </div>
            </div>

            <div>
                <label class="block text-xs font-semibold text-gray-400 mb-1">Bearer Auth Token (Optional Header)</label>
                <input type="text" id="reqToken" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 font-mono text-xs text-gray-300 focus:outline-none" placeholder="Bearer eyJhbGciOi...">
            </div>

            <div>
                <label class="block text-xs font-semibold text-gray-400 mb-1">JSON Payload Body (For POST/PATCH)</label>
                <textarea id="reqBody" rows="3" class="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 font-mono text-xs text-gray-300 focus:outline-none" placeholder='{ "userId": "123", "status": "Approved" }'></textarea>
            </div>

            <button onclick="executeRequest()" class="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-2.5 rounded-xl transition shadow-lg text-xs tracking-wider uppercase">
                Send Request
            </button>

            <div>
                <label class="block text-xs font-semibold text-gray-400 mb-1">Response JSON</label>
                <pre id="resOutput" class="bg-black/60 border border-gray-800 rounded-xl p-3 font-mono text-xs text-green-400 max-h-48 overflow-y-auto whitespace-pre-wrap">Awaiting execution...</pre>
            </div>
        </div>
    </div>
</div>

<script>
function openTester(method, url) {
    document.getElementById('reqMethod').value = method;
    document.getElementById('reqUrl').value = url;
    document.getElementById('resOutput').textContent = "Ready to test request.";
    document.getElementById('testerModal').classList.remove('hidden');
}

function closeTester() {
    document.getElementById('testerModal').classList.add('hidden');
}

async function executeRequest() {
    const method = document.getElementById('reqMethod').value;
    const url = document.getElementById('reqUrl').value;
    const token = document.getElementById('reqToken').value.trim();
    const bodyText = document.getElementById('reqBody').value.trim();
    const output = document.getElementById('resOutput');

    output.textContent = "Executing...";

    const headers = { 'Content-Type': 'application/json' };
    if (token) {
        headers['Authorization'] = token.startsWith('Bearer ') ? token : 'Bearer ' + token;
    }

    const options = { method, headers };

    if ((method === 'POST' || method === 'PATCH') && bodyText) {
        try {
            options.body = JSON.stringify(JSON.parse(bodyText));
        } catch (e) {
            output.textContent = "Error: Invalid JSON body format.";
            return;
        }
    }

    try {
        const res = await fetch(url, options);
        const data = await res.json().catch(() => ({ statusText: res.statusText }));
        output.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
        output.textContent = "Fetch Error: " + err.message;
    }
}
</script>
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

// Helper: checks whether a user has been soft-blocked by an Admin.
async function isUserBlocked(db, userId) {
  if (!userId) return false;
  const usersCollection = db.collection("user");
  let query = { $or: [{ _id: userId }] };
  if (ObjectId.isValid(userId)) query.$or.push({ _id: new ObjectId(userId) });
  const user = await usersCollection.findOne(query);
  return user?.status === "blocked";
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

    const { search, category, status, trainerId } = req.query;
    let query = {};

    if (status) query.status = status;
    if (trainerId) {
      query.$or = [
        { trainerId: trainerId },
        { "trainer.id": trainerId }
      ];
    }
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

app.post("/classes", async (req, res) => {
  try {
    const db = await connectDB();
    const { trainerId } = req.body;

    if (await isUserBlocked(db, trainerId)) {
      return res.status(403).json({ message: "Action restricted by Admin." });
    }

    const classesCollection = db.collection("classes");

    const {
      title,
      image,
      category,
      difficultyLevel,
      duration,
      schedule,
      time,
      price,
      description,
      trainerName,
      trainerAvatar, 
      totalSlots,
    } = req.body;

    if (!title || !trainerId) {
      return res.status(400).json({
        message: "Missing required class details (title or trainerId).",
      });
    }
    
    const numericDuration = Number(String(duration).replace(/[^0-9]/g, "")) || 0;

    const newClass = {
      title,
      category: category || "",
      level: difficultyLevel || "",
      trainerId: trainerId, 
      trainer: {
        name: trainerName || "",
        avatar: trainerAvatar || ""
      },
      duration: numericDuration,
      price: Number(price) || 0,
      rating: 0,
      booked: 0,
      totalSlots: Number(totalSlots) || 10,
      schedule: Array.isArray(schedule)
        ? schedule
        : String(schedule || "")
            .split(",")
            .map((day) => day.trim())
            .filter(Boolean),
      time: time || "",
      description: description || "",
      image: image || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "Pending",
    };

    const result = await classesCollection.insertOne(newClass);
    res.status(201).json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error("Error creating class:", error);
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

// PATCH /classes/:id - Trainer updates their own class
app.patch("/classes/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const classesCollection = db.collection("classes");

    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid class ID format" });
    }

    // Optional: extract trainerId from req.body if sent, to verify block status
    const { trainerId } = req.body;
    if (trainerId && (await isUserBlocked(db, trainerId))) {
      return res.status(403).json({ message: "Action restricted by Admin." });
    }

    const {
      title,
      image,
      category,
      difficultyLevel,
      duration,
      schedule,
      time,
      price,
      description,
    } = req.body;

    const updateFields = { updatedAt: new Date() };
    if (title !== undefined) updateFields.title = title;
    if (image !== undefined) updateFields.image = image;
    if (category !== undefined) updateFields.category = category;
    if (difficultyLevel !== undefined)
      updateFields.difficultyLevel = difficultyLevel;
    if (duration !== undefined) updateFields.duration = duration;
    if (schedule !== undefined) {
      updateFields.schedule = Array.isArray(schedule)
        ? schedule
        : String(schedule)
            .split(",")
            .map((day) => day.trim())
            .filter(Boolean);
    }
    if (time !== undefined) updateFields.time = time;
    if (price !== undefined) updateFields.price = Number(price);
    if (description !== undefined) updateFields.description = description;

    const result = await classesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Class not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Class updated successfully" });
  } catch (error) {
    console.error("Error updating class:", error);
    res.status(500).json({ message: error.message });
  }
});

// DELETE /classes/:id - Trainer removes their own class
app.delete("/classes/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const classesCollection = db.collection("classes");

    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid class ID format" });
    }

    const result = await classesCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Class not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Class deleted successfully" });
  } catch (error) {
    console.error("Error deleting class:", error);
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

    if (userId && classId) {
      const existingBooking = await bookingsCollection.findOne({
        userId: userId,
        classId: classId,
        status: "paid",
      });

      return res.send({ hasBooked: !!existingBooking });
    }

    let query = {};
    if (userId) query.userId = userId;
    if (classId) query.classId = classId;
    if (status) query.status = status;

    const bookings = await bookingsCollection.find(query).toArray();
    res.send(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: error.message });
  }
});

// POST /bookings
app.post("/bookings", async (req, res) => {
  try {
    const db = await connectDB();
    const bookingsCollection = db.collection("bookings");

    const { userId, classId } = req.body;

    if (!userId || !classId) {
      return res.status(400).json({
        message: "Missing required booking details (userId or classId).",
      });
    }

    if (await isUserBlocked(db, userId)) {
      return res.status(403).json({ message: "Action restricted by Admin." });
    }

    const existingBooking = await bookingsCollection.findOne({
      userId: userId,
      classId: classId,
      status: "paid",
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "You have already booked this class.",
      });
    }

    const classItem = await db
      .collection("classes")
      .findOne({ _id: new ObjectId(classId) });
    if (!classItem) {
      return res.status(404).json({ message: "Class not found." });
    }
    if (classItem.booked >= classItem.totalSlots) {
      return res.status(400).json({ message: "This class is full." });
    }

    res.status(200).json({
      success: true,
      message: "Validation passed. Proceed to payment.",
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
    const {
      classId,
      bookingId,
      userId: bodyUserId,
      userEmail: bodyUserEmail,
      userName: bodyUserName,
      userImage: bodyUserImage,
      className,
      price,
      trainerName,
      image,
      category,
      schedule,
      time,
    } = req.body;

    const db = await connectDB();

    let userId = bodyUserId || "";
    let userEmail = bodyUserEmail || "";

    if (userId && (await isUserBlocked(db, userId))) {
      return res.status(403).json({ message: "Action restricted by Admin." });
    }

    let userName = bodyUserName || "";
    let userImage = bodyUserImage || "";

    if (!userName && (userId || userEmail)) {
      const orConditions = [];

      if (userId) orConditions.push({ _id: userId });
      if (userId && ObjectId.isValid(userId)) {
        orConditions.push({ _id: new ObjectId(userId) });
      }
      if (userEmail) {
        orConditions.push({ email: userEmail });
      }

      if (orConditions.length > 0) {
        const userRecord = await db
          .collection("user")
          .findOne({ $or: orConditions });
        if (userRecord) {
          if (userRecord.status === "blocked") {
            return res.status(403).json({ message: "Action restricted by Admin." });
          }
          userName = userRecord.name || userRecord.displayName || "";
          if (!userImage)
            userImage = userRecord.image || userRecord.photoURL || "";
        }
      }
    }

    const classItem = await db
      .collection("classes")
      .findOne({ _id: new ObjectId(classId) });

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
        userName: userName || "",
        userImage: userImage || "",
        className: className || classItem?.title || "",
        price: String(price || classItem?.price || 20),
        trainerName: trainerName || classItem?.trainer?.name || "",
        image: image || classItem?.image || "",
        category: category || classItem?.category || "",
        schedule:
          typeof schedule === "string"
            ? schedule
            : JSON.stringify(schedule || classItem?.schedule || []),
        time: time || classItem?.time || "",
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ message: error.message });
  }
});

// STRIPE WEBHOOK ROUTE
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const {
        userId,
        classId,
        userEmail,
        userName,
        userImage,
        className,
        price,
        trainerName,
        image,
        category,
        schedule,
        time,
      } = session.metadata;

      try {
        const db = await connectDB();

        // Check block status at webhook completion safety measure
        if (await isUserBlocked(db, userId)) {
          console.warn(`⚠️ Blocked user ${userId} attempted checkout completion. Booking aborted.`);
          return res.json({ received: true });
        }

        let parsedSchedule = schedule;
        try {
          parsedSchedule = JSON.parse(schedule);
        } catch (e) {}

        const newBooking = {
          userId,
          classId,
          userEmail,
          userName,
          className,
          userImage,
          price: Number(price),
          trainerName,
          image,
          category,
          schedule: parsedSchedule,
          time,
          status: "paid",
          paymentIntentId: session.payment_intent,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await db.collection("bookings").insertOne(newBooking);

        await db
          .collection("classes")
          .updateOne(
            {
              _id: new ObjectId(classId),
              $expr: { $lt: ["$booked", "$totalSlots"] },
            },
            { $inc: { booked: 1 } },
          );

        console.log(`✅ Payment confirmed via Webhook. Booking successfully created for class ${classId}.`);
      } catch (dbError) {
        console.error("Database insert error via webhook:", dbError);
      }
    }

    res.json({ received: true });
  },
);

// DELETE BOOKING ROUTE
app.delete("/bookings/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const bookingsCollection = db.collection("bookings");
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid booking ID format" });
    }

    const result = await bookingsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: error.message });
  }
});

// FAVORITES ROUTES
app.get("/favorites", async (req, res) => {
  try {
    const db = await connectDB();
    const favoritesCollection = db.collection("favorites");
    const { userId, classId } = req.query;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "Missing userId query parameter." });
    }

    if (classId) {
      const favorite = await favoritesCollection.findOne({ userId, classId });
      return res.send({ isFavorite: !!favorite });
    }

    const favorites = await favoritesCollection.find({ userId }).toArray();
    res.send(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/favorites", async (req, res) => {
  try {
    const db = await connectDB();
    const { userId, classId } = req.body;

    if (!userId || !classId) {
      return res
        .status(400)
        .json({ message: "Missing required favorite details." });
    }

    if (await isUserBlocked(db, userId)) {
      return res.status(403).json({ message: "Action restricted by Admin." });
    }

    const favoritesCollection = db.collection("favorites");
    const {
      userEmail,
      className,
      trainerName,
      schedule,
      category,
      image,
    } = req.body;

    const existingFavorite = await favoritesCollection.findOne({
      userId,
      classId,
    });
    if (existingFavorite) {
      return res.status(400).json({ message: "Already in favorites" });
    }

    const newFavorite = {
      userId,
      classId,
      userEmail,
      className,
      trainerName,
      schedule,
      category,
      image,
      createdAt: new Date(),
    };

    const result = await favoritesCollection.insertOne(newFavorite);
    res.status(201).json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ message: error.message });
  }
});

app.delete("/favorites", async (req, res) => {
  try {
    const db = await connectDB();
    const favoritesCollection = db.collection("favorites");
    const { userId, classId } = req.query;

    if (!userId || !classId) {
      return res.status(400).json({ message: "Missing userId or classId." });
    }

    const result = await favoritesCollection.deleteOne({ userId, classId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Favorite not found." });
    }

    res.status(200).json({ success: true, message: "Removed from favorites." });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ message: error.message });
  }
});

app.delete("/favorites/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const favoritesCollection = db.collection("favorites");
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid favorite ID format." });
    }

    const result = await favoritesCollection.deleteOne({
      _id: new ObjectId(id),
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Favorite not found." });
    }

    res.status(200).json({ success: true, message: "Removed successfully." });
  } catch (error) {
    console.error("Error deleting favorite by ID:", error);
    res.status(500).json({ message: error.message });
  }
});

// COMMUNITY POSTS ROUTES
app.get("/community-posts", async (req, res) => {
  try {
    const db = await connectDB();
    const postsCollection = db.collection("community_posts");

    const { search, category, authorId } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "all") {
      query.category = { $regex: category, $options: "i" };
    }

    if (authorId) query.authorId = authorId;

    const posts = await postsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    res.send(posts);
  } catch (error) {
    console.error("Error fetching community posts:", error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/community-posts", async (req, res) => {
  try {
    const db = await connectDB();
    const postsCollection = db.collection("community_posts");

    const { title, image, description, category, authorId, author } = req.body;

    if (!title || !description || !authorId) {
      return res.status(400).json({
        message: "Missing required post details (title, description, or authorId).",
      });
    }

    if (await isUserBlocked(db, authorId)) {
      return res.status(403).json({ message: "Action restricted by Admin." });
    }

    const newPost = {
      title,
      image: image || "",
      description,
      category: category || "General",
      authorId,
      author: {
        name: author?.name || "",
        role: author?.role || "trainer",
        badge: author?.badge || "",
        avatar: author?.avatar || "",
      },
      tags: [],
      engagement: {
        likesCount: "0",
        dislikesCount: "0",
        isPinned: false,
        likes: [],
        dislikes: [],
      },
      comments: [],
      createdAt: new Date(),
    };

    const result = await postsCollection.insertOne(newPost);
    res.status(201).json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error("Error creating community post:", error);
    res.status(500).json({ message: error.message });
  }
});

app.delete("/community-posts/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const postsCollection = db.collection("community_posts");
    const id = req.params.id;

    let query = { $or: [{ _id: id }] };
    if (ObjectId.isValid(id)) {
      query.$or.push({ _id: new ObjectId(id) });
    }

    const result = await postsCollection.deleteOne(query);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Community post not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting community post:", error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/community-posts/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const postsCollection = db.collection("community_posts");

    const id = req.params.id;

    let query = {
      $or: [{ _id: id }],
    };

    if (ObjectId.isValid(id)) {
      query.$or.push({ _id: new ObjectId(id) });
    }

    const postItem = await postsCollection.findOne(query);

    if (!postItem) {
      return res.status(404).json({ message: "Community post not found" });
    }

    res.send(postItem);
  } catch (error) {
    console.error("Error fetching single post:", error);
    res.status(500).json({ message: error.message });
  }
});

// 1. Handle Vote (Like / Dislike)
// 1. Handle Vote (Like / Dislike)
app.patch("/community-posts/:postId/vote", async (req, res) => {
  try {
    const db = await connectDB();
    const postsCollection = db.collection("community_posts");
    const { postId } = req.params;
    const { userId, type } = req.body;

    // Security check: Blocked users cannot vote
    if (await isUserBlocked(db, userId)) {
      return res.status(403).json({ message: "Action restricted by Admin." });
    }

    let query = { $or: [{ _id: postId }] };
    if (ObjectId.isValid(postId)) {
      query.$or.push({ _id: new ObjectId(postId) });
    }

    const post = await postsCollection.findOne(query);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    let engagement = post.engagement || {};
    let likes = Array.isArray(engagement.likes) ? [...engagement.likes] : [];
    let dislikes = Array.isArray(engagement.dislikes)
      ? [...engagement.dislikes]
      : [];

    const hasLiked = likes.includes(userId);
    const hasDisliked = dislikes.includes(userId);

    if (type === "like") {
      if (hasLiked) {
        likes = likes.filter((id) => id !== userId);
      } else {
        likes.push(userId);
        dislikes = dislikes.filter((id) => id !== userId);
      }
    } else if (type === "dislike") {
      if (hasDisliked) {
        dislikes = dislikes.filter((id) => id !== userId);
      } else {
        dislikes.push(userId);
        likes = likes.filter((id) => id !== userId);
      }
    }

    const updatedEngagement = {
      ...engagement,
      likes,
      dislikes,
      likesCount: String(likes.length),
      dislikesCount: String(dislikes.length),
    };

    await postsCollection.updateOne(query, {
      $set: { engagement: updatedEngagement },
    });

    const updatedPost = await postsCollection.findOne(query);
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating vote:", error);
    res.status(500).json({ message: error.message });
  }
});

// 2. Add a Comment
app.post("/community-posts/:id/comments", async (req, res) => {
  try {
    const db = await connectDB();
    const postsCollection = db.collection("community_posts");
    const id = req.params.id;

    // Extract user email or id from author payload or request body
    const commenterIdentifier =
      req.body.author?.email ||
      req.body.authorId ||
      req.body.author?.id ||
      req.body.userId;

    // Security check: Check block status by ID or Email lookup
    let isBlocked = await isUserBlocked(db, commenterIdentifier);
    if (!isBlocked && req.body.author?.email) {
      const userRecord = await db
        .collection("user")
        .findOne({ email: req.body.author.email });
      if (userRecord && userRecord.status === "blocked") {
        isBlocked = true;
      }
    }

    if (isBlocked) {
      return res.status(403).json({ message: "Action restricted by Admin." });
    }

    let query = { $or: [{ _id: id }] };
    if (ObjectId.isValid(id)) {
      query.$or.push({ _id: new ObjectId(id) });
    }

    const newComment = {
      _id: new ObjectId(),
      text: req.body.text,
      author: req.body.author,
      createdAt: new Date(),
    };

    const post = await postsCollection.findOne(query);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await postsCollection.updateOne(query, { $push: { comments: newComment } });

    const updatedPost = await postsCollection.findOne(query);
    res.send(updatedPost.comments || []);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: error.message });
  }
});

// 3. Delete a Comment
app.delete("/community-posts/:postId/comments/:commentId", async (req, res) => {
  try {
    const db = await connectDB();
    const postsCollection = db.collection("community_posts");
    const { postId, commentId } = req.params;
    const userId = req.body?.userId;

    if (userId && (await isUserBlocked(db, userId))) {
      return res.status(403).json({ message: "Action restricted by Admin." });
    }

    let query = { $or: [{ _id: postId }] };
    if (ObjectId.isValid(postId)) {
      query.$or.push({ _id: new ObjectId(postId) });
    }

    let commentQueryId = commentId;
    if (ObjectId.isValid(commentId)) {
      commentQueryId = new ObjectId(commentId);
    }

    const post = await postsCollection.findOne(query);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await postsCollection.updateOne(query, {
      $pull: { comments: { _id: commentQueryId } },
    });

    const updatedPost = await postsCollection.findOne(query);
    res
      .status(200)
      .json({ success: true, comments: updatedPost.comments || [] });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: error.message });
  }
});

// 4. Update/Edit a Comment
app.patch("/community-posts/:postId/comments/:commentId", async (req, res) => {
  try {
    const db = await connectDB();
    const postsCollection = db.collection("community_posts");
    const { postId, commentId } = req.params;
    const { text, userId } = req.body;

    if (userId && (await isUserBlocked(db, userId))) {
      return res.status(403).json({ message: "Action restricted by Admin." });
    }

    let query = { $or: [{ _id: postId }] };
    if (ObjectId.isValid(postId)) {
      query.$or.push({ _id: new ObjectId(postId) });
    }

    let commentQueryId = commentId;
    if (ObjectId.isValid(commentId)) {
      commentQueryId = new ObjectId(commentId);
    }

    const post = await postsCollection.findOne(query);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await postsCollection.updateOne(
      { ...query, "comments._id": commentQueryId },
      { $set: { "comments.$.text": text } }
    );

    const updatedPost = await postsCollection.findOne(query);
    res
      .status(200)
      .json({ success: true, comments: updatedPost.comments || [] });
  } catch (error) {
    console.error("Error editing comment:", error);
    res.status(500).json({ message: error.message });
  }
});

// ADMIN ROUTES
app.patch("/user/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const usersCollection = db.collection("user");
    const id = req.params.id;

    let query = { $or: [{ _id: id }] };
    if (ObjectId.isValid(id)) query.$or.push({ _id: new ObjectId(id) });

    const { role, status } = req.body;
    if (role === undefined && status === undefined) {
      return res.status(400).json({ message: "Nothing to update." });
    }

    const updateFields = { updatedAt: new Date() };
    if (role !== undefined) updateFields.role = role;
    if (status !== undefined) updateFields.status = status;

    const result = await usersCollection.updateOne(query, {
      $set: updateFields,
    });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: error.message });
  }
});

// TRAINER APPLICATIONS ROUTES
app.get("/trainer-applications", async (req, res) => {
  try {
    const db = await connectDB();
    const usersCollection = db.collection("user");
    const { status } = req.query;

    let query = { "trainerApplication": { $exists: true } };
    if (status) {
      query["trainerApplication.status"] = status;
    }

    const users = await usersCollection.find(query).toArray();

    const applications = users.map(user => ({
      _id: user.trainerApplication._id || user._id, 
      userId: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      ...user.trainerApplication
    }));

    res.send(applications);
  } catch (error) {
    console.error("Error fetching trainer applications:", error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/trainer-applications", async (req, res) => {
  try {
    const db = await connectDB();
    const { userId, experience, specialty } = req.body;

    if (!userId || !experience || !specialty) {
      return res.status(400).json({
        message: "Missing required application details.",
      });
    }

    if (await isUserBlocked(db, userId)) {
      return res.status(403).json({ message: "Action restricted by Admin." });
    }

    // Checking embedded vs collection storage logic
    const usersCollection = db.collection("user");
    let query = { $or: [{ _id: userId }] };
    if (ObjectId.isValid(userId)) query.$or.push({ _id: new ObjectId(userId) });

    const newApplication = {
      status: "Pending",
      experience,
      specialty,
      time: req.body.time || "",
      feedback: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await usersCollection.updateOne(query, {
      $set: { trainerApplication: newApplication }
    });

    res.status(201).json({ success: true, message: "Trainer application submitted successfully." });
  } catch (error) {
    console.error("Error creating trainer application:", error);
    res.status(500).json({ message: error.message });
  }
});

app.patch("/trainer-applications/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const usersCollection = db.collection("user");
    const id = req.params.id;

    let query = { $or: [{ _id: id }] };
    if (ObjectId.isValid(id)) {
      query.$or.push({ _id: new ObjectId(id) });
    }

    const { action, feedback } = req.body;

    const user = await usersCollection.findOne(query);
    if (!user || !user.trainerApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (action === "approve") {
      await usersCollection.updateOne(query, {
        $set: {
          role: "trainer",
          "trainerApplication.status": "Approved",
          "trainerApplication.feedback": feedback || "",
          "trainerApplication.updatedAt": new Date(),
          updatedAt: new Date(),
        },
      });

      return res.status(200).json({
        success: true,
        message: "Application approved. User promoted to trainer.",
      });
    }

    if (action === "reject") {
      await usersCollection.updateOne(query, {
        $set: {
          "trainerApplication.status": "Rejected",
          "trainerApplication.feedback": feedback || "",
          "trainerApplication.updatedAt": new Date(),
          updatedAt: new Date(),
        },
      });
      return res
        .status(200)
        .json({ success: true, message: "Application rejected." });
    }

    return res
      .status(400)
      .json({ message: "Invalid action. Must be 'approve' or 'reject'." });
  } catch (error) {
    console.error("Error updating trainer application:", error);
    res.status(500).json({ message: error.message });
  }
});

app.patch("/classes/:id/status", async (req, res) => {
  try {
    const db = await connectDB();
    const classesCollection = db.collection("classes");
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid class ID format" });
    }

    const { status } = req.body;
    if (!["Approved", "Rejected", "Pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const result = await classesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({
      success: true,
      message: `Class ${status.toLowerCase()} successfully`,
    });
  } catch (error) {
    console.error("Error updating class status:", error);
    res.status(500).json({ message: error.message });
  }
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;
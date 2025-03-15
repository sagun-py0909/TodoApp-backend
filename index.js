require("dotenv").config(); // Load environment variables
const express = require("express");
const pool = require("./dbconn"); // PostgreSQL connection
const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port

app.use(express.json()); // Middleware to parse JSON

// Test database connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Database connection error:", err);
  } else {
    console.log("✅ Database connected at:", res.rows[0].now);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await pool.query("select * from users");
    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/createUser", (req, res) => {
  const body = req.body;
  pool.query(
    "insert into users (userName , email , password) values ($1 , $2 , $3) returning *",
    [body.userName, body.email, body.password],
    (err, result) => {
      if (err) {
        console.error(err.message);
      }
      res.json(result.rows);
    }
  );
});

app.post("/addTodo", (req , res)=>{
  const body = req.body;
  
})


// Simple Route
app.get("/", (req, res) => {
  res.send("Hello, World! 🚀");
});

// Start Server
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});

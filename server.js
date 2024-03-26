const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;

app.use(cors());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "TutopiaDB",
  password: "root",
  port: 5432,
});

app.use(express.json());

// Hash password function
const hashPassword = async (password) => {
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

// Verify password function
const verifyPassword = async (password, hashedPassword) => {
  try {
    console.log(password);
    console.log(hashedPassword);
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.error("Error verifying password:", error);
    throw error;
  }
};

// Register new user
app.post("/sign-up", async (req, res) => {
  const { firstName, lastName, accountType, email, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    console.log("hashed password: " + hashedPassword);
    const client = await pool.connect();
    const query =
      "INSERT INTO Users (first_name, last_name, account_type, email, password) VALUES ($1, $2, $3, $4, $5)";
    await client.query(query, [
      firstName,
      lastName,
      accountType,
      email,
      hashedPassword,
    ]);
    client.release();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// User Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT password FROM Users WHERE email = $1",
      [email]
    );
    client.release();
    if (result.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    const hashedPassword = result.rows[0].password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordMatch) {
      return res.status(200).send("Login successful");
    } else {
      return res.status(401).send("Incorrect password");
    }
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).send("Login failed");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

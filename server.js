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

// app.get("/search", async (req, res) => {
//   const searchItem = req.query.q;
//   pool.query("SELECT * FROM courses", async (err, courseResult) => {
//     if (err) {
//       console.error("Error executing query", err.stack);
//       return res.status(500).json({ error: "Something went wrong" });
//     }

//     // Map the results to an array of course objects with teacher details
//     const courses = await Promise.all(
//       courseResult.rows.map(async (row) => {
//         const teacherResult = await pool.query(
//           "SELECT * FROM teachers WHERE teacher_id = $1",
//           [row.teacher_id]
//         );

//         const teacher = teacherResult.rows[0];
//         return {
//           course_id: row.course_id,
//           difficulty_level: row.difficulty_level,
//           duration: row.duration,
//           short_description: row.short_description,
//           long_description: row.long_description,
//           name: row.name,
//           rating: row.rating,
//           no_of_people_rated: row.no_of_people_rated,
//           num_lectures: row.num_of_lectures,
//           type: row.type,
//           price: row.price,
//           teacher: {
//             teacher_id: teacher.teacher_id,
//             first_name: teacher.first_name,
//             last_name: teacher.last_name,
//             email: teacher.email,
//             title: teacher.title,
//             students_taught: teacher.students_taught,
//           },
//         };
//       })
//     );

//     // console.log("Response headers:", res.getHeaders());
//     res.json(courses);
//   });
// });

app.get("/api/courses/:id", async (req, res) => {
  // console.log("ID Called");
  const searchId = req.params.id;
  console.log("the search id is " + searchId);
  try {
    const courseResult = await pool.query(
      "SELECT * FROM courses WHERE course_id = $1",
      [searchId]
    );
    const course = courseResult.rows[0];
    // console.log("Course:", course);

    const teacherResult = await pool.query(
      "SELECT * FROM teachers WHERE teacher_id=$1",
      [course.teacher_id]
    );
    const teacher = teacherResult.rows[0];
    console.log(teacher);
    course.teacher = teacher;

    const lectureResult = await pool.query(
      "SELECT * FROM lecture WHERE owner_course = $1",
      [searchId]
    );
    const lectures = lectureResult.rows;
    // console.log("The lectures are:", lectures);

    // Add lectures to the course object
    course.lectures = lectures;
    // console.log("Course:", course);
    res.json(course);
  } catch (error) {
    console.error("Error executing query", error.stack);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// NEED TO BE FIXED!!!
// Getting All courses from the courses table
// Currently bugged as it will get all the courses from the table
app.get("/api/courses", (req, res) => {
  pool.query("SELECT * FROM courses", async (err, courseResult) => {
    if (err) {
      console.error("Error executing query", err.stack);
      return res.status(500).json({ error: "Something went wrong" });
    }

    // Map the results to an array of course objects with teacher details
    const courses = await Promise.all(
      courseResult.rows.map(async (row) => {
        const teacherResult = await pool.query(
          "SELECT * FROM teachers WHERE teacher_id = $1",
          [row.teacher_id]
        );

        const teacher = teacherResult.rows[0];
        // console.log(teacher);

        // const lectureResult = await pool.query(
        //   "SELECT * FROM lecture WHERE owner_course = $1",
        //   [row.course_id]
        // );
        // const lectures = lectureResult.rows[0];
        // console.log(lectures);

        return {
          course_id: row.course_id,
          difficulty_level: row.difficulty_level,
          duration: row.duration,
          short_description: row.short_description,
          long_description: row.long_description,
          name: row.name,
          rating: row.rating,
          no_of_people_rated: row.no_of_people_rated,
          num_lectures: row.num_of_lectures,
          type: row.type,
          price: row.price,
          teacher: {
            teacher_id: teacher.teacher_id,
            first_name: teacher.first_name,
            last_name: teacher.last_name,
            email: teacher.email,
            title: teacher.title,
            students_taught: teacher.students_taught,
          },
        };
      })
    );

    // console.log("Response headers:", res.getHeaders());
    res.json(courses);
  });
});

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

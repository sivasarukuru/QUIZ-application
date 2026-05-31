const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const db = new sqlite3.Database("quiz.db");

// Create table
db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS questions(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT,
            option1 TEXT,
            option2 TEXT,
            option3 TEXT,
            option4 TEXT,
            answer TEXT
        )
    `);

  db.get("SELECT COUNT(*) AS count FROM questions", (err, row) => {
    if (row.count === 0) {
      db.run(`
                INSERT INTO questions
                (question,option1,option2,option3,option4,answer)
                VALUES
                (
                'Which language is used for web development?',
                'Java',
                'Python',
                'JavaScript',
                'C++',
                'JavaScript'
                )
            `);

      db.run(`
                INSERT INTO questions
                (question,option1,option2,option3,option4,answer)
                VALUES
                (
                'What does HTML stand for?',
                'Hyper Text Markup Language',
                'Home Tool Markup Language',
                'High Text Language',
                'None',
                'Hyper Text Markup Language'
                )
            `);
      db.run(`
INSERT INTO questions
(question,option1,option2,option3,option4,answer)
VALUES
(
'Who developed Java?',
'James Gosling',
'Dennis Ritchie',
'Bjarne Stroustrup',
'Guido van Rossum',
'James Gosling'
)
`);

      db.run(`
INSERT INTO questions
(question,option1,option2,option3,option4,answer)
VALUES
(
'Which keyword is used to inherit a class in Java?',
'implements',
'extends',
'inherit',
'super',
'extends'
)
`);

      db.run(`
INSERT INTO questions
(question,option1,option2,option3,option4,answer)
VALUES
(
'Which method is the entry point of a Java program?',
'start()',
'run()',
'main()',
'execute()',
'main()'
)
`);

      db.run(`
INSERT INTO questions
(question,option1,option2,option3,option4,answer)
VALUES
(
'Which of the following is not a primitive data type in Java?',
'int',
'float',
'String',
'char',
'String'
)
`);

      db.run(`
INSERT INTO questions
(question,option1,option2,option3,option4,answer)
VALUES
(
'Which operator is used for object creation in Java?',
'create',
'make',
'new',
'object',
'new'
)
`);

      db.run(`
INSERT INTO questions
(question,option1,option2,option3,option4,answer)
VALUES
(
'Which package is imported by default in every Java program?',
'java.util',
'java.io',
'java.lang',
'java.sql',
'java.lang'
)
`);

      db.run(`
INSERT INTO questions
(question,option1,option2,option3,option4,answer)
VALUES
(
'What does JVM stand for?',
'Java Variable Machine',
'Java Virtual Machine',
'Java Verified Machine',
'Java Vendor Machine',
'Java Virtual Machine'
)
`);

      db.run(`
INSERT INTO questions
(question,option1,option2,option3,option4,answer)
VALUES
(
'Which keyword is used to define a constant in Java?',
'constant',
'final',
'static',
'const',
'final'
)
`);

      db.run(`
INSERT INTO questions
(question,option1,option2,option3,option4,answer)
VALUES
(
'Which loop is guaranteed to execute at least once?',
'for',
'while',
'do-while',
'foreach',
'do-while'
)
`);

      db.run(`
INSERT INTO questions
(question,option1,option2,option3,option4,answer)
VALUES
(
'Which concept allows a class to have multiple methods with the same name?',
'Inheritance',
'Encapsulation',
'Polymorphism',
'Abstraction',
'Polymorphism'
)
`);
    }
  });
});

// API
app.get("/questions", (req, res) => {
  db.all("SELECT * FROM questions", [], (err, rows) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(rows);
    }
  });
});

app.listen(3000, () => {
  console.log("Server Running at http://localhost:3000");
});

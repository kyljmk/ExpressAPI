const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  {
    id: 1,
    name: "javascript",
  },
  {
    id: 2,
    name: "c#",
  },
  {
    id: 3,
    name: "ruby",
  },
];

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === Number(req.params.id));

  if (!course) {
    res.status(404).send("nope");
  }
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const newCourse = {
    id: req.body.id,
    name: req.body.name,
  };

  if (!req.body.id) {
    res.status(400).send("Id missing");
  }
  if (!req.body.name) {
    res.status(400).send("Name missing");
  }
  res.send(newCourse);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));

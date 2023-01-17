const express = require("express");
const app = express();
const Joi = require("joi");

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

  if (!course) return res.status(404).send("No course with that Id");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newCourse = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(newCourse);
  res.status(201).send(newCourse);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === Number(req.params.id));
  if (!course) return res.status(404).send("No course with that Id");

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.status(204).send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === Number(req.params.id));
  if (!course) {
    res.status(404).send("No course with that Id");
  }
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.status(204).send(course);
});

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
};

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));

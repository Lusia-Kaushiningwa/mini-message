const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/index");

const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware to parse form data (req.body)
app.use(express.urlencoded({ extended: true }));

// Optional: serve static files (css, etc.) from /public
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mini Messageboard app listening on port ${PORT}`);
});

3. routes/index.js

javascript
const { Router } = require("express");
const router = Router();

const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

let nextId = 3;

// GET index page - show all messages
router.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

// GET form for a new message
router.get("/new", (req, res) => {
  res.render("form", { title: "New Message" });
});

// POST a new message
router.post("/new", (req, res) => {
  const { messageUser, messageText } = req.body;
  messages.push({
    id: nextId++,
    text: messageText,
    user: messageUser,
    added: new Date(),
  });
  res.redirect("/");
});

// GET a single message's details
router.get("/message/:id", (req, res) => {
  const message = messages.find((m) => m.id === Number(req.params.id));

  if (!message) {
    return res.status(404).render("404", { title: "Message not found" });
  }

  res.render("message", { title: "Message details", message: message });
});

module.exports = router;
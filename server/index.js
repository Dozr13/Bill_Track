require("dotenv").config();
const express = require("express"),
  ctrlUser = require("./controllers/user"),
  ctrlExpense = require("./controllers/expenses"),
  auth = require("./middleware/authCheck");
const session = require("express-session");
const massive = require("massive");

const { format } = require("date-fns");

const path = require("path");

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;

const app = express();

app.use(express.json());

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("db connected!");
});

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookies: { maxAge: 1000 * 60 * 60 * 60 },
  })
);

app.post("/api/auth/register", ctrlUser.register);
app.post("/api/auth/login", ctrlUser.login);
app.get("/api/auth/user", ctrlUser.getUser);
app.post("/api/auth/logout", ctrlUser.logout);
app.put("/api/auth/update/:id", ctrlUser.editUser);

app.post("/api/read-day", auth.userOnly, ctrlExpense.readDayExpense);
app.post("/api/new-expense", auth.userOnly, ctrlExpense.createExpense);
app.post("/api/expenses-range", auth.userOnly, ctrlExpense.readRangeExpenses);
app.put("/api/edit-expense/:id", auth.userOnly, ctrlExpense.editExpense);
app.delete("/api/expense/:id", auth.userOnly, ctrlExpense.deleteExpense);

app.use(express.static(__dirname + "/../build"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(SERVER_PORT, (_) => {
  console.log(
    `Hi! I'm your server and I'm listening on port: ${SERVER_PORT}! This is so exciting!!!`
  );
});

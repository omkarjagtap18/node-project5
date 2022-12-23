import express from "express";
import { createConnection } from "mysql";
import bluebird from "bluebird";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("hello world"));

app.get("/home", (req, res) => res.send("you are at home page"));

app.get("/message", (req, res) => {
  let message = { id: 1, message: "hi", messageTime: new Date() };
  res.json(message);
});

app.get("/messages/", async (req, res) => {
  let connectionUri = {
    host: "localhost",
    user: "root",
    password: "Thermalenn@18",
    database: "js",
  };
  let connection = createConnection(connectionUri);
  bluebird.promisifyAll(connection);

  await connection.connectAsync();

  let sql = `select * from message`;
  let results = await connection.queryAsync(sql);

  await connection.endAsync();

  res.json(results);
});

app.post("/message", async (req, res) => {
  let connectionUri = {
    host: "localhost",
    user: "root",
    password: "Thermalenn@18",
    database: "js",
  };
  let connection = createConnection(connectionUri);
  bluebird.promisifyAll(connection);

  await connection.connectAsync();

  // let message = "omkar";
  // let reply = 0;

  let message = req.body.message;
  let reply = req.body.reply;

  let sql = `insert into message(message,reply)values('${message}','${reply}')`;
  await connection.queryAsync(sql);

  await connection.endAsync();

  res.json({ msg: "Record added" });
});

app.listen(3000);

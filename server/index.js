const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 7777;
const VideoRequestData = require("./data/video-requests.data");
const UserData = require("./data/user.data");
const cors = require("cors");
const mongoose = require("./models/mongo.config");
const { json } = require("body-parser");

if (!Object.keys(mongoose).length) return;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

// json parser
app.use(express.json());

app.get("/", (req, res) =>
  res.send("Welcome to semicolon academy APIs, use /video-request to get data")
);

// ! first task  done
app.post("/video-request", async (req, res, next) => {
  //! create (videoRequest)document in videoRequests Collection
  const response = await VideoRequestData.createRequest(req.body);
  res.send(response);
  next();
});

// todoing:: videos data
// مجرد url
app.get("/video-request/:top", async (req, res, next) => {
  const data = await VideoRequestData.getAllVideoRequests(req.params.top);
  res.send(data);
  next();
});

//! it crashed => cause it's looks like the one before it  same url
app.get("/video-request/id/:id", async (req, res, next) => {
  const data = await VideoRequestData.getRequestById(req.params.id);
  res.send(data);
  next();
});

// todo::all users
// see all users data to compare with one who's trying to vote
app.get("/users", async (req, res, next) => {
  const response = await UserData.getAllUsers(req.body);
  res.send(response);
  next();
});

// check if user exists and login or if not will create a new one
app.post("/users/login", async (req, res, next) => {
  const response = await UserData.createUser(req.body);
  res.redirect(`http://localhost:5500?id=${response._id}`);
  next();
});

app.use(express.json());

// ! here to get see video
app.put("/video-request/vote", async (req, res, next) => {
  const { id, vote_type } = req.body;
  const response = await VideoRequestData.updateVoteForRequest(id, vote_type);
  res.send(response);
  next();
});

app.put("/video-request", async (req, res, next) => {
  const { id, status, resVideo } = req.body;

  const response = await VideoRequestData.updateRequest(id, status, resVideo);
  res.send(response);
  next();
});

app.delete("/video-request", async (req, res, next) => {
  const response = await VideoRequestData.deleteRequest(req.body.id);
  res.send(response);
  next();
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

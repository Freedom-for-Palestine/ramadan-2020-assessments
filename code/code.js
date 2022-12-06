// const { json } = require("body-parser");

import submit_func from "./submit.js";
import ShowListOfRequests from "./ShowListOfRequests.js";
import constants from "./constants.js";

// window.addEventListener("load", () => {
//! submit listener
constants.submit.addEventListener("click", submit_func);

// show list of requests after loading the page
let limit = 3; // how many requests to show for client
ShowListOfRequests(limit);
// -------------------------------------------------------------------------------------------
// * vote task
//! get all users data first
const getAllUsersData = function () {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:7777/users/", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // console.log("users data");
      // console.log(JSON.parse(xhr.responseText));
    }
  };
  xhr.send("");
};
// this is private because it's in module level
getAllUsersData();

// ! create new user data
const userLogin = function (newUser) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:7777/users/login", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function () {
    // console.log(xhr.responseText);
  };
  // you must send object as json object not js object
  xhr.send(JSON.stringify(newUser));
};

// ! user data
const getUserData = () => {
  // const userData = document.sessionStorage.getItem("currentUser");
  let userData = "";
  // ! here i'm checking if user login or not (means he in sessionStorage or not)
  if (window.sessionStorage.getItem("currentUser")) {
    userData = JSON.parse(window.sessionStorage.getItem("currentUser"));
  } else {
    const email = prompt(
      `PLZ! Enter your data First before voting
      Email`,
      "example@example.com"
    );
    const name = prompt(`Name`, "name");
    userData = { author_email: email, author_name: name };
    window.sessionStorage.setItem("currentUser", JSON.stringify(userData));
    // ! user login =>>>>> /// if user is already exists it will return his data or it will create a new one and also return his data
    userLogin(userData);
  }
  return userData;
};

// !ToDo : this fucking task
// * taaaaaaaaaaaaaaaaaaaaaaask heeeeeeeeeeeeeeeer
// ! up and down
const requestsList = document.getElementById("listOfRequests");
requestsList.addEventListener("click", async (e) => {
  if (
    e.target.tagName.toLowerCase() === "a" &&
    (e.target.classList.contains("voteUp") ||
      e.target.classList.contains("voteDown"))
  ) {
    e.preventDefault();
    //! then i'll see what i gonna do with this links
    const videoRequestId = e.target.parentNode.parentNode.parentNode.id;
    let voteType = "";
    if (e.target.classList.contains("voteUp")) {
      voteType = "ups";
    } else {
      voteType = "downs";
    }
    // * test
    //!!!! maybe i could create a handle to help me creating ajax call without create it from scratch every time
    const d = { id: videoRequestId, vote_type: voteType };
    await func(d);

    //!!!! another xhr one for get updated data
    // or reload page by async (ajax)
    // const res = await another(d);
    // console.log(JSON.parse(res));
    // const votes = JSON.parse(res).votes;
    // console.log(votes);
    // e.target.parentNode.children[1].innerText = votes.ups - votes.downs;
    // document.getElementById("listOfRequests").textContent = "";
    // ShowListOfRequests();
    //  await requestByID(videoRequestId);
    const one = JSON.parse(await requestByID(videoRequestId));
    e.target.parentNode.children[1].innerText = one.votes.ups - one.votes.downs;
    console.log(one)
  }
});

// });

// to await this
const func = async function (d) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://localhost:7777/video-request/vote", true);

    xhr.setRequestHeader("content-type", "application/json");

    // ! onload
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response); ///!!!! return what comes from the server 1
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    // ! onerror
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };

    // initialize request
    xhr.send(JSON.stringify(d));
  });
};

//! xhr for one request
const requestByID = async (id) => {
  return new Promise((resolve,reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:7777/video-request/id/${id}`);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {


        resolve(xhr.responseText); ///!!!! return what comes from the server 1
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.send("");
  });
};

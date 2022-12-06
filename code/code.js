import submit_func from "./submit.js";
import ShowListOfRequests from "./ShowListOfRequests.js";
import constants from "./constants.js";
import voteUpDowns from "./voteUpsDowns.js";
// window.addEventListener("load", () => {
//! submit listener
constants.submit.addEventListener("click", submit_func);

// show list of requests after loading the page
let limit = 20; // how many requests to show for client
// !!!!TODO ::::: something to change this typeOfSorting
ShowListOfRequests(limit,'byVote');
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

// ! Votes ups and downs
constants.requestsList.addEventListener("click", voteUpDowns);

// });
// !Task
// !ToDo : sorting (NEW) => (sort NEW by votes)
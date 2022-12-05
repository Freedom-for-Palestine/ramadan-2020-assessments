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
// });

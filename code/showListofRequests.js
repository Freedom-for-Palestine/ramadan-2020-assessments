import addRequestElementToTheDom from "./addRequestElementToTheDom.js";
//! get a list of requests
const ShowListOfRequests = function (top) {
  const xhr = new XMLHttpRequest();
  // open request
  xhr.open("GET", `http://localhost:7777/video-request/${top}`, true);
  // set header to tell server what i'm going to send or the type of object text - html - json
  xhr.setRequestHeader("Content-type", "application/json ; charset=utf-8");
  // initialize request or start
  xhr.send("");

  xhr.onload = function () {
    if (xhr.status === 200) {
      // data
      const data = JSON.parse(xhr.responseText);
      data.forEach((element) => {
        // .getElementById("listOfRequests")
        // .insertAdjacentHTML("beforeend", CreateRequestElement(element));
        addRequestElementToTheDom("listOfRequests", "beforeend", element);
      });
    }
  };
};

export default ShowListOfRequests;

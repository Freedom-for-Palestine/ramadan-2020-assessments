import addRequestElementToTheDom from "./addRequestElementToTheDom.js";
//! get a list of requests
// !!!!TODO ::::: something to change this typeOfSorting
const ShowListOfRequests = function (top, typeOfSorting) {
  //! default value for top
  if (isNaN(top)) top = 3;
  //! default value for typeOfSorting

  if (typeof typeOfSorting == "undefined")
    typeOfSorting = "sortingByUpdatedTime";

  const xhr = new XMLHttpRequest();
  // open request
  xhr.open("GET", `http://localhost:7777/video-request/${top}`, true);
  // set header to tell server what i'm going to send or the type of object text - html - json
  xhr.setRequestHeader("Content-type", "application/json ; charset=utf-8");
  // when payload is here
  xhr.onload = function () {
    if (xhr.status === 200) {
      // data
      const data = JSON.parse(xhr.responseText);
      // !!! may i can make it as extension function xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      sorting(data,typeOfSorting).forEach((element) => {
        //!!!ToDo : i think sorting must be here
        // disposable => one time use
        // updated date not created one
        console.log(new Date(element.update_date).getTime());
        addRequestElementToTheDom("listOfRequests", "beforeend", element);
      });
    }
  };

  // initialize request or start
  xhr.send("");
};

export default ShowListOfRequests;

//!!! function for calculating votes for every element
// ! how to make this function as a extension function xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
const elementVote = (element) => {
  return element.votes.ups - element.votes.downs;
};

// !!! sorting function return sorted array
// !!! determined by type of sorting

// let typeOfSorting = will be as parameter of showListOfRequests
// ! how to make this function as a extension function xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

const sorting = (elements, typeOfSorting) => {
  if (typeOfSorting === "byVote") {
    elements.sort((elementA, elementB) => {
      return elementVote(elementB) - elementVote(elementA);
    });
  } else {
    elements.sort((elementA, elementB) => {
      return (
        Number(new Date(elementB.update_date).getTime()) -
        Number(new Date(elementA.update_date).getTime())
      );
    });
  }

  return elements;
};

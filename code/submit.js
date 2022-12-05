import constants from "./constants.js";
import addRequestElementToTheDom from "./addRequestElementToTheDom.js";

const submit_func = function (e) {
  {
    // preventdefault behavior for submit btn
    e.preventDefault();
    // how to use ajax
    // i should take these values from html page user inputs
    // but here i'm just trying it
    const videoRequestOBJ = {
      author_name: constants.author_name.value,
      author_email: constants.author_email.value,
      topic_title: constants.topic_title.value,
      topic_details: constants.topic_details.value,
      expected_result: constants.expected_result.value,
      target_level: constants.target_level.value,
    };
    // check
    console.log(videoRequestOBJ);
    // convert js object to json object to send it to webserver
    const videoRequestJSON = JSON.stringify(videoRequestOBJ);
    // server url
    const url = "http://localhost:7777/video-request";

    const xhr = new XMLHttpRequest();
    // open request
    xhr.open("POST", url, true);
    // set header to tell server what i'm going to send or the type of object text - html - json
    xhr.setRequestHeader("Content-type", "application/json ; charset=utf-8");
    // initialize request
    xhr.send(videoRequestJSON);

    xhr.onload = function () {
      if (xhr.status === 200) {
        const element = JSON.parse(xhr.responseText);
        document;
        // .getElementById("listOfRequests")
        // .insertAdjacentHTML("afterbegin", CreateRequestElement(element));
        addRequestElementToTheDom("listOfRequests", "afterbegin", element);
      }
    };
  }
};

export default submit_func;

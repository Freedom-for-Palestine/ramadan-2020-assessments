// constantans
// i will call it after loading the html page
const constants = {
  author_name: document.getElementsByName("author_name")[0],
  author_email: document.getElementsByName("author_email")[0],
  topic_title: document.getElementsByName("topic_title")[0],
  topic_details: document.getElementsByName("topic_details")[0],
  expected_result: document.getElementsByName("expected_result")[0],
  target_level: document.getElementsByName("target_level")[0],
  submit: document.querySelector("button"),
  requestsList: document.getElementById("listOfRequests"),
};

export default constants;

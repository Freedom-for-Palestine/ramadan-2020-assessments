const requestByID = async (id) => {
  return new Promise((resolve, reject) => {
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


export default requestByID;
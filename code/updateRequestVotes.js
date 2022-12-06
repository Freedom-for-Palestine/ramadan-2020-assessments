const updateRequestVotes = async function (vote) {
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
      xhr.send(JSON.stringify(vote));
    });
  };


  export default updateRequestVotes;
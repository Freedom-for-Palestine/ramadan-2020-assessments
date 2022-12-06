import updateRequestVotes from "./UpdateRequestVotes.js";
import requestByID from "./getOneRequest.js";


const voteUpDowns = async (e) => {
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
    const vote = { id: videoRequestId, vote_type: voteType };
    await updateRequestVotes(vote);

    //!!!! another xhr one for get updated data
    const one = JSON.parse(await requestByID(videoRequestId));
    e.target.parentNode.children[1].innerText = one.votes.ups - one.votes.downs;
    // console.log(one);
  }
};


export default voteUpDowns;
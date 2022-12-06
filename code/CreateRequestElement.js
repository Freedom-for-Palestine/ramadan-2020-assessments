// create html elements or
// ! create request element
const CreateRequestElement = function (content) {
  // * voting
  // !=> i don't know how to do this yet

  return `
    <div class="card mb-3" id='${content._id}'>
          <div class="card-body d-flex justify-content-between flex-row">
            <div class="d-flex flex-column">
              <h3>${content.topic_title
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}</h3>
              <p class="text-muted mb-2">${content.topic_details}</p>
              <p class="mb-0 text-muted">
                <strong>Expected results:</strong>${content.expected_results}
              </p>
            </div>
            <div class="d-flex flex-column text-center">
              <a class="btn btn-link voteUp">🔺</a>
              <h3 class='vote'>${content.votes.ups - content.votes.downs}</h3>
              <a class="btn btn-link voteDown">🔻</a>
            </div>
          </div>
          <div class="card-footer d-flex flex-row justify-content-between">
            <div>
              <span class="text-info">${content.status.toUpperCase()}</span>
              &bullet; added by <strong>${content.author_name}</strong> on
              <strong>${new Date(content.submit_date).toDateString()}</strong>
            </div>
            <div
              class="d-flex justify-content-center flex-column 408ml-auto mr-2"
            >
              <div class="badge badge-success">${content.target_level}</div>
            </div>
          </div>
        </div>
    `;
};

export default CreateRequestElement;

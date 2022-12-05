import CreateRequestElement from "./CreateRequestElement.js";

const addRequestElementToTheDom = function (id, position, element) {
  document
    .getElementById(id)
    .insertAdjacentHTML(position, CreateRequestElement(element));
};

export default addRequestElementToTheDom;

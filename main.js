import { catchError, getTodos, postTodo,afterLoadComments, dataOfComment } from "./api.js";
import { checkText, getComment, likeStatus } from "./buttons.js";
import { uploadComments } from "./render.js";

let comments = [];
let comment = document.getElementById('comment');
const nameCommentUser = document.getElementById('nameCommentUser');
const textComment = document.getElementById('textComment');
const buttonWriteComment = document.getElementById('write-comment');

const initButtonLike = () => {
  for (const likeButton of document.querySelectorAll(".like-button")) {
    likeButton.addEventListener("click", (event) => {
    event.stopPropagation();
    likeStatus(likeButton, comments);
    renderComments();
    });
  }
};

const answerCommet = () => {
  const answerComments = document.querySelectorAll(".comment");
  for (const answerComment of answerComments){
    answerComment.addEventListener("click", () => {
      getComment(answerComment, comments);
      renderComments();
    })
  } 
};

const renderComments = () => {
  comment.innerHTML = uploadComments(comments);
  initButtonLike();
  answerCommet();
};

const fetchAndRender = () => {
  getTodos().then((responseData) => {
    comments = dataOfComment(responseData);
    renderComments();
    })
    .then(() => {
      afterLoadComments();
    });
} 
fetchAndRender();

buttonWriteComment.addEventListener("click", () => {
  checkText(nameCommentUser, textComment);
  postTodo().then(() => {
    return fetchAndRender();
  })
  .catch((error) => {
    catchError(error);
  });
  renderComments();
})
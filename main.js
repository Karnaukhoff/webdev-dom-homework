import { catchError, getTodos, postTodo,afterLoadComments, dataOfComment, login, setToken, token } from "./api.js";
import { checkText, getComment, likeStatus } from "./buttons.js";
import { uploadComments, renderLogin, renderSignUp, fetchAndRenderAfterAuthorization } from "./render.js";

let comments = [];
let comment = document.getElementById('comment');

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
  document.getElementById('comment-load').style.display = "flex";
  //document.getElementById('add-form').style.display = "none";

  getTodos().then((responseData) => {
    comments = dataOfComment(responseData);
    renderComments();
    })
    .then(() => {
      document.getElementById('comment-load').style.display = "none";
      document.getElementById('authorization-message').style.display = "flex";
      //afterLoadComments();
    });
} 
//renderLogin();
fetchAndRender();
const authorizationButton = () => {
  for (const authorizationWord of document.querySelectorAll(".authorization-word")) {
    authorizationWord.addEventListener("click", () => {
      renderLogin();
      document.getElementById("comment").style.display = "none";
      document.getElementById("authorization-message").style.display = "none";
      const signUp = document.getElementById("authorization-form-link");
      signUp.addEventListener("click", () => {
        renderSignUp();
        authorizationButton();
      });

      const buttonAuthorizationElement = document.getElementById("buttonAuthorization");
      let loginAuthorizationElement = document.getElementById("authorizationInputLogin");
      let passwordAuthorizationElement = document.getElementById("authorizationInputPassword");
      
      buttonAuthorizationElement.addEventListener("click", () => {
        login({
            login: loginAuthorizationElement.value,
            password: passwordAuthorizationElement.value,
        }).then((responseData) => {
            console.log(token);
            setToken(responseData.user.token);
            console.log(token);
            document.getElementById("comment-load").style.display = "flex";
            fetchAndRenderAfterAuthorization(responseData);
            document.getElementById("nameCommentUser").disabled = true;
            document.getElementById("nameCommentUser").style.background = "rgb(108, 81, 81)";
        }).then(() => {
          
          document.getElementById("comment").style.display = "flex";
        }).then(() => {
          afterLoadComments();
          const buttonWriteComment = document.getElementById('write-comment');
          buttonWriteComment.addEventListener("click", () => {
            const nameCommentUser = document.getElementById('nameCommentUser');
            const textComment = document.getElementById('textComment');
            checkText(nameCommentUser, textComment);
            postTodo(nameCommentUser, textComment).then(() => {
              //return fetchAndRenderAfterAuthorization();
              document.getElementById('comment-load').style.display = "flex";
              getTodos().then((responseData) => {
              comments = dataOfComment(responseData);
              renderComments();
            })
              .then(() => {
                document.getElementById('comment-load').style.display = "none";
                afterLoadComments();
              });
            })
            .catch((error) => {
              catchError(error);
            });
            renderComments();
          })
        });
      })
        })
      }
    }
authorizationButton();
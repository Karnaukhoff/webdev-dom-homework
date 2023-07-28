import { catchError, getTodos, postTodo,afterLoadComments, dataOfComment, login, setToken, token } from "./api.js";
import { checkText, getComment, likeStatus } from "./buttons.js";
import { uploadComments, renderSignUp, fetchAndRenderAfterAuthorization } from "./render.js";
import { renderLogin } from "./renderLogin.js";

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

  getTodos().then((responseData) => {
    comments = dataOfComment(responseData);
    renderComments();
    })
    .then(() => {
      document.getElementById('comment-load').style.display = "none";
      document.getElementById('authorization-message').style.display = "flex";
    });
} 
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
        buttonAuthorizationElement.disabled = true;
        buttonAuthorizationElement.value = "Подождите...";
        console.log(buttonAuthorizationElement.value);
        login({
            login: loginAuthorizationElement.value,
            password: passwordAuthorizationElement.value,
        }).then((responseData) => {

            if (responseData.error === 'Неверный логин или пароль'){
              console.log(responseData.error);
              throw Error ("Неверный логин или пароль");
            } else {
              setToken(responseData.user.token);
            }
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
            postTodo(nameCommentUser, textComment).then((response) => {
              if (response.status === 201) {
                return response.json();
              }
              else if (response.status === 400) {
                if (nameCommentUser.value.length < 3) {
                  nameCommentUser.classList.add('error');
                }
                if (textComment.value.length < 3) {
                  textComment.classList.add('error');
                }
                throw Error("Плохой запрос");
              }
              else if (response.status === 500){
                nameCommentUser.classList.remove('error');
                textComment.classList.remove("error");
                throw Error("Сервер упал");
              }
            })
            .then(() => {
              nameCommentUser.value = "";
              textComment.value = "";
              nameCommentUser.classList.remove('error');
              textComment.classList.remove("error");
            }).then(() => {
              //return fetchAndRenderAfterAuthorization();
              document.getElementById('comment-load').style.display = "flex";
              getTodos().then((responseData) => {
              comments = dataOfComment(responseData);
              renderComments();
            }).then(() => {
                document.getElementById('comment-load').style.display = "none";
                afterLoadComments();
              });
              }).catch((error) => {
                console.log('Поймал ошибку');
                catchError(error);
            })
            })
            
            renderComments();
          }).catch((error) => {
            console.log('Поймал ошибку');
            catchError(error);
        })
        });
        })
      }
    }
authorizationButton();
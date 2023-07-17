"use strict";
let comment = document.getElementById('comment');
let comments = [];
    /*{
        author: {name: "Глеб Фокин"},
        date: "12.02.22 12:18",
        text: "Это будет первый комментарий на этой странице",
        likes: 3,
        isLiked: false,
    },
    {
        autor: {name: "Варвара Н."},
        date: "13.02.22 19:22",
        text: "Мне нравится как оформлена эта страница! ❤",
        likes: 75,
        isLiked: false,
    },
  ];*/
  /*
  {
        name: "Глеб Фокин",
        date: "12.02.22 12:18",
        text: "Это будет первый комментарий на этой странице",
        countOfLikes: 3,
        likeExist: false,
    },
    {
        name: "Варвара Н.",
        date: "13.02.22 19:22",
        text: "Мне нравится как оформлена эта страница! ❤",
        countOfLikes: 75,
        likeExist: false,
    },
  */
  const initButtonLike = () => {
    for (const likeButton of document.querySelectorAll(".like-button")) {
        likeButton.addEventListener("click", (event) => {
            event.stopPropagation();
            const index = likeButton.dataset.index;
            if (comments[index].isLiked === false) {
                comments[index].likes += 1;
                comments[index].isLiked = true;
                console.log("works if");
            } else {
                comments[index].likes -= 1;
                comments[index].isLiked = false;
                console.log("works else");
            }
            //console.log(index);
            renderComments();
        });
    }
};
const answerCommet = () => {
  const answerComments = document.querySelectorAll(".comment");
  for (const answerComment of answerComments){
    answerComment.addEventListener("click", () => {
      const index = answerComment.dataset.index;
      textComment.value = `>${comments[index].text}
      ${comments[index].name}, `;
      console.log(comments[index].text);
      renderComments();
    })
  } 
};
const renderComments = () => {
    const commentsHtml = comments.map((comment, index) => {
        const isLike = () => {
          if (comment.isLiked === true) {return `-active-like`;}
        };
        return `<li class="comment" data-index=${index}>
        <div class="comment-header">  
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body comment-text">
        ${comment.text}
        </div>
        <div class="comment-footer likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button ${isLike()}" data-index=${index}></button>
        </div>
      </li>`;
    }).join("");
    comment.innerHTML = commentsHtml;
    initButtonLike();
    answerCommet();
};
const fetchAndRender = () => {
  return fetch("https://wedev-api.sky.pro/api/v1/maksim-karnaukhov/comments", {
          method: "GET",
        }).then((response) => {
          // Этот код сработает после того, как завершится промис от fetch POST
          return response.json();
        })
        .then((responseData) => {
          // Этот код сработает после того, как завершится промис от response.json() из предыдущего then
          const appComments = responseData.comments.map((comment) => {
            return {
              name: comment.author.name,
              date: new Date(comment.date).toLocaleDateString('ru-RU', {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'}),
              text: comment.text,
              likes: comment.likes,
              isLiked: false,
            };
          });
          comments = appComments;
          renderComments();
        })
        .then(() => {
          document.getElementById('comment-load').style.display = "none";
          document.getElementById('add-form').style.display = "flex";
          document.getElementById('add-form-load').style.display = "none";
          });
} 
//document.getElementById('comments-load').style.display = "flex";
fetchAndRender();
//document.getElementById('comments-load').style.display = "none";

//<div>${comment.author}</div>

    const nameCommentUser = document.getElementById('nameCommentUser');
    const textComment = document.getElementById('textComment');
    const buttonWriteComment = document.getElementById('write-comment');
    
    let currentDate = new Date();
    let day = currentDate.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    let month = currentDate.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let year = currentDate.getYear() + 1900;
    let hours = currentDate.getHours();
    if (hours < 10) { hours = '0' + hours}
    let minutes = currentDate.getMinutes();
	  if (minutes < 10) {minutes = '0' + currentDate.getMinutes()}

    buttonWriteComment.addEventListener("click", () => {
      nameCommentUser.classList.remove('error');
      textComment.classList.remove(".error");
      if (nameCommentUser.value === "" || textComment.value === "") {
        if (nameCommentUser.value === "") {
          nameCommentUser.classList.add('error');
        }
        if (textComment.value === "") {
          textComment.classList.add('error');
        }
        return;
      }

      document.getElementById('add-form').style.display = "none";
      document.getElementById('add-form-load').style.display = "flex";
      fetch("https://wedev-api.sky.pro/api/v1/maksim-karnaukhov/comments",
      {
        method: "POST",
        body: JSON.stringify({
          name: nameCommentUser.value,
          text: textComment.value,
          forceError: true,
        }),
      })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
        else if (response.status === 400) {
          //console.log(nameCommentUser.value.length);
          if (nameCommentUser.value.length < 3) {
            nameCommentUser.classList.add('error');
          }
          if (textComment.value.length < 3) {
            textComment.classList.add('error');
          }
          throw new Error("Плохой запрос");
        }
        else if (response.status === 500){
          nameCommentUser.classList.remove('error');
          textComment.classList.remove("error");
          throw new Error("Сервер упал");
        }
      })
      .then(() => {
          nameCommentUser.value = "";
          textComment.value = "";
          nameCommentUser.classList.remove('error');
          textComment.classList.remove("error");
          return fetchAndRender();
        })
      .catch((error) => {
        if (error.message === "Плохой запрос") {
          alert('Имя и комментарий должны быть не короче 3-х символов');
        }
        else {
          alert('Что-то пошло не так, повторите попытку позже');
        }
          })
        .then(() => {
            document.getElementById('add-form').style.display = "flex";
            document.getElementById('add-form-load').style.display = "none";
          });
      //})
        renderComments();


  })
  //renderComments();
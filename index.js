"use strict";

const comment = document.getElementById('comment');

const comments = [
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
  ];

  const initButtonLike = () => {
    for (const likeButton of document.querySelectorAll(".like-button")) {
        likeButton.addEventListener("click", (event) => {
            event.stopPropagation();
            const index = likeButton.dataset.index;
            if (comments[index].likeExist === false) {
                comments[index].countOfLikes += 1;
                comments[index].likeExist = true;
                console.log("works if");
            } else {
                comments[index].countOfLikes -= 1;
                comments[index].likeExist = false;
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
            if (comment.likeExist === true) {return `-active-like`;}
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
          <span class="likes-counter">${comment.countOfLikes}</span>
          <button class="like-button ${isLike()}" data-index=${index}></button>
        </div>
      </li>`;
    }).join("");

    comment.innerHTML = commentsHtml;
    initButtonLike();
    answerCommet();
};

renderComments(); 



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

    comments.push(
        {
            name: nameCommentUser.value.replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;"),
            date: `${`${day}.${month}.${year} ${hours}:${minutes}`}`,
            text: `${textComment.value.replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")}`,
            countOfLikes: 0,
            likeExist: false,
        },
    );

    renderComments();
  })

    
    
    //console.log("It works!")
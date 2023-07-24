export function getTodos() {
    return fetch("https://wedev-api.sky.pro/api/v1/maksim-karnaukhov/comments", {
          method: "GET",
        }).then((response) => {
          return response.json();
        })
};
export function dataOfComment(responseData) {
    const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date).toLocaleDateString('ru-RU', {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'}),
          text: comment.text,
          likes: comment.likes,
          isLiked: false,
        };
      });
      return appComments;
};
export function postTodo () {
    document.getElementById('add-form').style.display = "none";
    document.getElementById('add-form-load').style.display = "flex";
    return fetch("https://wedev-api.sky.pro/api/v1/maksim-karnaukhov/comments",
      {
        method: "POST",
        body: JSON.stringify({
          name: nameCommentUser.value,
          text: textComment.value,
          forceError: false,
        }),
      })
      .then((response) => {
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
      })
};
export function catchError (error) {
    if (error.message === "Плохой запрос") {
        alert('Имя и комментарий должны быть не короче 3-х символов');
      }
      else {
        alert('Что-то пошло не так, повторите попытку позже');
      }
        document.getElementById('add-form').style.display = "flex";
        document.getElementById('add-form-load').style.display = "none";
};
export function afterLoadComments() {
    document.getElementById('comment-load').style.display = "none";
    document.getElementById('add-form').style.display = "flex";
    document.getElementById('add-form-load').style.display = "none";
}
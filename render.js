let appElement = document.getElementById("app");
let aferAuthorizationElement = document.getElementById("aferAuthorization");

export const renderSignUp = () => {
    const signUpHtml = `
    <div class="authorization">
        <h3 class="authorization-heading">Форма регистрации</h3>
        <input
          type="text"
          class="authorization-input"
          placeholder="Введите имя"
          id="authorizationInputLogin"
        />
        <input
        type="text"
        class="authorization-input"
        placeholder="Введите логин"
        id="authorizationInputPassword"
        />
        <input
        type="text"
        class="authorization-input"
        placeholder="Введите пароль"
        id="authorizationInputPassword"
        />
        <div class="authorization-form">
          <button class="authorization-input authorization-button" id="buttonAuthorization">Зарегистрироваться</button>
          <a href="#" class="authorization-form-link authorization-word" id="authorization-form-link">Войти</a>
        </div>
      </div>
    `;
    appElement.innerHTML = signUpHtml;
};

export const fetchAndRenderAfterAuthorization = (responseData) => {
    const fetchHtml = `
        <ul class="comments-load" id="comment-load">
            Пожалуйста подождите, загружаю комментарии...
        </ul>
        <ul class="comments" id="comment"></ul>
        <div class="add-form" id="add-form">
            <input
            type="text"
            class="add-form-name"
            placeholder="${responseData.user.name}"
            id="nameCommentUser"
            />
            <textarea
            type="textarea"
            class="add-form-text"
            placeholder="Введите ваш коментарий"
            rows="4"
            id="textComment"
            ></textarea>
            <div class="add-form-row">
            <button class="add-form-button" id="write-comment">Написать</button>
            </div>
        </div>
        <div class="add-form-load" id="add-form-load">
            Комментарий добавляется...
        </div>
    `;
    aferAuthorizationElement.innerHTML = fetchHtml;
    appElement.innerHTML = ``;

};

export function uploadComments(comments) {
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
    return commentsHtml;
}
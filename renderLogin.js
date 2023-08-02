let appElement = document.getElementById("app");

export const renderLogin = () => {
    const loginHtml = `
    <div class="authorization">
        <h3 class="authorization-heading">Форма входа</h3>
        <input
          type="text"
          class="authorization-input"
          placeholder="Введите логин"
          id="authorizationInputLogin"
        />
        <input
        type="text"
        class="authorization-input"
        placeholder="Введите пароль"
        id="authorizationInputPassword"
        />
        <div class="authorization-form">
          <input type="button" value="Войти" class="authorization-input authorization-button" id="buttonAuthorization">
          <a href="#" class="authorization-form-link" id="authorization-form-link">Зарегистрируйтесь</a>
        </div>
      </div>
    `;
    appElement.innerHTML = loginHtml;
};
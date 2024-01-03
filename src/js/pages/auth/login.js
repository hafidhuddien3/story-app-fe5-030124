import Auth from '../../network/auth';
import CheckUserAuth from './check-user-auth';

//menyimpan state(token user)
import Config from '../../config/config';
import Utils from '../../utils/utils';

const Login = {
  async init() {
    CheckUserAuth.checkLoginState();

    this._initialListener();
  },

  _initialListener() {
    const loginForm = document.querySelector('#loginForm');
    loginForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        event.stopPropagation();

        loginForm.classList.add('was-validated');
        await this._getLogged();
      },
      false,
    );
  },

  async _getLogged() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      console.log('formData');
      console.log(formData);
      let r;
      try {
        if (document.querySelector('.error')) {
          this._removeErrorHandling();
        }
        this._addSpinner();

        const response = await Auth.login({
          email: formData.email,
          password: formData.password,
        });
        Utils.setUserToken(Config.USER_TOKEN_KEY, response.data.loginResult.token);
        window.alert('Signed user in detected');

        Utils.setUserName('name', response.data.loginResult.name);

        if (response) {
          this._removeSpinner();
        }

        this._goToDashboardPage();
      } catch (error) {
        this._removeSpinner();
        this._errorHandling(error);
      }
    }
  },

  _errorHandling(error) {
    const div = document.createElement('div');
    div.classList.add('card', 'border-info', 'text-center');
    div.classList.add('error');
    div.innerHTML = `<p>${error.response.data.message}</p>
    <p>staus code= ${error.response.status}</p>`;

    const main = document.querySelector('main');
    main.appendChild(div);
  },

  _removeErrorHandling() {
    const element = document.querySelector('.error');
    element.remove();
  },

  _addSpinner() {
    const div = document.createElement('div');
    div.classList.add('spinner-border');

    const button = document.querySelector('button');
    button.setAttribute('disabled', '');
    button.appendChild(div);
  },

  _removeSpinner() {
    const button = document.querySelector('button');
    button.removeAttribute('disabled');

    const element = document.querySelector('.spinner-border');
    element.remove();
  },

  _getFormData() {
    const email = document.querySelector('#validationCustomRecordEmail');
    const password = document.querySelector('#validationCustomPassword');

    return {
      email: email.value,
      password: password.value,
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '');

    return formDataFiltered.length === 0;
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },
};

export default Login;

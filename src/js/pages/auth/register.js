import Auth from '../../network/auth';
import CheckUserAuth from './check-user-auth';

const Register = {
  async init() {
    CheckUserAuth.checkLoginState();

    this._initialListener();
  },

  _initialListener() {
    const registerForm = document.querySelector('#registerForm');
    registerForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        event.stopPropagation();

        registerForm.classList.add('was-validated');
        await this._getRegistered();
      },
      false,
    );
  },

  async _getRegistered() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      console.log('formData');
      console.log(formData);

      try {
        if (document.querySelector('.error')) {
          this._removeErrorHandling();
        }
        this._addSpinner();

        const response = await Auth.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        window.alert('Registered a new user');
        if (response) {
          this._removeSpinner();
        }
        this._goToLoginPage();
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
    const name = document.querySelector('#validationCustomRecordName');
    const email = document.querySelector('#validationCustomEmail');
    const password = document.querySelector('#validationCustomPassword');

    return {
      name: name.value,
      email: email.value,
      password: password.value,
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '');

    return formDataFiltered.length === 0;
  },

  _goToLoginPage() {
    window.location.href = '/auth/login.html';
  },
};

export default Register;

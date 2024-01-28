import CheckUserAuth from '../auth/check-user-auth';
import Stories from '../../network/stories';
import Utils from '../../utils/utils';

const Add = {
  async init() {
    CheckUserAuth.checkLoginState();

    if (Utils.getUserName('name') != '') {
      const userLoggedMenu = document.querySelector('#userLoggedMenu');
      userLoggedMenu.setAttribute('userName', `${Utils.getUserName('name')}`);
    }

    this._initialListener();
  },

  _initialListener() {
    const addFormRecord = document.querySelector('#addRecordForm');
    addFormRecord.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        addFormRecord.classList.add('was-validated');
        this._sendPost();
      },
      false,
    );
  },

  async _sendPost() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      console.log('formData=');
      console.log(formData);

      try {
        if (document.querySelector('.error')) {
          this._removeErrorHandling();
        }
        this._addSpinner();

        const response = await Stories.store(formData);
        window.alert('New story added successfully');
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
    div.innerHTML = `<p>${error.response.data.message} bytes</p>
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
    div.classList.add('spinner-border', 'text-success', 'float-end');

    const button = document.querySelector('.text-end');
    button.classList.add('d-none');

    const right = document.querySelector('.right');
    right.appendChild(div);
  },

  _removeSpinner() {
    const button = document.querySelector('.text-end');
    button.classList.remove('d-none');

    const element = document.querySelector('.spinner-border');
    element.remove();
  },

  _getFormData() {
    const nameInput = document.querySelector('#userNameLogged');
    const photoInput = document.querySelector('#validationCustomPhoto');
    const descriptionInput = document.querySelector('#validationCustomDescription');

    return {
      description: descriptionInput.value,
      photo: photoInput.files[0],
    };
  },

  _validateFormData(formStatus) {
    const formStatusFiltered = Object.values(formStatus).filter((item) => item === '');
    return formStatusFiltered.length === 0;
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },
};

export default Add;

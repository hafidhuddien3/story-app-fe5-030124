import CheckUserAuth from './auth/check-user-auth';
import Utils from '../utils/utils';

const About = {
  async init() {
    CheckUserAuth.checkLoginState();

    if (Utils.getUserName('name') != '') {
      const userLoggedMenu = document.querySelector('#userLoggedMenu');
      userLoggedMenu.setAttribute('userName', `User Name: ${Utils.getUserName('name')}`);
    }

    await this._initialData();
    this._initialListener();
  },

  async _initialData() {},

  _initialListener() {},
};

export default About;

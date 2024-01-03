import CheckUserAuth from './auth/check-user-auth';
import Utils from '../utils/utils';

const NotFound = {
  async init() {
    await this._initialData();
    this._initialListener();
  },

  async _initialData() {},

  _initialListener() {},
};

export default NotFound;

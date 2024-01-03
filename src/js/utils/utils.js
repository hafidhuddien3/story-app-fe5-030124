let n = 'no';

const Utils = {
  setUserToken(key, value) {
    return sessionStorage.setItem(key, value);
  },
  getUserToken(key) {
    return sessionStorage.getItem(key);
  },
  destroyUserToken(key) {
    return sessionStorage.removeItem(key);
  },
  setUserName(key, value) {
    sessionStorage.setItem(key, value);
    n = value;
  },
  getUserName(key) {
    return sessionStorage.getItem(key);
    return n;
  },
  destroyUserName(key) {
    sessionStorage.removeItem(key);
    n = 'no';
  },
};

export default Utils;

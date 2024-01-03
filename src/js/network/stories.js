import axios from 'axios';
import Config from '../config/config';
import Utils from '../utils/utils';
import ApiEndpoint from '../config/api-endpoint';

const Stories = {
  async getAll() {
    return await axios.get(ApiEndpoint.GET_ALL_STORIES, {
      headers: {
        Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
      },
    });
  },

  async getById(id) {
    return await axios.get(ApiEndpoint.GET_BY_ID_STORY(id), {
      headers: {
        Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
      },
    });
  },

  async store({ description, photo }) {
    const data = { description, photo };

    return await axios.post(ApiEndpoint.STORE_STORY, data, {
      headers: {
        Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async storeGuest({ description, photo }) {
    const data = { description, photo };

    return await axios.post(ApiEndpoint.STORE_STORY_GUEST, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default Stories;

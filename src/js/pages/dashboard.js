import CheckUserAuth from './auth/check-user-auth';
import Stories from '../network/stories';
import Utils from '../utils/utils';

const Dashboard = {
  async init() {
    CheckUserAuth.checkLoginState();

    console.log('username', Utils.getUserName('name'));

    if (Utils.getUserName('name') != '') {
      const userLoggedMenu = document.querySelector('#userLoggedMenu');
      userLoggedMenu.setAttribute('userName', `${Utils.getUserName('name')}`);
    }

    await this._initialData();
    this._initialListener();
  },

  async _initialData() {
    try {
      const response = await Stories.getAll();
      this._listStory = response.data.listStory;
      this._populateStoriesToTable(this._listStory);
      this._populateStoriesDataToCard(this._listStory);
    } catch (error) {
      console.error(error);
    }
  },

  _initialListener() {
    const storyDetailModal = document.getElementById('storyDetailModal');
    storyDetailModal.addEventListener('show.bs.modal', (event) => {
      const modalTitle = storyDetailModal.querySelector('.modal-title');
      modalTitle.focus();

      const button = event.relatedTarget;
      const dataStory = this._listStory.find((item) => {
        return item.id == button.dataset.storyId;
      });

      this._populateDetailStoryToModal(dataStory);
    });
  },

  _populateStoriesDataToCard(listStory = null) {
    if (!(typeof listStory === 'object')) {
      throw new Error(`Parameter listStory should be an object. The value is ${listStory}`);
    }

    if (!Array.isArray(listStory)) {
      throw new Error(`Parameter listStory should be an array. The value is ${listStory}`);
    }

    document.querySelector('#listStory-card').setAttribute('content', `${listStory.length} story`);
  },

  _populateStoriesToTable(storyList = null) {
    if (!(typeof storyList === 'object')) {
      throw new Error(`Parameter storyList should be an object. The value is ${storyList}`);
    }

    if (!Array.isArray(storyList)) {
      throw new Error(`Parameter storyList should be an array. The value is ${storyList}`);
    }

    const storyRow = document.querySelector('#storiesRow');

    storyList.forEach((item, index) => {
      storyRow.innerHTML += this._templateBodyRow(storyList[index]);
    });
  },

  _populateDetailStoryToModal(story) {
    if (!(typeof story === 'object')) {
      throw new Error(`Parameter story should be an object. The value is ${story}`);
    }

    const imgDetailStory = document.querySelector('#storyDetailModal #imgDetailStory');
    const nameDetailStory = document.querySelector('#storyDetailModal #nameDetailStory');
    const dateDetailStory = document.querySelector('#storyDetailModal #dateDetailStory');
    const descriptionDetailStory = document.querySelector(
      '#storyDetailModal #descriptionDetailStory',
    );

    //loginMenu?.classList.add('d-block');

    //imgDetailStory.classList.remove('placeholder-glow');
    //imgDetailStory.classList.remove('placeholder');

    const ph = document.querySelector('.placeholder-glow');
    ph.classList.remove('d-none');

    const img = document.querySelector('.modal-body img');
    img.classList.add('d-none');

    imgDetailStory.setAttribute('src', story.photoUrl);
    imgDetailStory.setAttribute('alt', story.name);
    nameDetailStory.textContent = '';
    nameDetailStory.textContent += 'story ';
    nameDetailStory.textContent += story.name;
    dateDetailStory.textContent = new Date(story.createdAt);
    descriptionDetailStory.textContent = story.description || '-';
  },

  _templateBodyRow(data) {
    return `
    <div class="col-sm-4" ><a href="#">
    <div class="card m-2 gradient-custom border-0 text-center h5" class="btn btn-sm btn-primary" 
    data-bs-toggle="modal" data-bs-target="#storyDetailModal" 
    data-story-id="${data.id}">
    ${data.name}
    </div></a>
    </div>
    `;
  },
};

export default Dashboard;

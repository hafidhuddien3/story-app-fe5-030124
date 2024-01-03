import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

//auth log out
import Utils from '../utils/utils';
import Config from '../config/config';
import CheckUserAuth from '../pages/auth/check-user-auth';

class NavLinkAuth extends LitWithoutShadowDom {
  static properties = {
    userName: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.userName = '';
  }

  render() {
    return html`
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle text-nowrap"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
        >
          <div class="me-2 d-inline-block">
            <img
              id="imgUserLogged"
              style="width: 30px;height: 30px"
              class="img-fluid rounded-pill"
              src="https://ui-avatars.com/api/?name=User%20Name&background=random"
              alt="User Name"
            />
          </div>
          ${this.userName}
          <span id="nameUserLogged"></span>
        </a>

        <ul class="dropdown-menu">
          <a class="dropdown-item" id="userLogOut" @click=${this._userLogOut}> ${`Keluar`} </a>
        </ul>
      </li>
    `;
  }

  _userLogOut(event) {
    event.preventDefault();
    Utils.destroyUserToken(Config.USER_TOKEN_KEY);
    CheckUserAuth.checkLoginState();
    Utils.destroyUserName();
  }
}

customElements.define('nav-link-auth', NavLinkAuth);

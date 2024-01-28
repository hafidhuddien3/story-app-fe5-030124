import { html, nothing } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class GuestAccount extends LitWithoutShadowDom {
  static properties = {
  };

  constructor() {
    super();


  }

  render() {
    return html`
      <div className="guest"><br/>
      Atau menggunakan akun guest<br/>
      <button
      class="container-fluid gradient-custom-3 border mt-1"
        type="button"
        id="guestButton"
      >
        Menggunakan Akun Guest
      </button>
    </div>
    `;
  }

}

customElements.define('guest-account', GuestAccount);
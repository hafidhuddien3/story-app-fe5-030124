import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class NavLinks extends LitWithoutShadowDom {
  render() {
    return html`
      <ul class="navbar-nav d-flex align-items-center gap-3">
        <nav-link content="Dashboard" to="/"></nav-link>
        <nav-link content="Add Story" to="/story/add.html"></nav-link>
        <nav-link content="About" to="/about.html"></nav-link>
        <nav-link-auth id="userLoggedMenu"></nav-link-auth>
        <nav-link content="${`Masuk`}" to="/auth/login.html" id="loginMenu"></nav-link>
      </ul>
    `;
  }
}

customElements.define('nav-links', NavLinks);

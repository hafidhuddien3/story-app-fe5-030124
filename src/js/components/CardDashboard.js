import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class CardDashboard extends LitWithoutShadowDom {
  static properties = {
    content: { type: String, reflect: true },
    description: { type: String, reflect: true },
    classes: { type: String, reflect: true },
  };

  constructor() {
    super();

    this.content = '';
    this.description = '';
    this.classes = '';
  }

  render() {
    return html`
      <div class="card ${this.classes}" style="width:fit-content; padding:7px;">
        Total: ${this.content}
      </div>
    `;
  }
}

customElements.define('card-dashboard', CardDashboard);

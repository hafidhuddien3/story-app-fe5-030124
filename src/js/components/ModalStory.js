import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class ModalStory extends LitWithoutShadowDom {
  static properties = {
    title: { type: String, reflect: true },
  };

  render() {
    return html`
      <div class="modal-dialog modal-lg ">
        <div class="modal-content">
          <div class="modal-header gradient-custom">
            <h1 class="modal-title fs-5" id="nameDetailStory">${this.title}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body row">
            <div class="col-sm mb-3">
              <div class="placeholder-glow">
                <div
                  class="placeholder d-flex border-0 gradient-custom"
                  style="height: 10lh;"
                ></div>
              </div>
              <img
                @load=${this._handleLoad}
                src=""
                id="imgDetailStory"
                class="img-fluid d-none"
                alt="imgDetailStory"
              />
            </div>
            <div class="col-sm mh-100">
              <div class="fw-bold">Tanggal:</div>
              <div id="dateDetailStory"></div>
              <br />
              <div class="fw-bold">Deskripsi:</div>
              <div id="descriptionDetailStory"></div>
            </div>
          </div>
          <div class="modal-footer ">
            <button
              type="button"
              class="container-fluid gradient-custom-3 border-0"
              data-bs-dismiss="modal"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    `;
  }

  _handleLoad(e) {
    let delayInMilliseconds = 2000;

    setTimeout(function () {
      const ph = document.querySelector('.placeholder-glow');
      ph.classList.add('d-none');

      const img = document.querySelector('.modal-body img');
      img.classList.remove('d-none');
    }, delayInMilliseconds);
  }
}

customElements.define('modal-story', ModalStory);

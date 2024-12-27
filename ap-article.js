import { html, css, unsafeHTML } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@3.2.3/+esm';
import { ActivityPubElement } from './ap-element.js';

class ActivityPubArticle extends ActivityPubElement {

  static styles = css`
  :host {
    display: block;
  }
  .object {
      border: 1px solid lightgray;
      border-radius: 8px;
      padding: 8px;
      margin: 8px 0;
  }
  `;

  constructor() {
    super();
  }

  render() {
    if (this._error) {
      return html`
      <div class="object">
        <p>${this._error}</p>
      </div>
    `;
    } else if (!this.json) {
      return html`
      <div class="object">
        <p>Loading...</p>
      </div>
    `;
    } else {
      return html`
        <div class="object article">
        <h3 class="name">${this.name}</h3>
        <p class="summary">${unsafeHTML(DOMPurify.sanitize(this.summary))}</p>
        <p class="url">
          <a class="url-link" href="${this.url}">${this.url}</a>
        </p>
        <p class="published">${this.published}</p>
        </div>
      `;
    }
  }
}

customElements.define('ap-article', ActivityPubArticle);
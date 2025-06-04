import { html, css, unsafeHTML } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@3.2.3/+esm';
import { ActivityPubElement } from './ap-element.js';

export class ActivityPubArticle extends ActivityPubElement {

  static styles = css`
  :host {
    display: block;
  }
  `;

  constructor() {
    super();
  }

  render() {
    if (this._error) {
      return html`
      <div class="article">
        <p>${this._error}</p>
      </div>
    `;
    } else if (!this.json) {
      return html`
      <div class="article">
        <p>Loading...</p>
      </div>
    `;
    } else {
      return html`
        <div class="article">
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
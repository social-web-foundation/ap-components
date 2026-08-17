import { html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import DOMPurify from 'dompurify';
import { ActivityPubElement } from './ap-element.js';

export class ActivityPubArticle extends ActivityPubElement {

  static styles = [super.styles, css`
  :host {
    display: block;
    min-width: var(--ap-min-width);
    min-height: var(--ap-min-height);
  }
  .skeleton {
    min-width: var(--ap-min-width);
    min-height: var(--ap-min-height);
    background-color: lightgray;
  }
  `];

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
        <div class="skeleton"></div>
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

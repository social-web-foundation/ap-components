import { html, css, unsafeHTML } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@3.2.3/+esm';
import { ActivityPubElement } from './ap-element.js';

export class ActivityPubNote extends ActivityPubElement {

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
        <p class="error">${this._error}</p>
      </div>
      `
    } else if (!this.json) {
      return html`
      <div class="object">
        <p>Loading...</p>
      </div>
      `
    } else {
      return html`
        <div class="object note">
          <div class="content">
            ${unsafeHTML(DOMPurify.sanitize(this.content))}
          </div>
          <p class="published">
            <a class="url" href="${this.url}">
              ${this.published}
            </a>
          </p>
        </div>
    `;
    }
  }
}

customElements.define('ap-note', ActivityPubNote);

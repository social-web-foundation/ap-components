import { ActivityPubElement } from './ap-element.js';
import { html, css, unsafeHTML } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@3.2.3/+esm';

class ActivityPubActorItem extends ActivityPubElement {

  static styles = css`
    :host {
      display: block;
    }
    .icon {
      float: left;
      margin-right: 8px;
    }
  `

  constructor() {
    super();
  }

  render() {
    if (this._error) {
      return html`
      <div class="actor">
        <p>${this._error}</p>
      </div>
    `;
    } else if (!this.json) {
      return html`
      <div class="actor">
        <p>Loading...</p>
      </div>
    `;
    } else {
      return html`
      <div class="actor">
        <avatar-icon class="icon" size="64" url="${this.icon}"></avatar-icon>
        <p class="name">${this.name}</p>
        <div class="summary">${unsafeHTML(DOMPurify.sanitize(this.summary))}</div>
        <p><a class="url" href="${this.json.url}">${this.json.url}</a></p>
      </div>
    `;
    }
  }
}

customElements.define('ap-actor-item', ActivityPubActorItem);
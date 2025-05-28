import { ActivityPubElement } from './ap-element.js';
import { html, css, unsafeHTML } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@3.2.3/+esm';

export class ActivityPubActorItem extends ActivityPubElement {

  static styles = css`
    :host {
      display: block;
    }
    .icon {
      float: left;
      margin-right: 8px;
    }
    div.actor {
        border: 1px solid lightgray;
        border-radius: 8px;
        padding: 8px;
        margin: 8px 0;
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
        <a class="webfinger" href="web+acct:${this.webfinger}">${this.webfinger}</a>
        <div class="summary">${unsafeHTML(DOMPurify.sanitize(this.summary))}</div>
        <p><a class="url" href="${this.json.url}">${this.json.url}</a></p>
      </div>
    `;
    }
  }

  get webfinger() {
    if (!this.json) {
      return;
    }
    if (this.json.webfinger) {
      return this.json.webfinger;
    } else {
      const id = this.json.id;
      const domain = (new URL(id)).hostname
      const preferredUsername = this.json.preferredUsername;
      return `${preferredUsername}@${domain}`;
    }
  }
}

customElements.define('ap-actor-item', ActivityPubActorItem);
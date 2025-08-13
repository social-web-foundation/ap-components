import { ActivityPubElement } from './ap-element.js';
import { html, css, unsafeHTML } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@3.2.3/+esm';

export class ActivityPubActorItem extends ActivityPubElement {

  static styles = [super.styles, css`
    :host {
      display: block;
      min-width: var(--ap-min-width);
      min-height: var(--ap-min-height);
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
    .skeleton {
        min-width: var(--ap-min-width);
        min-height: var(--ap-min-height);
        background-color: lightgray;
    }
  `]

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
        <div class="skeleton"></div>
      </div>
    `;
    } else {
      return html`
      <div class="actor">
        ${(this.json.icon)
          ? html`<avatar-icon class="icon" size="64" url="${(typeof this.json.icon == 'string') ? this.json.icon : this.json.icon.href }"></avatar-icon>`
          : ''
        }
        <p class="name">${this.name}</p>
        ${
          (this.webfinger)
          ? html`<a class="webfinger" href="web+acct:${this.webfinger}">${this.webfinger}</a>`
          : ''
        }
        <div class="summary">${unsafeHTML(DOMPurify.sanitize(this.summary))}</div>
        ${
          (this.json.url)
          ? html`<p><a class="url" href="${this.json.url}">${this.json.url}</a></p>`
          : ''
        }

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
    } else if (this.json.preferredUsername) {
      const id = this.json.id;
      const domain = (new URL(id)).hostname
      const preferredUsername = this.json.preferredUsername;
      return `${preferredUsername}@${domain}`;
    } else {
      return;
    }
  }
}

customElements.define('ap-actor-item', ActivityPubActorItem);

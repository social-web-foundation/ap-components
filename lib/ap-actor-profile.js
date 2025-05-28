import { html, css, LitElement, unsafeHTML } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@3.2.3/+esm';
import './avatar-icon.js';

export class ActivityPubActorProfile extends LitElement {
  static get properties() {
    return {
      'name': { type: String },
      'webfinger': { type: String },
      'summary': { type: String },
      'url': { type: String },
      'icon': { type: String }
    }
  }

  constructor() {
    super();
  }

  static styles = css`
    :host {
      display: block;
    }
    .icon {
      float: left;
      margin-right: 8px;
    }`;

  render() {
    return html`
        <avatar-icon class="icon" size="128" url="${this.icon}"></avatar-icon>
        <h2 class="name">${this.name}</h2>
        <p class="webfinger"><a class="webfinger" href="web+${this.webfinger}">${this.webfinger}</a></p>
        <div class="summary">${unsafeHTML(DOMPurify.sanitize(this.summary))}</div>
        <p><a class="url" href="${this.url}">${this.url}</a></p>
      `;
  }
}

// Define the custom element
customElements.define('ap-actor-profile', ActivityPubActorProfile);
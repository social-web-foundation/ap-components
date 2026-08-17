import { html, css, LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import DOMPurify from 'dompurify';
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
      min-width: var(--ap-min-width);
      min-height: var(--ap-min-height);
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

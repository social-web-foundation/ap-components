import { html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { ActivityPubElement } from './ap-element.js';

export class ActivityPubObject extends ActivityPubElement {

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
        <div class="object">
        <p class="name">${this.name}</p>
        <p class="type">${this.type}</p>
        <p class="summary">${this.summary}</p>
        <p class="url"><a class="url-link" href="${this.url}">${this.url}</a></p>
        <p class="published">${this.published}</p>
        </div>
      `;
    }
  }
}

customElements.define('ap-object', ActivityPubObject);
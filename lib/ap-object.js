import { html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { ActivityPubElement } from './ap-element.js';
import { ActivityPubNote } from './ap-note.js';
import { ActivityPubArticle } from './ap-article.js';

export class ActivityPubObject extends ActivityPubElement {

  static styles = css`
  :host {
    display: block;
  }
  `;

  constructor() {
    super();
  }

  static typeMap = {
    'Note': ActivityPubNote,
    'Article': ActivityPubArticle
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
      const cls = this.constructor.typeMap[this.json.type];
      if (cls) {
        const el = new cls();
        el.json = this.json;
        return html`<div class="object">${el}</div>`;
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
}

customElements.define('ap-object', ActivityPubObject);
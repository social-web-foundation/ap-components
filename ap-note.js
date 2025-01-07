import { html, css, unsafeHTML } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@3.2.3/+esm';
import { ActivityPubElement } from './ap-element.js';

export class ActivityPubNote extends ActivityPubElement {

  static get properties() {
    return {
      ...super.properties,
      _attributedTo: { type: Object, state: true },
    }
  }

  static styles = css`
    :host {
      display: block;
    }
    .icon {
      float: left;
      margin-right: 8px;
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
    } else if (!this._attributedTo) {
      return html`
      <div class="object">
        <p>Loading author...</p>
      </div>
      `
    } else {
      return html`
        <div class="object note">
          <avatar-icon class="icon" size="64" url="${this.getIcon(this._attributedTo)}"></avatar-icon>
          <p class="name">${this._attributedTo.name}</p>
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

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('json')) {
      this.fetchAttributedTo();
    }
  }

  async fetchAttributedTo() {
    if (this.json?.attributedTo) {
      if (typeof this.json.attributedTo === 'object') {
        this._attributedTo = this.json.attributedTo;
      } else if (typeof this.json.attributedTo === 'string') {
        try {
          const fn = this.constructor.fetchFunction;
          const headers = { Accept: this.constructor.MEDIA_TYPES.join(', ') };
          const response = await fn(this.json.attributedTo, { headers });
          if (!response.ok) {
            throw new Error(`HTTP ${response.status} ${response.statusText}`);
          }
          const json = await response.json();
          this._attributedTo = json;
        } catch (error) {
          this._error = error.message;
        }
      }
    }
  }
}

customElements.define('ap-note', ActivityPubNote);

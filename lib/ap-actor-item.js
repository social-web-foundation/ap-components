import { ActivityPubElement } from './ap-element.js';
import { html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { webfingerFromJson } from 'activitypub-webfinger';
import { toAcctUri } from 'webfinger';
import DOMPurify from 'dompurify';

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

  static get properties() {
    return {
      ...super.properties
    }
  }

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
          (this._wf && this._wfhref)
          ? html`<a class="webfinger" href="${this._wfhref}">${this._wf}</a>`
          : ''
        }
        <div class="summary">${unsafeHTML(DOMPurify.sanitize(this.summary))}</div>
        ${
          (this.getWebPage(this.json.url))
          ? html`<p><a class="url" href="${this.getWebPage(this.json.url)}">${this.getWebPage(this.json.url)}</a></p>`
          : ''
        }

      </div>
    `;
    }
  }

  get _wfhref() {
    const wf = this._wf
    if (!wf) {
      return null
    }
    try {
      return `web+${toAcctUri(wf)}`
    } catch (err) {
      return null
    }
  }

  get _wf() {
    if (this.json) {
      try {
        return webfingerFromJson(this.json)
      } catch (err) {
        return null
      }
    } else {
      return null
    }
  }
}

customElements.define('ap-actor-item', ActivityPubActorItem);

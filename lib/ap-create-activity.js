import { ActivityPubElement } from './ap-element.js';
import { html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import './ap-object.js';

export class ActivityPubCreateActivity extends ActivityPubElement {

  constructor() {
    super();
  }

  static styles = css`
  .create-activity {
    display: block;
  }
  `

  render() {
    if (this._error) {
      return html`
      <div class="create-activity">
        <p>${this._error}</p>
      </div>
    `;
    } else if (!this.json) {
      return html`
      <div class="create-activity">
        <p>Loading...</p>
      </div>
    `;
    } else {
      return html`
        <div class="create-activity">
        ${(typeof this.json.object == 'string')
        ? html`<ap-object objectId="${this.json.object}"></ap-object>`
        :(typeof this.json.object == 'object')
        ? html`<ap-object json="${JSON.stringify(this.json.object)}"></ap-object>`
        : html`<p>Error: unknown object type</p>`
        }
        </div>
      `;
    }
  }
}

customElements.define('ap-create-activity', ActivityPubCreateActivity);
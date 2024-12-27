import { ActivityPubElement } from './ap-element.js';
import { html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import './ap-object.js';
import './ap-note.js';
import './ap-article.js';

class ActivityPubCreateActivity extends ActivityPubElement {

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
        ${(this.json?.object?.type === 'Note')
        ? html`<ap-note json="${JSON.stringify(this.json.object)}"></ap-note>`
          : (this.json?.object?.type === 'Article')
          ? html`<ap-article json="${JSON.stringify(this.json.object)}"></ap-article>`
          : html`<ap-object json="${JSON.stringify(this.json.object)}"></ap-object>`
        }
        </div>
      `;
    }
  }
}

customElements.define('ap-create-activity', ActivityPubCreateActivity);
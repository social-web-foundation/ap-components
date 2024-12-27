import { ActivityPubElement } from './ap-element.js';
import { html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import './ap-create-activity.js';

class ActivityPubActivity extends ActivityPubElement {

  constructor() {
    super();
  }

  static styles = css`
    :host {
        display: block;
    }
    div.activity {
        border: 1px solid lightgray;
        border-radius: 8px;
        padding: 8px;
        margin: 8px 0;
    }
  `;

  render() {
    if (this._error) {
      return html`
      <div class="activity">
        <p>${this._error}</p>
      </div>
    `;
    } else if (!this.json) {
      return html`
      <div class="activity">
        <p>Loading...</p>
      </div>
    `;
    } else {
      switch (this.json?.type) {
        case 'Create':
          return html`
          <div class="activity">
            <ap-create-activity json="${JSON.stringify(this.json)}"></ap-create-activity>
          </div>
        `;
        default:
          return html`
          <div class="activity">
            <p>${this.json.type}</p>
          </div>
        `;
      }
    }
  }
}

customElements.define('ap-activity', ActivityPubActivity);
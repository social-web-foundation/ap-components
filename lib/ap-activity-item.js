import { ActivityPubElement } from './ap-element.js';
import { html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { ActivityPubCreateActivity } from './ap-create-activity.js';
import { ActivityPubAnnounceActivity } from './ap-announce-activity.js';

export class ActivityPubActivityItem extends ActivityPubElement {

  constructor() {
    super();
  }

  static typeMap = {
    'Create': ActivityPubCreateActivity,
    'Announce': ActivityPubAnnounceActivity
  }

  static styles = [super.styles, css`
    :host {
        display: block;
        min-width: var(--ap-min-width);
        min-height: var(--ap-min-height);
    }
    div.activity {
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
  `];

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
        <div class="skeleton"></div>
      </div>
    `;
    } else {
      const cls = this.constructor.typeMap[this.json.type];
      if (cls) {
        const el = new cls();
        el.json = this.json;
        return html`<div class="activity">${el}</div>`;
      } else {
          return html`
          <div class="activity">
            <p>${this.json.type}</p>
          </div>
        `;
      }
    }
  }
}

export class ActivityPubActivity extends ActivityPubActivityItem {}

customElements.define('ap-activity-item', ActivityPubActivityItem);
customElements.define('ap-activity', ActivityPubActivity);

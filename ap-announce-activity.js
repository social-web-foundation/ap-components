import { ActivityPubElement } from './ap-element.js';
import { html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import './ap-activity.js';
import './ap-object.js';

export class ActivityPubAnnounceActivity extends ActivityPubElement {

  static get properties() {
    return {
      _object: { type: Object, state: true }
    };
  }

  constructor() {
    super();
  }

  static styles = css`
  .announce-activity {
    display: block;
  }
  `

  static activityTypes = [
    'Accept',
    'Add',
    'Announce',
    'Arrive',
    'Block',
    'Create',
    'Delete',
    'Dislike',
    'Flag',
    'Follow',
    'Ignore',
    'Invite',
    'Join',
    'Leave',
    'Like',
    'Listen',
    'Move',
    'Offer',
    'Question',
    'Reject',
    'Read',
    'Remove',
    'TentativeReject',
    'TentativeAccept',
    'Travel',
    'Undo',
    'Update',
    'View'
  ];

  static isActivity(type) {
    return this.activityTypes.includes(type);
  }

  render() {
    if (this._error) {
      return html`
      <div class="announce-activity">
        <p>${this._error}</p>
      </div>
    `;
    } else if (!this.json) {
      return html`
      <div class="announce-activity">
        <p>Loading...</p>
      </div>
    `;
    } else if (!this._object) {
      return html`
      <div class="announce-activity">
        <p>Loading object...</p>
      </div>
      `
    } else {
      const type = this._object.type;
      if (this.constructor.isActivity(type)) {
        return html`
        <div class="announce-activity">
          <ap-activity json="${JSON.stringify(this._object)}"></ap-activity>
        </div>
      `;
      } else {
        return html`
        <div class="announce-activity">
          <ap-object json="${JSON.stringify(this._object)}"></ap-object>
        </div>
      `;
      }
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('json')) {
      this.fetchObject();
    }
  }
  
  async fetchObject() {
    if (this.json?.object) {
      if (typeof this.json.object === 'object') {
        this._object = this.json.object;
      } else if (typeof this.json.object === 'string') {
        try {
          const fn = this.constructor.fetchFunction;
          const headers = { Accept: this.constructor.MEDIA_TYPES.join(', ') };
          const response = await fn(this.json.object, { headers });
          if (!response.ok) {
            throw new Error(`HTTP ${response.status} ${response.statusText}`);
          }
          const json = await response.json();
          this._object = json;
        } catch (error) {
          this._error = error.message;
        }
      }
    }
  }
}

customElements.define('ap-announce-activity', ActivityPubAnnounceActivity);
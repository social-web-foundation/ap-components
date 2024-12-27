import { LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

const AS2_NS = 'https://www.w3.org/ns/activitystreams#';
const AS2_PREFIX = 'as:';

function asMatch(obj, type) {
  return obj.type === type ||
    obj.type === `${AS2_PREFIX}${type}` ||
    obj.type === `${AS2_NS}${type}`;
}

export class ActivityPubElement extends LitElement {

  // Override fetchFunction to use a different fetch implementation
  // For example, to use a custom fetch function that adds authentication headers

  static fetchFunction = (url, options) => fetch(url, options);
  static MEDIA_TYPES = [
    'application/activity+json',
    'application/ld+json',
    'application/json'
  ];

  static get properties() {
    return {
      objectId: { type: String, attribute: 'object-id' },
      json: { type: Object, default: null },
      _error: { type: String, state: true },
    };
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.json) {
      if (this.objectId) {
        this.fetchJson();
      } else {
        this._error = 'No object ID or JSON provided';
      }
    } else if (!this.objectId) {
      this.objectId = this.json.id;
    }
  }

  async fetchJson() {
    try {
      const fn = this.constructor.fetchFunction;
      const headers = { Accept: this.constructor.MEDIA_TYPES.join(', ') };
      const response = await fn(this.objectId, { headers });
      this.json = await response.json();
    } catch (error) {
      this._error = error.message;
    }
  }

  get icon() {
    if (!this.json) {
      return null;
    };
    if (this.json.icon) {
      if (typeof this.json.icon === 'string') {
        return this.json.icon;
      } else {
        let iconObj;
        if (Array.isArray(this.json.icon)) {
          // TODO: pick best fit
          iconObj = this.json.icon[0];
        } else if (typeof this.json.icon === 'object') {
          iconObj = this.json.icon;
        }
        if (iconObj) {
          if (asMatch(iconObj, 'Image')) {
            return iconObj.url;
          } else if (asMatch(iconObj, 'Link')) {
            return icon.href;
          }
        }
      }
    }
  }

  get name() {
    return this.json?.name;
  }

  get summary() {
    return this.json?.summary;
  }

  get content() {
    return this.json?.content;
  }

  get url() {
    return this.json?.url;
  }

  get published() {
    return this.json?.published;
  }
}
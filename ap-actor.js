// Usage: <ap-actor webfinger="webfinger:example@domain"></ap-actor>
// Description: Fetches the actor object from the given webfinger and displays the name, summary, and url of the actor.

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { ActivityPubElement } from './ap-element.js';
import './ap-actor-profile.js';
import './ap-activity-collection.js';

const AS2_NS = 'https://www.w3.org/ns/activitystreams#';
const AS2_PREFIX = 'as:';

function asMatch(obj, type) {
  return obj.type === type ||
    obj.type === `${AS2_PREFIX}${type}` ||
    obj.type === `${AS2_NS}${type}`;
}

class ActivityPubActor extends ActivityPubElement {

  static get properties() {
    return {
      ...super.properties,
      webfinger: { type: String },
      _feed: { type: String, state: true },
    }
  }

  static styles = css`
  .actor {
    display: block;
  }
  .feed-selector, .feed {
    display: block;
    visibility: visible;
  }
  `;

  constructor() {
    super();
    this._feed = 'outbox';
  }

  render() {
    if (this._error) {
      return html`
      <style>
      </style>
      <div class="actor">
        <p>${this._error}</p>
      </div>
    `;
    } else if (!this.json) {
      return html`
      <style>
      </style>
      <div class="actor">
        <p>Loading...</p>
      </div>
    `;
    } else {
      return html`
      <style>
      </style>
      <div class="actor">
        <div class="actor-profile">
          <ap-actor-profile class="profile"
            webfinger="${this.webfinger}"
            name="${this.name}"
            summary="${this.summary}"
            url="${this.url}"
            icon="${this.icon}">
          </ap-actor-profile>
        </div>
        <nav class="feed-selector">
          <menu>
          ${['outbox', 'following', 'followers', 'liked'].map(
            feed => html`
            <li>
              <button
                @click="${() => this._feed = feed}"
                class="${feed} ${this._feed === feed ? 'selected' : ''}">
                ${feed[0].toUpperCase() + feed.slice(1)}
              </button>
            </li>
            `)}
          </menu>
        </nav>
        <div class="feed">
          ${(this._feed === 'outbox')
          ? html`<ap-activity-collection class="outbox-feed" object-id="${this.outbox}"></ap-activity-collection>`
          : (this._feed === 'following')
            ? html`<ap-actor-collection class="following-feed" object-id="${this.following}"></ap-actor-collection>`
            : (this._feed === 'followers')
              ? html`<ap-actor-collection class="followers-feed" object-id="${this.followers}"></ap-actor-collection>`
              : (this._feed === 'liked')
                ? html`<ap-object-collection class="liked-feed" object-id="${this.liked}"></ap-object-collection>`
                : html`<p>Unknown feed: ${this._feed}</p>`
            }
        </div>
      </div>
      `;
    }
  }

  connectedCallback() {
    if (!this.objectId && !this.json) {
      if (!this.webfinger) {
        this._error = 'No object ID or Webfinger provided';
      } else {
        this.fetchObjectId()
          .then(() => super.connectedCallback())
          .catch(err => { this._error = err.message; });
      }
    } else {
      super.connectedCallback();
    }
  }

  async fetchObjectId() {

    const [protocol, address] = this.webfinger.split(':');

    const parts = address.split("@");
    const domain = parts[1];
    const webfingerUrl = `https://${domain}/.well-known/webfinger?resource=acct:${address}`;
    const headers = { Accept: 'application/jrd+json, application/json' };

    const res = await this.constructor.fetchFunction(
      webfingerUrl,
      { headers }
    )
    if (!res.ok) {
      throw new Error(`Failed to fetch webfinger: ${res.status}`);
    }
    const json = await res.json();
    const links = json.links;
    const ap = links.find(link =>
      link.rel === "self" && link.type === "application/activity+json");
    if (!ap) {
      throw new Error('No ActivityPub link found in webfinger response');
    }
    this.objectId = ap.href;
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

  get outbox() {
    return this.json?.outbox;
  }

  get following() {
    return this.json?.following;
  }

  get followers() {
    return this.json?.followers;
  }

  get liked() {
    return this.json?.liked;
  }
}

// Define the custom element
customElements.define('ap-actor', ActivityPubActor);

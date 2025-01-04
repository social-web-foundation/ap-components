// Usage: <ap-actor-page webfinger="webfinger:example@domain"></ap-actor-page>
// Description: Fetches the actor object from the given webfinger and displays the name, summary, and url of the actor.

import { html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { ActivityPubElement } from './ap-element.js';
import './ap-actor-profile.js';
import './ap-activity-collection.js';
import './ap-actor-collection.js';
import './ap-object-collection.js';

export class ActivityPubActorPage extends ActivityPubElement {

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
              <button
                @click="${() => this._feed = feed}"
                class="${feed}${this._feed === feed ? ' selected' : ''}"
                ${(this.json[feed]) ? '' : 'disabled title="Feed unavailable"'}
                data-feed="${this.json[feed]}"
              >
                ${feed[0].toUpperCase() + feed.slice(1)}
              </button>
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
customElements.define('ap-actor-page', ActivityPubActorPage);

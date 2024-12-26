// Usage: <ap-actor webfinger="webfinger:example@domain"></ap-actor>
// Description: Fetches the actor object from the given webfinger and displays the name, summary, and url of the actor.

import './ap-actor-profile.js';
import './ap-activity-collection.js';

const AS2_NS = 'https://www.w3.org/ns/activitystreams#';
const AS2_PREFIX = 'as:';

function asMatch(obj, type) {
  return obj.type === type ||
    obj.type === `${AS2_PREFIX}${type}` ||
    obj.type === `${AS2_NS}${type}`;
}

class ActivityPubActor extends HTMLElement {
  static get observedAttributes() {
    return [
      'webfinger',
      'actor-id'
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .actor {
          display: block;
        }
        .feed-selector, .feed {
          display: block;
          visibility: visible;
        }
      </style>
      <div class="actor">
        <div class="actor-profile">
          <ap-actor-profile class="profile">
          </ap-actor-profile>
        </div>
        <nav class="feed-selector">
          <menu>
            <li>
              <button class="outbox active">Outbox</button>
            </li>
            <li>
              <button class="following">Following</button>
            </li>
            <li>
              <button class="followers">Followers</button>
            </li>
            <li>
              <button class="liked">Liked</button>
            </li>
          </menu>
        </nav>
        <div class="feed">
          <ap-activity-collection class="outbox-feed">
          </ap-activity-collection>
        </div>
      </div>
      `;
  }

  connectedCallback() {
    if (this.hasAttribute('webfinger')) {
      this.updateWebfinger(this.webfinger);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'webfinger':
        this.updateWebfinger(newValue);
        break;
      case 'actor-id':
        this.updateActorId(newValue);
    }
  }

  async updateWebfinger(webfinger) {

    const [protocol, address] = webfinger.split(':');

    const profile = this.shadowRoot.querySelector('.profile');
    profile.webfinger = address;

    const parts = address.split("@");
    const domain = parts[1];
    const webfingerUrl = `https://${domain}/.well-known/webfinger?resource=acct:${address}`;
    const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(webfingerUrl)}`;

    try {
      const res = await fetch(proxyUrl, {
        headers: { Accept: 'application/jrd+json, application/json' }
      });
      if (!res.ok) {
        console.error('Failed to fetch webfinger', res);
        return;
      }
      const json = await res.json();
      const links = json.links;
      const ap = links.find(link =>
        link.rel === "self" && link.type === "application/activity+json");
      if (ap) {
        this.actorId = ap.href;
      }
    } catch (err) {
      console.error(err)
    }
  }

  async updateActorId(id) {
    const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(id)}`;
    try {
      const res = await fetch(proxyUrl, {
        headers: { Accept: 'application/activity+json, application/ld+json, application/json' }
      })
      if (!res.ok) {
        console.error('Failed to fetch actor', res);
        return;
      }
      const json = await res.json();

      const profile = this.shadowRoot.querySelector('.profile');

      profile.name = json.name;
      profile.summary = json.summary;
      profile.url = json.url;

      this.setIcon(profile, json.icon);

      const outboxFeed = this.shadowRoot.querySelector('.outbox-feed');

      outboxFeed.feedId = json.outbox;

    } catch (err) {
      console.error(err)
    }
  }

  setIcon(profile, icon) {

    if (icon) {
      if (typeof icon === 'string') {
        profile.icon = icon;
      } else {
        let iconObj;
        if (Array.isArray(icon)) {
          // TODO: pick best fit
          iconObj = icon[0];
        } else if (typeof icon === 'object') {
          iconObj = icon;
        }
        if (iconObj) {
          if (asMatch(iconObj, 'Image')) {
            this.setIcon(profile, iconObj.url);
          } else if (asMatch(iconObj, 'Link')) {
            profile.icon = icon.href;
          }
        }
      }
    }
  }

  get webfinger() {
    return this.getAttribute('webfinger');
  }

  set webfinger(value) {
    this.setAttribute('webfinger', value);
  }

  get actorId() {
    return this.getAttribute('actor-id');
  }

  set actorId(value) {
    this.setAttribute('actor-id', value);
  }
}

// Define the custom element
customElements.define('ap-actor', ActivityPubActor);

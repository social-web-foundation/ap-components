// Usage: <activitypub-actor webfinger="webfinger:example@domain"></activitypub-actor>
// Description: Fetches the actor object from the given webfinger and displays the name, summary, and url of the actor.

import './activitypub-actor-profile.js';

AS2_NS = 'https://www.w3.org/ns/activitystreams#';
AS2_PREFIX = 'as:';

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
        <div>
          <activitypub-actor-profile class="profile" />
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

    try {
      const res = await fetch(webfingerUrl);
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
    try {
      const res = await fetch(id, {
        headers: { Accept: 'application/activity+json' }
      })
      const json = await res.json();

      const profile = this.shadowRoot.querySelector('.profile');

      profile.name = json.name;
      profile.summary = json.summary;
      profile.url = json.url;

      this.setIcon(json.icon);

    } catch (err) {
      console.error(err)
    }
  }

  setIcon(icon) {

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
            this.setIcon(iconObj.url);
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
customElements.define('activitypub-actor', ActivityPubActor);

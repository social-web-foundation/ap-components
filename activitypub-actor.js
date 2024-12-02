// Usage: <activitypub-actor webfinger="webfinger:example@domain"></activitypub-actor>
// Description: Fetches the actor object from the given webfinger and displays the name, summary, and url of the actor.

class ActivityPubActorProfile extends HTMLElement {
  static get observedAttributes() {
    return [
      'name',
      'webfinger',
      'summary',
      'url',
      'icon'
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
        <h2 id="name">(name)</h2>
        <p id="webfinger">(webfinger)</p>
        <div id="summary">(summary)</div>
        <p><a id="url" href="javascript:void(0)">(url)</a></p>
      `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'name':
        this.shadowRoot.getElementById('name').textContent = newValue;
        break;
      case 'webfinger':
        this.shadowRoot.getElementById('webfinger').textContent = newValue;
        break;
      case 'summary':
        this.shadowRoot.getElementById('summary').innerHTML = newValue;
        break;
      case 'url':
        this.shadowRoot.getElementById('url').textContent = newValue;
        this.shadowRoot.getElementById('url').href = newValue;
        break;
      case 'icon':
        this.shadowRoot.getElementById('icon').src = newValue;
        break;
    }
  }

  get name() {
    return this.getAttribute('name');
  }

  set name(value) {
    this.setAttribute('name', value);
  }

  get summary() {
    return this.getAttribute('summary');
  }

  set summary(value) {
    this.setAttribute('summary', value);
  }

  get url() {
    return this.getAttribute('url');
  }

  set url(value) {
    this.setAttribute('url', value);
  }
}

// Define the custom element
customElements.define('activitypub-actor-profile', ActivityPubActorProfile);

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
          <activitypub-actor-profile id="profile"></activitypub-actor-profile>
        </div>
      `;
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

    const profile = this.shadowRoot.getElementById('profile');
    profile.webfinger = webfinger;

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

      const profile = this.shadowRoot.getElementById('profile');

      profile.name = json.name;
      profile.summary = json.summary;
      profile.url = json.url;

    } catch (err) {
      console.error(err)
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

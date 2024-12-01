// Usage: <activitypub-actor webfinger="webfinger:example@domain"></activitypub-actor>
// Description: Fetches the actor object from the given webfinger and displays the name, summary, and url of the actor.

class ActivityPubActor extends HTMLElement {
  static get observedAttributes() {
    return [
      'webfinger',
      'actorId',
      'name',
      'summary',
      'url'
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
        <h2 id="name">(name)</h2>
        <div id="summary">(summary)</div>
        <p><a id="url" href="javascript:void(0)">(url)</a></p>
      `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'webfinger':
        this.updateWebfinger(newValue);
        break;
      case 'actorId':
        this.updateActorId(newValue);
        break;
      case 'name':
        this.shadowRoot.getElementById('name').textContent = newValue;
        break;
      case 'summary':
        this.shadowRoot.getElementById('summary').textContent = newValue;
        break;
      case 'url':
        this.shadowRoot.getElementById('url').textContent = newValue;
        this.shadowRoot.getElementById('url').href = newValue;
        break;
    }
  }

  async updateWebfinger(webfinger) {
    const [protocol, address] = webfinger.split(':');
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
        this.setAttribute('id', ap.href);
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

      this.setAttribute('name', json.name);
      this.setAttribute('summary', json.summary);
      this.setAttribute('url', json.url);

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
}

// Define the custom element
customElements.define('activitypub-actor', ActivityPubActor);

class ActivityPubNote extends HTMLElement {
  static get observedAttributes() {
    return [
      'object-id',
      'object'
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
            }
            .object {
                border: 1px solid lightgray;
                border-radius: 8px;
                padding: 8px;
                margin: 8px 0;
            }
        </style>
        <div class="note">
        <div class="content"></div>
        <p class="published"></p>
        </div>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute('object-id')) {
      this.updateObjectId(this.objectId);
    }
    if (this.hasAttribute('object')) {
      this.updateObject(this.object);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'object') {
      this.updateObject(newValue);
    } else if (name === 'object-id') {
      this.updateObjectId(newValue);
    }
  }

  async updateObjectId(objectId) {
    if (!objectId) {
      console.error('No object ID provided');
      return;
    }
    const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(objectId)}`;
    const res = await fetch(proxyUrl, {
      headers: { Accept: 'application/activity+json, application/ld+json, application/json' }
    });

    if (!res.ok) {
      console.error('Failed to fetch object', res);
      return;
    }

    const object = await res.json();
    this.object = object;
  }

  async updateObject(object) {
    if (!object) {
      console.error('No object provided');
      return;
    }
    if (typeof object == 'string') {
      object = JSON.parse(object);
    }

    const contentElement = this.shadowRoot.querySelector('.content');
    contentElement.innerHTML = object.content;

    const publishedElement = this.shadowRoot.querySelector('.published');
    publishedElement.textContent = object.published;
  }
}

customElements.define('activitypub-note', ActivityPubNote);

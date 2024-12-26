import './ap-object.js';
import './ap-note.js';
import './ap-article.js';

class ActivityPubCreateActivity extends HTMLElement {
  static get observedAttributes() {
    return ['activity'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .create-activity {
          display: block;
        }
      </style>
      <div class="create-activity">
      </div>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute('activity')) {
      this.updateActivity(this.activity);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'activity') {
      this.updateActivity(newValue);
    }
  }

  async updateActivity(activity) {
    if (!activity) {
      console.error('No activity provided');
      return;
    }
    if (typeof activity == 'string') {
      activity = JSON.parse(activity);
    }

    // Clear the element

    const createActivityElement = this.shadowRoot.querySelector('.create-activity');
    createActivityElement.innerHTML = '';

    // Get the object

    const object = activity.object;

    if (typeof object === 'string') {
      const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(object)}`;
      const res = fetch(proxyUrl, {
        headers: { Accept: 'application/activity+json, application/ld+json, application/json' }
      })
      if (!res.ok) {
        console.error('Failed to fetch object', res);
        return;
      }
      object = await res.json();
    }

    let objectElementType;

    switch (object.type) {
      case 'Note':
        objectElementType = 'ap-note';
        break;
      case 'Article':
        objectElementType = 'ap-article';
        break;
      default:
        objectElementType = 'ap-object';
    }

    const objectElement = document.createElement(objectElementType);
    objectElement.object = object;
    createActivityElement.appendChild(objectElement);
  }

  get activity() {
    return this.getAttribute('activity');
  }

  set activity(value) {
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    this.setAttribute('activity', value);
  }
}

customElements.define('ap-create-activity', ActivityPubCreateActivity);
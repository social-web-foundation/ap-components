import './activitypub-create-activity.js';
class ActivityPubActivity extends HTMLElement {
  static get observedAttributes() {
    return [
      'activity-id',
      'activity'
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
            .activity {
                border: 1px solid lightgray;
                border-radius: 8px;
                padding: 8px;
                margin: 8px 0;
            }
        </style>
        <div class="activity"></div>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute('activity-id')) {
      this.updateActivityId(this.activityId);
    }
    if (this.hasAttribute('activity')) {
      this.updateActivity(this.activity);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'activity') {
      this.updateActivity(newValue);
    } else if (name === 'activity-id') {
      this.updateActivityId(newValue);
    }
  }

  async updateActivityId(activityId) {
    if (!activityId) {
      console.error('No activity ID provided');
      return;
    }
    const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(activityId)}`;
    const res = await fetch(proxyUrl, {
      headers: { Accept: 'application/activity+json, application/ld+json, application/json' }
    });

    if (!res.ok) {
      console.error('Failed to fetch activity', res);
      return;
    }

    const activity = await res.json();
    this.activity = activity;
  }

  updateActivity(activity) {
    if (typeof activity === 'string') {
      activity = JSON.parse(activity);
    }
    const activityElement = this.shadowRoot.querySelector('.activity');
    switch (activity.type) {
      case 'Create':
        const createActivity = document.createElement('activitypub-create-activity');
        createActivity.activity = activity;
        activityElement.appendChild(createActivity);
        break;
      default:
        activityElement.textContent = activity.type;
    }
  }

  get activity() {
    return this.getAttribute('activity');
  }

  set activity(value) {
    this.setAttribute('activity', value);
  }

  get activityId() {
    return this.getAttribute('activity-id');
  }

  set activityId(value) {
    this.setAttribute('activity-id', value);
  }
}

customElements.define('activitypub-activity', ActivityPubActivity);
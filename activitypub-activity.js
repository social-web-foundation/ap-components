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
    this.updateActivityId(this.activityId);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'activity') {
      this.updateActivity(newValue);
    } else if (name === 'activity-id') {
      this.updateActivityId(newValue);
    }
  }

  async updateActivityId(activityId) {
    const res = await fetch(activityId);
    const activity = await res.json();
    this.activity = activity;
  }

  updateActivity(activity) {
    const activityElement = this.shadowRoot.querySelector('.activity');
    activityElement.textContent = `${activity.type}`;
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

import './activitypub-activity.js';

class ActivityPubActivityCollection extends HTMLElement {

  static MAX_ACTIVITIES = 20;

  static get observedAttributes() {
    return ['feed-id'];
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
        <ol class="activities"></ol>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute('feed-id')) {
      this.updateFeedId(this.feedId);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'feed-id') {
      this.updateFeedId(newValue);
    }
  }

  async updateFeedId(feedId) {
    if (!feedId) {
      return;
    }

    const res = await fetch(feedId, {
      headers: { Accept: 'application/activity+json, application/ld+json, application/json' }
    });
    const collection = await res.json();

    const activities = [];

    if (collection.items) {
      activities.push(...collection.items);
    } else if (collection.orderedItems) {
      activities.push(...collection.orderedItems);
    } else if (collection.first) {
      let next = collection.first;
      while (next && activities.length < MAX_ACTIVITIES) {
        const res = await fetch(next, {
          headers: { Accept: 'application/activity+json, application/ld+json, application/json' }
        });
        const page = await res.json();
        if (page.items) {
          activities.push(...page.items);
        } else if (page.orderedItems) {
          activities.push(...page.orderedItems);
        } else {
          console.error('Collection page does not have items or orderedItems property');
        }
        next = page.next;
      }
    } else {
      console.error('Collection does not have items or first property');
    }

    const activitiesElement = this.shadowRoot.querySelector('.activities');
    activitiesElement.innerHTML = '';

    activities.forEach(activity => {
      const activityListElement = document.createElement('li');
      activitiesElement.appendChild(activityListElement);
      const activityElement = document.createElement('activitypub-activity');
      activityListElement.appendChild(activityElement);
      if (typeof activity === 'string') {
        activityElement.setAttribute('activity-id', activity);
      } else {
        activityElement.setAttribute('activity', JSON.stringify(activity));
      }
    });
  }

  get feedId() {
    return this.getAttribute('feed-id');
  }

  set feedId(value) {
    this.setAttribute('feed-id', value);
  }
}

customElements.define('activitypub-activity-collection', ActivityPubActivityCollection);
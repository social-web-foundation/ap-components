
import { ActivityPubElement } from './ap-element.js';
import { html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import './ap-actor-item.js';

class ActivityPubActorCollection extends ActivityPubElement {

  static get properties() {
    return {
      ...super.properties,
      _actors: { type: Array, state: true },
    }
  }

  static MAX_ACTORS = 20;

  static styles = css`
  :host {
    display: block;
  }
  `;

  constructor() {
    super();
  }

  render() {
    if (this._error) {
      return html`
      <div class="actors">
        <p>${this._error}</p>
      </div>
    `;
    } else if (!this.json) {
      return html`
      <div class="actors">
        <p>Loading...</p>
      </div>
    `;
    } else {
      return html`
        <ol class="actors">
        ${this._actors?.map(actor => html`
          <li class="actor">
          ${(typeof actor === 'string')
          ? html`<ap-actor-item object-id="${actor}"></ap-actor-item>`
          : html`<ap-actor-item json="${JSON.stringify(actor)}"></ap-actor-item>`}
          </li>
          `)}
        </ol>
      `;
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('json')) {
      this.fetchActors();
    }
  }

  async fetchActors() {
    const actors = [];

    if (this.json.items) {
      actors.push(...this.json.items);
    } else if (this.json.orderedItems) {
      actors.push(...this.json.orderedItems);
    } else if (this.json.first) {
      let next = this.json.first;
      while (next &&
        actors.length < this.constructor.MAX_ACTORS) {
        const res = await this.constructor.fetchFunction(next, {
          headers: { Accept: this.constructor.MEDIA_TYPES.join(', ') }
        });
        if (!res.ok) {
          console.error('Failed to fetch collection page', res);
          break;
        }
        const page = await res.json();
        if (page.items) {
          actors.push(...page.items);
        } else if (page.orderedItems) {
          actors.push(...page.orderedItems);
        }
        next = page.next;
      }
    }

    this._actors = actors;
  }
}

customElements.define('ap-actor-collection', ActivityPubActorCollection);
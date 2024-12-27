
import { ActivityPubCollectionElement } from './ap-collection.js';
import { html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { ActivityPubActivity } from './ap-activity.js';

export class ActivityPubActivityCollection extends ActivityPubCollectionElement {

  static _itemElement = ActivityPubActivity;

  static styles = css`
  :host {
    display: block;
  }
  `;

  constructor() {
    super();
  }
}

customElements.define('ap-activity-collection', ActivityPubActivityCollection);